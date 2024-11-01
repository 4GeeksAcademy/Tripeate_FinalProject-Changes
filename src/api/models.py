from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabla de asociación para la relación muchos a muchos entre usuarios y roles
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=user_roles, backref=db.backref('users', lazy='dynamic'))
    plans = db.relationship('Plan', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'   

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "roles": [role.name for role in self.roles],
            "plans": [plan.name for plan in self.plans]
        }

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def _repr_(self):
        return f'<Role {self.name}>'

class Plan(db.Model):
    __tablename__ = 'plans' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    def __repr__(self):
        return f'<Admin {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
        }