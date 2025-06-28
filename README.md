# 🚀 Yape Code Challenge – Ecosistema Completo con Docker

Este proyecto contiene dos microservicios escritos en NestJS:
- `transactions`: API REST para crear y consultar transacciones.
- `antifraud`: microservicio Kafka que analiza las transacciones y responde si son `approved` o `rejected`.

Ambos usan:
- PostgreSQL como base de datos (en Docker)
- Kafka como canal de comunicación entre microservicios

---

## 🐳 Cómo ejecutar el ecosistema completo

### 1. Clonar el repositorio

```bash
git clone <REPO_URL>
cd yape-nestjs-prisma-kafka
```

### 2. Ejecutar con Docker Compose

```bash
docker-compose up --build
```

Este comando levantará:
- PostgreSQL
- Zookeeper + Kafka
- Microservicio `transaction` (puerto 3000)
- Microservicio `antifraud`
---

## 🔎 Probar el flujo con Postman o curl

### 1. Crear una transacción (valor MENOR o igual a 1000)

Esto debería ser `approved` ✅

```
POST http://localhost:3000/transactions
Content-Type: application/json

{
  "accountExternalIdDebit": "user123",
  "accountExternalIdCredit": "user456",
  "transferTypeId": 1,
  "value": 500
}
```

### 2. Crear una transacción (valor MAYOR a 1000)

Esto debería ser `rejected` ❌

```
POST http://localhost:3000/transactions
Content-Type: application/json

{
  "accountExternalIdDebit": "userABC",
  "accountExternalIdCredit": "userXYZ",
  "transferTypeId": 1,
  "value": 1500
}
```

### 3. Consultar una transacción creada

```
GET http://localhost:3000/transactions/{transactionExternalId}
```

> Reemplaza `{transactionExternalId}` con el ID retornado en la creación.

---

## ✅ Lógica de antifraude

| Valor de la transacción | Resultado   |
|--------------------------|-------------|
| ≤ 1000                   | approved ✅  |
| > 1000                   | rejected ❌  |

---

## 🧪 Consejos para pruebas

- Usa [Postman](https://www.postman.com/) para enviar peticiones HTTP.
- Se puede monitorear los logs del transaction con:

```bash
docker-compose logs -f transaction
```
- Se puede monitorear los logs del antifraud con:

```bash
docker-compose logs -f antifraud
```

- Si se quiere resetear la base de datos, se puede eliminar el volumen de Docker con:

```bash
docker-compose down -v
```

---

## 📦 Estructura general del proyecto

```
.
├── apps/
│   ├── transaction/
│   └── antifraud/
├── prisma/
├── docker-compose.yml
└── README.md
```

---
