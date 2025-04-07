import pymongo
from bson.objectid import ObjectId

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['taskdb']
tasks_collection = db['tasks']

class TaskModel:
    def get_all_tasks(self):
        return list(tasks_collection.find())

    def create_task(self, task_data):
        task = {
            'title': task_data['title'],
            'description': task_data['description'],
            'status': task_data['status']
        }
        result = tasks_collection.insert_one(task)
        task['_id'] = str(result.inserted_id)
        return task

    def update_task(self, task_id, task_data):
        updated_task = {
            'status': task_data['status']
        }
        tasks_collection.update_one({'_id': ObjectId(task_id)}, {'$set': updated_task})
        return self.get_task_by_id(task_id)

    def delete_task(self, task_id):
        tasks_collection.delete_one({'_id': ObjectId(task_id)})

    def get_task_by_id(self, task_id):
        return tasks_collection.find_one({'_id': ObjectId(task_id)})

    def get_task_stats(self):
        pipeline = [
            {"$group": {"_id": "$status", "count": {"$sum": 1}}}
        ]
        return list(tasks_collection.aggregate(pipeline))
