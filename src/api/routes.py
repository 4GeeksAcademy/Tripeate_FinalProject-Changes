"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt
from api.models import db, User, TokenBlockedList
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

@api.route('/login', methods=['POST'])
def user_login():
    body = request.get_json()
    if body["email"] is None:
        return jsonify({"msg":"Debe especificar una contraseña"}), 400
    # Se busca el usuario en la base de datos y se verifica que exista
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        return jsonify({"msg":"Usuario no encontrado"}), 401
    # Se comparar la contraseña proporcionada por el usuario con un hash de contraseña almacenado previamente
    valid_password = bcrypt.check_password_hash(user.password, body["password"])
    if not valid_password:
        return jsonify({"msg": "Clave invalida"}), 401
    # Se crea y se retorna el token de la sesión
    token = create_access_token(identity=user.id, additional_claims={"role": "admin"})
    return jsonify({"msg": "Login exitoso", "token": token})


@api.route('/userinfo', methods=["GET"]) 
# Protege una ruta con jwt_required, bloquea las peticiones sin un JWT válido
@jwt_required()
# Accede a la identidad del usuario actual con get_jwt_identity
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"msg":"Perfil del usuario"}, user.serialize()), 200

@api.route('/logout', methods=["POST"])
@jwt_required()
def user_logout():
    token_data = get_jwt()
    token_blocked = TokenBlockedList(jti = token_data["jti"])
    db.session.add(token_blocked)
    db.session.commit()
    return jsonify({"msg":"Sesión cerrada"}) 

 
