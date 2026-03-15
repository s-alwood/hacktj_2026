from flask import Flask, request, jsonify 
import json
import os

print ("starting server")

app = Flask(__name__, static_folder="public", static_url_path="")

USERS_FILE = "users.json" # 

# Helper functions 
def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)

import json
import re

def save_users(users):
    text = json.dumps(users, indent=4)

    # Collapse gachaHistory array
    text = re.sub(
        r'"gachaHistory": \[\s*([^\]]*?)\s*\]',
        lambda m: '"gachaHistory": [' + re.sub(r'\s+', '', m.group(1)) + ']',
        text
    )

    # Collapse gachaDuplicates object
    text = re.sub(
        r'"gachaDuplicates": \{\s*([^\}]*?)\s*\}',
        lambda m: '"gachaDuplicates": {' + re.sub(r'\s+', '', m.group(1)) + '}',
        text
    )

    with open(USERS_FILE, "w") as f:
        f.write(text)
        
#  Serve index.html
@app.route("/")
def home():
    return app.send_static_file("index.html")

# Signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username").lower()
    password = data.get("password")
    progress = data.get("progress")  # <-- new

    users = load_users()

    if username in users:
        return jsonify({"success": False, "message": "Username is taken!"}), 400

    # Create new user using the progress sent from JS
    users[username] = {
        "password": password,
        **progress   # merge the progress object into user data
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

@app.route("/saveProgress", methods=["POST"]) #
def save_progress():
    data = request.json
    username = data.get("username")
    progress = data.get("progress")  # your playerData object   

    users = load_users()
    if username not in users:
        return jsonify({"success": False, "message": "User not found"}), 400

    # Update the user's data
    users[username].update(progress)
    save_users(users)
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)

#C:\Users\nothi\Downloads\hacktj