import os
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/test/<file_name>", methods=["GET", "POST"])
def fn(file_name):
    return jsonify({"object_url": file_name})


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000
    )
