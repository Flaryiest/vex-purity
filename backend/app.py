from flask import Flask, jsonify
from dotenv import load_dotenv
import sqlalchemy
import os

load_dotenv()
app = Flask(__name__)
database = sqlalchemy.create_engine(os.getenv("DATABASE_URL"))


@app.route('/status', methods=['GET'])
def status():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=os.getenv("IS_DEVELOPMENT") == "True")