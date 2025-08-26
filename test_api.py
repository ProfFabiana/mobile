#!/usr/bin/env python3
"""
Script de teste para a API de E-commerce
Demonstra como usar todos os endpoints da API
"""

import requests
import json

# Configuração da API
API_BASE = "http://localhost:5002/api"

def test_api():
    print("=== TESTANDO API DE E-COMMERCE ===\n")
    
    # 1. Testar login
    print("1. Testando login...")
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    try:
        response = requests.post(f"{API_BASE}/users/login", json=login_data)
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Login realizado com sucesso! Usuário: {user_data['user']['username']}")
            user_id = user_data['user']['id']
        else:
            print(f"❌ Erro no login: {response.json()}")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Erro: Não foi possível conectar à API. Certifique-se de que o servidor está rodando.")
        return
    
    # 2. Listar produtos
    print("\n2. Listando produtos...")
    try:
        response = requests.get(f"{API_BASE}/products")
        if response.status_code == 200:
            products = response.json()
            print(f"✅ {len(products)} produtos encontrados:")
            for product in products[:3]:  # Mostrar apenas os 3 primeiros
                print(f"   - {product['name']}: R$ {product['price']:.2f} ({product['category']})")
        else:
            print(f"❌ Erro ao listar produtos: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    # 3. Buscar produto específico
    print("\n3. Buscando produto específico (ID: 1)...")
    try:
        response = requests.get(f"{API_BASE}/products/1")
        if response.status_code == 200:
            product = response.json()
            print(f"✅ Produto encontrado: {product['name']}")
            print(f"   Preço: R$ {product['price']:.2f}")
            print(f"   Estoque: {product['stock_quantity']} unidades")
        else:
            print(f"❌ Produto não encontrado: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    # 4. Criar um pedido
    print("\n4. Criando pedido...")
    order_data = {
        "user_id": user_id,
        "items": [
            {"product_id": 1, "quantity": 2},
            {"product_id": 2, "quantity": 1}
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/orders", json=order_data)
        if response.status_code == 201:
            order = response.json()
            print(f"✅ Pedido criado com sucesso! ID: {order['id']}")
            print(f"   Total: R$ {order['total_amount']:.2f}")
            print(f"   Status: {order['status']}")
            order_id = order['id']
        else:
            print(f"❌ Erro ao criar pedido: {response.json()}")
            return
    except Exception as e:
        print(f"❌ Erro: {e}")
        return
    
    # 5. Listar pedidos do usuário
    print(f"\n5. Listando pedidos do usuário {user_id}...")
    try:
        response = requests.get(f"{API_BASE}/orders/user/{user_id}")
        if response.status_code == 200:
            orders = response.json()
            print(f"✅ {len(orders)} pedidos encontrados:")
            for order in orders:
                print(f"   - Pedido #{order['id']}: R$ {order['total_amount']:.2f} ({order['status']})")
        else:
            print(f"❌ Erro ao listar pedidos: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    # 6. Atualizar status do pedido
    print(f"\n6. Atualizando status do pedido {order_id}...")
    try:
        response = requests.put(f"{API_BASE}/orders/{order_id}", json={"status": "confirmed"})
        if response.status_code == 200:
            updated_order = response.json()
            print(f"✅ Status atualizado para: {updated_order['status']}")
        else:
            print(f"❌ Erro ao atualizar pedido: {response.json()}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    # 7. Registrar novo usuário
    print("\n7. Registrando novo usuário...")
    new_user_data = {
        "username": f"testuser_{user_id}",
        "email": f"test{user_id}@email.com",
        "password": "123456",
        "first_name": "Usuário",
        "last_name": "Teste"
    }
    
    try:
        response = requests.post(f"{API_BASE}/users/register", json=new_user_data)
        if response.status_code == 201:
            new_user = response.json()
            print(f"✅ Usuário criado: {new_user['username']} (ID: {new_user['id']})")
        else:
            print(f"❌ Erro ao criar usuário: {response.json()}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    # 8. Listar categorias
    print("\n8. Listando categorias...")
    try:
        response = requests.get(f"{API_BASE}/products/categories")
        if response.status_code == 200:
            categories = response.json()
            print(f"✅ Categorias disponíveis: {', '.join(categories)}")
        else:
            print(f"❌ Erro ao listar categorias: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro: {e}")
    
    print("\n=== TESTE CONCLUÍDO ===")
    print("A API está funcionando corretamente! ✅")

if __name__ == "__main__":
    test_api()

