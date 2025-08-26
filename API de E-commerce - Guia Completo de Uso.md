# API de E-commerce - Guia Completo de Uso

## Visão Geral

Este projeto consiste em uma API completa de e-commerce desenvolvida com Flask (backend) e preparada para integração com React Native/Expo (frontend). A API oferece funcionalidades completas para gerenciamento de produtos, usuários, autenticação e pedidos.

## Estrutura do Projeto

```
ecommerce_api/
├── src/
│   ├── models/          # Modelos de dados
│   │   ├── user.py      # Modelo de usuário
│   │   ├── product.py   # Modelo de produto
│   │   └── order.py     # Modelos de pedido e itens
│   ├── routes/          # Rotas da API
│   │   ├── user.py      # Rotas de usuário e autenticação
│   │   ├── product.py   # Rotas de produtos
│   │   └── order.py     # Rotas de pedidos
│   ├── database/        # Banco de dados SQLite
│   │   └── app.db       # Arquivo do banco
│   └── main.py          # Arquivo principal da aplicação
├── venv/                # Ambiente virtual Python
├── seed_data.py         # Script para popular banco com dados de exemplo
└── requirements.txt     # Dependências do projeto
```

## Como Executar o Backend

### 1. Preparar o Ambiente

```bash
cd ecommerce_api
source venv/bin/activate  # Ativar ambiente virtual
```

### 2. Popular o Banco com Dados de Exemplo

```bash
python seed_data.py
```

Isso criará:
- **Usuários de exemplo:**
  - admin / admin123
  - cliente1 / 123456
- **6 produtos de exemplo** em diferentes categorias

### 3. Iniciar o Servidor

```bash
python src/main.py
```

O servidor estará disponível em: `http://localhost:5002`

## Endpoints da API

### Autenticação e Usuários

#### Registrar Usuário
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "novouser",
  "email": "user@email.com",
  "password": "senha123",
  "first_name": "Nome",
  "last_name": "Sobrenome",
  "phone": "11999999999",
  "address": "Endereço completo"
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Listar Usuários
```http
GET /api/users
```

#### Obter Usuário Específico
```http
GET /api/users/{user_id}
```

#### Atualizar Usuário
```http
PUT /api/users/{user_id}
Content-Type: application/json

{
  "first_name": "Novo Nome",
  "phone": "11888888888"
}
```

### Produtos

#### Listar Produtos
```http
GET /api/products
```

#### Filtrar Produtos
```http
GET /api/products?category=Eletrônicos
GET /api/products?search=iPhone
```

#### Obter Produto Específico
```http
GET /api/products/{product_id}
```

#### Criar Produto
```http
POST /api/products
Content-Type: application/json

{
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "price": 299.99,
  "category": "Categoria",
  "stock_quantity": 10,
  "image_url": "https://exemplo.com/imagem.jpg"
}
```

#### Atualizar Produto
```http
PUT /api/products/{product_id}
Content-Type: application/json

{
  "price": 249.99,
  "stock_quantity": 15
}
```

#### Obter Categorias
```http
GET /api/products/categories
```

### Pedidos

#### Criar Pedido
```http
POST /api/orders
Content-Type: application/json

{
  "user_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

#### Listar Pedidos
```http
GET /api/orders
GET /api/orders?user_id=1  # Filtrar por usuário
```

#### Obter Pedido Específico
```http
GET /api/orders/{order_id}
```

#### Atualizar Status do Pedido
```http
PUT /api/orders/{order_id}
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Status válidos:** pending, confirmed, shipped, delivered, cancelled

#### Obter Pedidos de um Usuário
```http
GET /api/orders/user/{user_id}
```

## Modelos de Dados

### Usuário
- id (int, primary key)
- username (string, único)
- email (string, único)
- password_hash (string)
- first_name (string, opcional)
- last_name (string, opcional)
- phone (string, opcional)
- address (text, opcional)
- created_at (datetime)

