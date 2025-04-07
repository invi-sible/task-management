import json
import bcrypt
from services.task_service import TaskService
from services.auth_service import AuthService
from utils.auth_utils import verify_jwt
from functools import wraps

task_service = TaskService()
auth_service = AuthService()

def task_to_dict(task):
    task['_id'] = str(task['_id'])
    return task

def require_auth(func):
    @wraps(func)
    def wrapper(event, context):
        user = verify_jwt(event)
        if not user:
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Unauthorized'})
            }
        event['user'] = user
        return func(event, context)
    return wrapper

users_collection = db['users']

def register(event, context):
    body = json.loads(event['body'])
    username = body.get('username')
    password = body.get('password')

    if not username or not password:
        return {
            'statusCode': 400,
            'body': json.dumps({"message": "Username and password are required"})
        }

    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        return {
            'statusCode': 400,
            'body': json.dumps({"message": "Username already exists"})
        }

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = {
        'username': username,
        'password': hashed_password
    }
    result = users_collection.insert_one(new_user)

    return {
        'statusCode': 201,
        'body': json.dumps({"message": "User registered successfully"})
    }

def login(event, context):
    body = json.loads(event['body'])
    username = body.get('username')
    password = body.get('password')

    if auth_service.authenticate(username, password):
        token = auth_service.generate_jwt(user_id="1234")
        return {
            'statusCode': 200,
            'body': json.dumps({"token": token})
        }
    else:
        return {
            'statusCode': 401,
            'body': json.dumps({"message": "Invalid credentials"})
        }

def api_error(message, status_code=500):
    return {
        'statusCode': status_code,
        'body': json.dumps({'error': message})
    }

@require_auth
def get_tasks(event, context):
    try:
        tasks = task_service.get_all_tasks()
        return {
            'statusCode': 200,
            'body': json.dumps(tasks)
        }
    except Exception as e:
        return api_error(f"Failed to retrieve tasks: {str(e)}")

@require_auth
def create_task(event, context):
    try:
        body = json.loads(event['body'])
        if 'title' not in body or 'description' not in body:
            return api_error("Missing required fields: title or description", 400)
        task = task_service.create_task(body)
        return {
            'statusCode': 201,
            'body': json.dumps(task)
        }
    except Exception as e:
        return api_error(f"Failed to create task: {str(e)}")

@require_auth
def update_task(event, context):
    try:
        task_id = event['pathParameters']['id']
        body = json.loads(event['body'])
        if 'status' not in body:
            return api_error("Missing required field: status", 400)
        task = task_service.update_task(task_id, body)
        return {
            'statusCode': 200,
            'body': json.dumps(task)
        }
    except Exception as e:
        return api_error(f"Failed to update task: {str(e)}")

@require_auth
def delete_task(event, context):
    try:
        task_id = event['pathParameters']['id']
        task_service.delete_task(task_id)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Task deleted successfully'})
        }
    except Exception as e:
        return api_error(f"Failed to delete task: {str(e)}")

@require_auth
def get_stats(event, context):
    try:
        stats = task_service.get_task_stats()
        return {
            'statusCode': 200,
            'body': json.dumps(stats)
        }
    except Exception as e:
        return api_error(f"Failed to retrieve task stats: {str(e)}")
