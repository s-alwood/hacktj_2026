from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__, static_folder="public", static_url_path="")

USERS_FILE = "users.json"

# Helper functions
def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

# Serve index.html
@app.route("/")
def home():
    return app.send_static_file("index.html")

# Signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username").lower()
    
    password = data.get("password")
    users = load_users()

    if username in users:
        return jsonify({"success": False, "message": "Username is taken!"}), 400

    # Create new user
    users[username] = {
        "password": password,
        "tokens": 0,
        "level": 1,
        "xpProgress": 0,
        "equippedSkin": "Basic Yellow",
        "inventory": ["Basic Yellow"]
    }
    save_users(users)
    return jsonify({"success": True})

# Login route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username").lower()
    password = data.get("password")
    users = load_users()

    if username not in users or users[username]["password"] != password:
        return jsonify({"success": False, "message": "Invalid username or password."}), 400

    return jsonify({"success": True, "user": users[username]})