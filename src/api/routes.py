"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

app = Flask(__name__)
bcrypt = Bcrypt(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    # Se reciben los datos de la petición
    body=request.get_json()
    # Se valida que se esta ingresando un usuario y contraseña
    if body['email'] is None:
        return jsonify({"msg":"Por especifique un nombre de usuario"}),400
    if body['password'] is None:
        return jsonify({"msg":"Por favor especifique su contraseña"}),400
    # Se encripta la contraseña
    body['password']=bcrypt.generate_password_hash(body['password']).decode('utf-8')
    # Se guarda en la base de datos 
    user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Usuario creado con exito", "user": user.serialize()})

