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
    is_admin = db.Column(db.Boolean(), default=False)
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


# Tabla de asociación para la relación muchos a muchos entre planes y planes por categoria
planes_categorias = db.Table('planes_categorias',
    db.Column('plan_id', db.Integer, db.ForeignKey('plans.id'), primary_key=True),
    db.Column('beach_id', db.Integer, db.ForeignKey('beaches.id'), primary_key=True),
    db.Column('mountain_id', db.Integer, db.ForeignKey('mountains.id'), primary_key=True),
    db.Column('city_id', db.Integer, db.ForeignKey('cities.id'), primary_key=True)
)

class Plan(db.Model):
    __tablename__ = 'plans' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    beach = db.relationship('Beach', secondary=planes_categorias, backref=db.backref('plans', lazy='dynamic'))

    def __repr__(self):
        return f'<Plan {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "caption": self.caption,
            "image": self.image,
        }

class Beach(db.Model):
    __tablename__ = 'beaches'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))

    def _repr_(self):
        return f'<Beach {self.name}>'

class Mountain(db.Model):
    __tablename__ = 'mountains'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))

    def _repr_(self):
        return f'<Mountain {self.name}>'

class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    caption = db.Column(db.String(3800))
    image = db.Column(db.String(250))

    def _repr_(self):
        return f'<City {self.name}>'



class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(50), unique=True, nullable=False)
    