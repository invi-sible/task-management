from models.task_model import TaskModel

class TaskService:
    def __init__(self):
        self.task_model = TaskModel()

    def get_all_tasks(self):
        return self.task_model.get_all_tasks()

    def create_task(self, task_data):
        return self.task_model.create_task(task_data)

    def update_task(self, task_id, task_data):
        return self.task_model.update_task(task_id, task_data)

    def delete_task(self, task_id):
        return self.task_model.delete_task(task_id)

    def get_task_stats(self):
        return self.task_model.get_task_stats()
