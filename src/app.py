"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, current_user, get_jwt, get_jwt_identity
from api.utils import APIException, generate_sitemap
from api.models import db, User, Plan, TokenBlockedList
from api.routes import api

from api.admin import setup_admin
from api.commands import setup_commands
from datetime import timedelta



#from flask_login import current_user, LoginManager



# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


app.config["JWT_SECRET_KEY"] = os.getenv("TOKEN_SECRET")  
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes = 5)
jwt = JWTManager(app)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    token_blocked = TokenBlockedList.query.filter_by(jti = jwt_payload["jti"]).first()
    return token_blocked is not None
    
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Ruta para eliminar un usuario
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if current_user.is_admin:
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"msg":"Usuario eliminado exitosamente"})
        else: 
            return jsonify({"error":"Usuario no encontrado"})
    else:
        return jsonify({"error":"No autorizado"})

# Ruta para eliminar un plan
@app.route('/delete_plan/<int:plan_id>', methods=['DELETE'])
@jwt_required()
def delete_plan(plan_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    # verifica si el usuario es admin o dueño del plan 
    if current_user.is_admin:
       # plan = Plan.query.filter_by(id=plan_id, user_id=current_user_id).first():
        plan = Plan.query.get(plan_id)
        if plan:
            db.session.delete(plan)
            db.session.commit()
            return jsonify({"msg": "Plan eliminado exitosamente"})
        else:
            return jsonify({"error": "Plan no encontrado"})
    else:
        return jsonify({"error": "No autorizado"})




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
