from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True))

class User(db.Model):
    __tablename__ = 'users'  
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)  
    is_active = db.Column(db.Boolean(), default=True)  
    plans = db.relationship('Plan', secondary='user_plan', backref='users', lazy='dynamic')
    roles = db.relationship('Role', secondary=user_roles, backref='users', lazy='dynamic')
    
    def __repr__(self):  
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "roles": [role.name for role in self.roles],  # List of role names
            "plans": [plan.name for plan in self.plans]  # List of plan names (consider privacy)
            # No se serializa la contraseña por razones de seguridad
        }

    
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    users = db.relationship('User', secondary=user_roles, backref='roles', lazy='dynamic')
    
    def __repr__(self):
        return f'<Role {self.name}>'
    
# Tabla intermedia para la relación muchos a muchos entre User y Plan
user_plan = db.Table('user_plan',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('plan_id', db.Integer, db.ForeignKey('plans.id'), primary_key=True))

class Plan(db.Model):
    __tablename__ = 'plans' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))  # URL de la imagen del lugar a visitar
    

    def __repr__(self):  
        return f'<Plan {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "caption": self.caption,
            "image": self.image,
        }
    
class UserAdmin(db.Model):
    __tablename__ = 'users_admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
   
    def __repr__(self):  
        return f'<Admin {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            }    
    
# # Example (assuming Flask-Login integration):
#     def can_delete_user(self, user):
#         # Implement logic to check if the admin has permission to delete the user
#         # (e.g., check admin role, user role, etc.)
#         pass

#     def can_delete_plan(self, plan):
#         # Implement logic to check if the admin has permission to delete the plan
#         # (e.g., check admin role, etc.)
#         pass