from flask import Flask, jsonify, request
from flask_cors import CORS

from db import tasks_collection
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Python Analytics Service Running"


# 1) USER STATISTICS ENDPOINT
@app.route("/api/analytics/user-stats", methods=["GET"])
def user_stats():
    user_id = request.args.get("userId")

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    total = tasks_collection.count_documents({"user": ObjectId(user_id)})
    completed = tasks_collection.count_documents({
        "user": ObjectId(user_id),
        "status": "Completed"
    })
    pending = total - completed
    completion_rate = (completed / total * 100) if total > 0 else 0

    return jsonify({
        "totalTasks": total,
        "completedTasks": completed,
        "pendingTasks": pending,
        "completionRate": round(completion_rate, 2)
    })


# 2) PRODUCTIVITY TREND ENDPOINT
@app.route("/api/analytics/productivity", methods=["GET"])
def productivity_trend():
    user_id = request.args.get("userId")

    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    pipeline = [
        {
            "$match": {
                "user": ObjectId(user_id),
                "status": "Completed"
            }
        },
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$updatedAt"},
                    "month": {"$month": "$updatedAt"},
                    "day": {"$dayOfMonth": "$updatedAt"}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"_id.year": 1, "_id.month": 1, "_id.day": 1}
        }
    ]

    results = list(tasks_collection.aggregate(pipeline))

    trend = []
    for item in results:
        date = f"{item['_id']['year']}-{item['_id']['month']:02d}-{item['_id']['day']:02d}"
        trend.append({
            "date": date,
            "completedTasks": item["count"]
        })

    return jsonify(trend)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=False)

