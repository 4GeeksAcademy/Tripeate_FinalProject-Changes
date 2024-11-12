"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity, current_user
from flask_bcrypt import Bcrypt
from api.models import db, User, Plan, PlanType, TokenBlockedList
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

# Ruta para formulario de registro de usuario
@api.route('/signup', methods=['POST'])
def signup_user():
    # Se reciben los datos de la petición
    body=request.get_json()
    # Se valida que se esta ingresando un usuario y contraseña
    if body['nombre'] is None:
        return jsonify({"msg":"Por favor especifique el nombre"}),400
    if body ['apellido'] is None:
        return jsonify({"msg":"por favor especifique el apellido"}), 400
    if body['email'] is None:
        return jsonify({"msg":"Por favor especifique el email"}),400
    if body['password'] is None:
        return jsonify({"msg":"Por favor especifique su contraseña"}),400
    # Se encripta la contraseña
    body['password']=bcrypt.generate_password_hash(body['password']).decode('utf-8')
    # Se guarda en la base de datos 
    user = User(email=body['email'], nombre=body['nombre'],
    apellido=body['apellido'], password=body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Usuario creado con exito", "user": user.serialize()})
    
# Ruta para formulario de inicio de sesión
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
    return jsonify({"msg": "Login exitoso", "token": token, "Id": user.id })

# Ruta para perfil del usuario
@api.route('/userinfo', methods=["GET"]) 
# Protege una ruta con jwt_required, bloquea las peticiones sin un JWT válido
@jwt_required()
# Accede a la identidad del usuario actual con get_jwt_identity
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"msg":"Perfil del usuario"}, user.serialize()), 200


# Ruta para cierre de sesión
@api.route('/logout', methods=["POST"])
@jwt_required()
def user_logout():
    token_data = get_jwt()
    token_blocked = TokenBlockedList(jti = token_data["jti"])
    db.session.add(token_blocked)
    db.session.commit()
    return jsonify({"msg":"Sesión cerrada"}) 


# Ruta para listar todos los usuarios existentes
@api.route('/users', methods=['GET'])
@jwt_required()  # Se proteje la ruta con JWT authentication
def get_users():
    # Check if current user is admin (optional, based on authorization rules)
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    users = User.query.all()  # Fetch all users
    user_data = [user.serialize() for user in users]  # Serialize user data
    return jsonify({"users": user_data}), 200

# Ruta para formulario de registro de plan
@api.route('/create_plan', methods=['POST'])
@jwt_required()
def create_plan():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
# Obtener datos del formulario o del request JSON
    body = request.get_json()
    if body["name"] is None:
        return jsonify({"msg":"Debe especificar un Destino"}), 400
    name = body.get('name')
    caption = body.get('caption')
    image = body.get('image')
    
# Validación de datos
    new_plan = Plan(
        name=name,
        caption=caption,
        image=image,
        user_id=current_user_id,
        
    )
    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"msg":"Plan creado exitosamente"}), 201


# Ruta para listar todos los planes existentes
@api.route('/plans', methods=['GET'])
def get_plans():
    plans = Plan.query.all()  # Fetch todos los planes
    plan_data = [plan.serialize() for plan in plans]  # Serialize plan data
    return jsonify({"plans": plan_data}), 200




 
