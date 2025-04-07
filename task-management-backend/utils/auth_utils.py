import jwt
from datetime import datetime

SECRET_KEY = '8ead3e9095dc02059b45ffa0e88a197bae4600ce71c13c31105299c0ffbdda7e'
ALGORITHM = "HS256"

def verify_jwt(event):
    token = event['headers'].get('Authorization')
    if not token:
        return None, "Token missing from headers"
    
    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload['exp'] < datetime.datetime.utcnow().timestamp():
            return None, "Token has expired"
        return payload, None
    except jwt.ExpiredSignatureError:
        return None, "Token has expired"
    except jwt.InvalidTokenError:
        return None, "Invalid token"
