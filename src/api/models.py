from flask_sqlalchemy import SQLAlchemy
import cloudinary
from enum import Enum 


db = SQLAlchemy()


# Tabla de asociación para la relación muchos a muchos entre usuarios y planes favoritos
favorites = db.Table('favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('plan_id', db.Integer, db.ForeignKey('plans.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    is_admin = db.Column(db.Boolean(), default=False)
    profile_image = db.Column(db.String(255), nullable=True)
    plans = db.relationship('Plan', backref='user', lazy=True)
    favorite_plans = db.relationship('Plan', secondary=favorites, lazy='subquery', backref=db.backref('favorited_by', lazy=True))

    def __repr__(self):
        return f'<User {self.email, self.is_admin}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "is_admin": self.is_admin,
            "profile_image": self.profile_image,
            "plans": [{"id": plan.id, "name": plan.name}  for plan in self.plans]
        }
    # El usuario puede crear un plan classmethod
    def create_plan(self, name, caption, image, plan_type, available_slots):
        new_plan = Plan(name=name, caption=caption, image=image, user_id=self.id, type=plan_type, available_slots=available_slots)
        db.session.add(new_plan)
        db.session.commit()
        return new_plan #Retornar el plan creado
    
    # El usuario admin puede aceptar o rechazar planes
    def manage_plan(self, plan_id, action):
        if self.is_admin:
            plan = Plan.query.get(plan_id)
            if plan:
                if action == 'accept':
                    plan.status = PlanStatus.Accepted
                elif action == 'rejected':
                    plan.status = PlanStatus.Rejected
                db.session.commit()

    # El usuario admin o dueño del plan puede eliminar planes
    def delete_plan(self, plan_id):
        plan_to_delete = Plan.query.get(plan_id)
        if not plan_to_delete:
            return False, "Plan no encontrado."
        if self.is_admin or plan_to_delete.user_id == self.id:
                db.session.delete(plan_to_delete)
                db.session.commit()
                return True, "Plan eliminado exitosamente."
        return False, "No tienes permiso para eliminar planes."

    # El usuario puede comprar un plan
    def buy_plan(self, plan):
        if (plan.available_slots > 0 and plan.user_id != self.id ): #Verificar que haya cupos disponibles y que el usuario no compre su propio plan
            plan.available_slots -= 1 #Decrementar la cantidad de cupos 
            db.session.commit()
            return True, "Compra exitosa."
        return False, "Compra fallida, lo sentimos no hay cupos disponibles para este plan."
    
    # El usuario admin puede eliminar usuarios
    def delete_user(self, user_id):
        if self.is_admin:
            user_to_delete = User.query.get(user_id)
            if user_to_delete:
                db.session.delete(user_to_delete)
                db.session.commit()



# Tabla de asociación para la relación muchos a muchos entre planes y categorías
planes_categorias = db.Table('planes_categorias',
    db.Column('plan_id', db.Integer, db.ForeignKey('plans.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

class PlanType(Enum):
    Beach = 'Playa'
    Mountain = 'Montaña'
    City = 'Ciudad'
    Themes = 'Temáticos'
    Gastronomic = 'Gastronómicos'
    Religious = 'Religiosos'
    Adventure = 'Aventura'
    Wellbeing = 'Bienestar'

class PlanStatus(Enum):
    Pending = 'Pendiente'
    Accepted = 'Aceptado'
    Rejected = 'Rechazado'

class Plan(db.Model):
    __tablename__ = 'plans'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location_trip = db.Column(db.String(120), nullable=False)
    caption = db.Column(db.Text, nullable=False)
    time_start = db.Column(db.String(100), nullable=False)
    time_end = db.Column(db.String(100), nullable=False)
    date_trip = db.Column(db.String(100), nullable=False)
    location_start = db.Column(db.String(100), nullable=False)
    location_end = db.Column(db.String(100), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    rif = db.Column(db.String(100), nullable=False)
    description_company = db.Column(db.String(100), nullable=False)
    phone_company = db.Column(db.String(100), nullable=False)
    instagram_company = db.Column(db.String(100), nullable=False)
    facebook_company = db.Column(db.String(100), nullable=False)
    available_slots = db.Column(db.Integer, nullable=False) #Agregar cantidad de cupos disponibles
    trip_price = db.Column(db.Integer, nullable=False)

    image_company = db.Column(db.String(100), nullable=False, default="https://i.pravatar.cc/300" )
    image_location = db.Column(db.String(120), nullable=False, default="https://i.pravatar.cc/300")

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
       
    categories_id= db.Column(db.Integer, db.ForeignKey("categories.id"))# revisar
    status = db.Column(db.Enum(PlanStatus), default=PlanStatus.Pending) #Estado del plan
    categories = db.relationship('Category', backref='plans')




    def __repr__(self):
        return f'<Plan {self.name}>'
    
    def get_user_email(self):
        return self.user.email if self.user else None

    def serialize(self):
       
        
        return {
            "id": self.id,
            "name": self.name,
            "caption": self.caption,
            "image_company": self.image_company,
            "image_location": self.image_location,
            "user_id": self.user_id,
            "trip_price": self.trip_price,
            "available_slots": self.available_slots,
            "status": self.status.value, # Serializar la cantidad de cupos disponibles 
            "user_email": self.get_user_email(),
            "time_start": self.time_start,
            "time_end": self.time_end,
            "location_trip": self.location_trip,
            "date_trip": self.date_trip,
            "location_start": self.location_start,
            "location_end": self.location_end,
            "company_name": self.company_name,
            "rif": self.rif,
            "description_company": self.description_company,
            "phone_company": self.phone_company,
            "instagram_company": self.instagram_company,
            "facebook_company": self.facebook_company

        }

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(50), unique=True, nullable=False)