import jwt
import datetime

SECRET_KEY = '8ead3e9095dc02059b45ffa0e88a197bae4600ce71c13c31105299c0ffbdda7e'
ALGORITHM = "HS256"

class AuthService:
    def generate_jwt(self, user_id):
        expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        payload = {"user_id": user_id, "exp": expiration}
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return token

    def authenticate(self, username, password):
        return username == "test_user" and password == "test_password"
