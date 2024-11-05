"""empty message

Revision ID: d5cc3416ec72
Revises: aa4ebe2db6d1
Create Date: 2024-11-05 02:26:33.421652

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5cc3416ec72'
down_revision = 'aa4ebe2db6d1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_admins')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('is_admin')

    op.create_table('users_admins',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='users_admins_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='users_admins_pkey'),
    sa.UniqueConstraint('username', name='users_admins_username_key')
    )
    # ### end Alembic commands ###
