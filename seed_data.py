import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app
from src.models.user import db, User
from src.models.product import Product

def seed_database():
    with app.app_context():
        # Limpar dados existentes
        db.drop_all()
        db.create_all()
        
        # Criar usuários de exemplo
        user1 = User(
            username='admin',
            email='admin@ecommerce.com',
            first_name='Admin',
            last_name='Sistema'
        )
        user1.set_password('admin123')
        
        user2 = User(
            username='cliente1',
            email='cliente1@email.com',
            first_name='João',
            last_name='Silva'
        )
        user2.set_password('123456')
        
        db.session.add(user1)
        db.session.add(user2)
        
        # Criar produtos de exemplo
        products = [
            Product(
                name='iPhone 14',
                description='Smartphone Apple iPhone 14 com 128GB',
                price=4999.99,
                category='Eletrônicos',
                stock_quantity=10,
                image_url='https://example.com/iphone14.jpg'
            ),
            Product(
                name='Samsung Galaxy S23',
                description='Smartphone Samsung Galaxy S23 com 256GB',
                price=3999.99,
                category='Eletrônicos',
                stock_quantity=15,
                image_url='https://example.com/galaxy-s23.jpg'
            ),
            Product(
                name='Notebook Dell Inspiron',
                description='Notebook Dell Inspiron 15 com Intel i5, 8GB RAM, 256GB SSD',
                price=2799.99,
                category='Computadores',
                stock_quantity=5,
                image_url='https://example.com/dell-inspiron.jpg'
            ),
            Product(
                name='Fone de Ouvido Sony',
                description='Fone de ouvido Sony WH-1000XM4 com cancelamento de ruído',
                price=1299.99,
                category='Áudio',
                stock_quantity=20,
                image_url='https://example.com/sony-headphones.jpg'
            ),
            Product(
                name='Tênis Nike Air Max',
                description='Tênis Nike Air Max 270 - Tamanho 42',
                price=599.99,
                category='Calçados',
                stock_quantity=8,
                image_url='https://example.com/nike-air-max.jpg'
            ),
            Product(
                name='Camiseta Básica',
                description='Camiseta básica 100% algodão - Tamanho M',
                price=49.99,
                category='Roupas',
                stock_quantity=50,
                image_url='https://example.com/camiseta-basica.jpg'
            )
        ]
        
        for product in products:
            db.session.add(product)
        
        db.session.commit()
        print("Banco de dados populado com dados de exemplo!")
        print("Usuários criados:")
        print("- admin / admin123")
        print("- cliente1 / 123456")
        print(f"Produtos criados: {len(products)}")

if __name__ == '__main__':
    seed_database()

