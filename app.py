from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

users = [

]


class User(Resource):

    def get(self, name):
        for user in users:
            if (name == user["name"]):
                return user, 200

    def post(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("password")
        args = parser.parse_args()

        for user in users:
            if (name == user["name"]):
                return "User with name {} already exists".format(name), 400

        user = {
            "name": name,
            "password": args["password"]
        }

        users.append(user)
        return user, 201

    def put(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("password")
        args = parser.parse_args()

        for user in users:
            if (name == user["name"]):
                return "User with name {} already exists".format(name), 400

        user = {
            "name": name,
            "password": args["password"]
        }

        users.append(user)
        return user, 201

    def delete(self, name):
        global users
        users = [user for user in users if user["name"] != name]

        return "{} is deleted.".format(name), 200
    
api.add_resource(User, "/user/<string:name>")

app.run(debug=True, host='0.0.0.0')