### Produto
- id (int, primary key)
- name (string)
- description (text, opcional)
- price (float)
- image_url (string, opcional)
- category (string, opcional)
- stock_quantity (int, padrão: 0)
- created_at (datetime)

### Pedido
- id (int, primary key)
- user_id (int, foreign key)
- total_amount (float)
- status (string, padrão: 'pending')
- created_at (datetime)
- updated_at (datetime)

### Item do Pedido
- id (int, primary key)
- order_id (int, foreign key)
- product_id (int, foreign key)
- quantity (int)
- unit_price (float)

## Funcionalidades Implementadas

### Backend Flask
✅ **Autenticação completa** (registro, login, hash de senhas)
✅ **CRUD completo de produtos** com filtros e categorias
✅ **Sistema de pedidos** com controle de estoque
✅ **Relacionamentos entre modelos** (usuários, produtos, pedidos)
✅ **CORS habilitado** para integração com frontend
✅ **Validações** de dados e erros tratados
✅ **Banco de dados SQLite** com migrations automáticas

### Recursos Avançados
- **Controle de estoque:** Produtos têm quantidade disponível que é decrementada ao fazer pedidos
- **Status de pedidos:** Sistema completo de acompanhamento (pendente → confirmado → enviado → entregue)
- **Cancelamento:** Pedidos cancelados devolvem itens ao estoque
- **Filtros:** Busca por categoria e nome de produto
- **Relacionamentos:** Pedidos incluem detalhes completos dos produtos

## Como Integrar com React Native/Expo

### 1. Instalação de Dependências
```bash
npm install axios @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context
```

### 2. Exemplo de Serviço API
```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: (username, password) => 
    api.post('/users/login', { username, password }),
  register: (userData) => 
    api.post('/users/register', userData),
};

export const productService = {
  getProducts: (category = '', search = '') => 
    api.get(`/products?category=${category}&search=${search}`),
  getProduct: (id) => 
    api.get(`/products/${id}`),
  getCategories: () => 
    api.get('/products/categories'),
};

export const orderService = {
  createOrder: (orderData) => 
    api.post('/orders', orderData),
  getUserOrders: (userId) => 
    api.get(`/orders/user/${userId}`),
  updateOrderStatus: (orderId, status) => 
    api.put(`/orders/${orderId}`, { status }),
};
```

### 3. Exemplo de Tela de Produtos
```javascript
// screens/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { productService } from '../services/api';

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Carregando produtos...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
```

## Testando a API

### Usando curl
```bash
# Listar produtos
curl -X GET http://localhost:5002/api/products

# Login
curl -X POST http://localhost:5002/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Criar pedido
curl -X POST http://localhost:5002/api/orders \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"items":[{"product_id":1,"quantity":2}]}'
```

### Usando Postman ou Insomnia
Importe as rotas usando a base URL `http://localhost:5002/api` e teste todos os endpoints documentados acima.

## Próximos Passos

1. **Frontend React Native:** Implementar todas as telas do aplicativo
2. **Autenticação JWT:** Implementar tokens para sessões mais seguras
3. **Upload de imagens:** Permitir upload de fotos de produtos
4. **Pagamentos:** Integrar gateway de pagamento
5. **Push notifications:** Notificar sobre status de pedidos
6. **Deploy:** Hospedar a API em um servidor de produção

## Estrutura Recomendada do App React Native

```
EcommerceApp/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── screens/         # Telas do aplicativo
│   │   ├── AuthScreen.js
│   │   ├── ProductsScreen.js
│   │   ├── ProductDetailScreen.js
│   │   ├── CartScreen.js
│   │   └── OrdersScreen.js
│   ├── services/        # Serviços de API
│   ├── navigation/      # Configuração de navegação
│   └── utils/          # Utilitários e helpers
```

Este guia fornece uma base sólida para desenvolver um aplicativo de e-commerce completo usando a API Flask criada.

