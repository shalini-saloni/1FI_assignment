# 1FI Assignment - EMI Product Showcase

A full-stack application showcasing products with EMI (Equated Monthly Installment) plans and variants. Built with React, Vite, Express.js, and PostgreSQL.


## Setup and Run Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=emi_products
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   PORT=4000
   FRONTEND_URL=http://localhost:5174
   ```

4. **Initialize the database:**
   ```bash
   npm run seed
   ```
   This will create the schema and populate sample data.

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4000`

6. **To run in production:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5174`

4. **To build for production:**
   ```bash
   npm run build
   ```

5. **To preview the production build:**
   ```bash
   npm run preview
   ```

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL
- **ORM/Client:** pg (native PostgreSQL client)
- **Middleware:** CORS, dotenv
- **Development:** Nodemon

### Frontend
- **UI Framework:** React 19.2.0
- **Routing:** React Router DOM 7.13.1
- **Build Tool:** Vite 7.3.1
- **CSS:** CSS Modules
- **Linting:** ESLint 9.39.1
- **Development:** Vite

---

## Database Schema

### tables Overview

The application uses three main tables with proper relationships and indexing:

### 1. Products Table
```sql
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  brand       VARCHAR(100) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);
```
Stores product information with unique slug for URL-friendly identifiers.

### 2. Variants Table
```sql
CREATE TABLE variants (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  storage     VARCHAR(50),
  color       VARCHAR(100),
  color_hex   VARCHAR(10),
  mrp         NUMERIC(10,2) NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  image_url   TEXT,
  in_stock    BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW()
);
```
Stores product variants with different specifications (storage, color, pricing).

### 3. EMI Plans Table
```sql
CREATE TABLE emi_plans (
  id              SERIAL PRIMARY KEY,
  variant_id      INTEGER NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  tenure_months   INTEGER NOT NULL,
  monthly_amount  NUMERIC(10,2) NOT NULL,
  interest_rate   NUMERIC(5,2) DEFAULT 0,
  cashback_amount NUMERIC(10,2) DEFAULT 0,
  is_popular      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```
Stores EMI plan options for each product variant with flexible tenure and cashback options.

### Indexes
- `idx_variants_product_id` - Improves queries filtering variants by product
- `idx_emi_plans_variant_id` - Improves queries filtering EMI plans by variant
- `idx_products_slug` - Ensures fast product lookups by slug

### Relationships
- **Products → Variants:** One-to-Many (with cascade delete)
- **Variants → EMI Plans:** One-to-Many (with cascade delete)

---

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### 1. Get All Products
**Endpoint:** `GET /products`

**Description:** Fetch all products with their first variant (cheapest option) and minimum EMI.

**Request:**
```bash
curl -X GET http://localhost:4000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "slug": "iphone-15-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "description": "Premium smartphone with advanced features",
      "variant_id": 1,
      "variant_name": "128GB Black",
      "price": 79999,
      "mrp": 89999,
      "image_url": "https://example.com/iphone15.jpg",
      "color": "Black",
      "color_hex": "#000000",
      "storage": "128GB",
      "min_emi": 3333
    }
  ]
}
```

---

### 2. Get Product by Slug
**Endpoint:** `GET /products/:slug`

**Description:** Fetch a single product with all its variants and EMI plans.

**Parameters:**
- `slug` (string, required): The product slug (e.g., "iphone-15-pro")

**Request:**
```bash
curl -X GET http://localhost:4000/api/products/iphone-15-pro
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "brand": "Apple",
    "category": "Smartphones",
    "description": "Premium smartphone with advanced features",
    "image_url": "https://example.com/iphone15.jpg",
    "created_at": "2024-02-20T10:30:00Z",
    "variants": [
      {
        "id": 1,
        "product_id": 1,
        "name": "128GB Black",
        "storage": "128GB",
        "color": "Black",
        "color_hex": "#000000",
        "mrp": 89999,
        "price": 79999,
        "image_url": "https://example.com/iphone15-black.jpg",
        "in_stock": true,
        "created_at": "2024-02-20T10:30:00Z",
        "emi_plans": [
          {
            "id": 1,
            "variant_id": 1,
            "tenure_months": 3,
            "monthly_amount": 26667,
            "interest_rate": 0,
            "cashback_amount": 0,
            "is_popular": false,
            "created_at": "2024-02-20T10:30:00Z"
          },
          {
            "id": 2,
            "variant_id": 1,
            "tenure_months": 6,
            "monthly_amount": 13333,
            "interest_rate": 0,
            "cashback_amount": 1000,
            "is_popular": true,
            "created_at": "2024-02-20T10:30:00Z"
          }
        ]
      },
      {
        "id": 2,
        "product_id": 1,
        "name": "256GB Silver",
        "storage": "256GB",
        "color": "Silver",
        "color_hex": "#C0C0C0",
        "mrp": 99999,
        "price": 89999,
        "image_url": "https://example.com/iphone15-silver.jpg",
        "in_stock": true,
        "created_at": "2024-02-20T10:30:00Z",
        "emi_plans": [
          {
            "id": 3,
            "variant_id": 2,
            "tenure_months": 6,
            "monthly_amount": 15000,
            "interest_rate": 0,
            "cashback_amount": 1500,
            "is_popular": true,
            "created_at": "2024-02-20T10:30:00Z"
          }
        ]
      }
    ]
  }
}
```

---

### 3. Get Variant Details by ID
**Endpoint:** `GET /products/:slug/variants/:variantId`

**Description:** Fetch a specific product variant with its EMI plans.

**Parameters:**
- `slug` (string, required): The product slug
- `variantId` (integer, required): The variant ID

**Request:**
```bash
curl -X GET http://localhost:4000/api/products/iphone-15-pro/variants/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_id": 1,
    "name": "128GB Black",
    "storage": "128GB",
    "color": "Black",
    "color_hex": "#000000",
    "mrp": 89999,
    "price": 79999,
    "image_url": "https://example.com/iphone15-black.jpg",
    "in_stock": true,
    "created_at": "2024-02-20T10:30:00Z",
    "emi_plans": [
      {
        "id": 1,
        "variant_id": 1,
        "tenure_months": 3,
        "monthly_amount": 26667,
        "interest_rate": 0,
        "cashback_amount": 0,
        "is_popular": false,
        "created_at": "2024-02-20T10:30:00Z"
      },
      {
        "id": 2,
        "variant_id": 1,
        "tenure_months": 6,
        "monthly_amount": 13333,
        "interest_rate": 0,
        "cashback_amount": 1000,
        "is_popular": true,
        "created_at": "2024-02-20T10:30:00Z"
      },
      {
        "id": 3,
        "variant_id": 1,
        "tenure_months": 12,
        "monthly_amount": 6667,
        "interest_rate": 0,
        "cashback_amount": 2000,
        "is_popular": false,
        "created_at": "2024-02-20T10:30:00Z"
      }
    ]
  }
}
```

---

### 4. Health Check
**Endpoint:** `GET /health`

**Description:** Check if the API is running.

**Request:**
```bash
curl -X GET http://localhost:4000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-20T10:30:00.000Z"
}
```

---

## Error Responses

All API errors follow this structure:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `404` - Resource not found (product or variant doesn't exist)
- `500` - Internal server error

---

## Notes
- All prices are in INR (Indian Rupees)
- EMI amounts are calculated based on the product price and tenure
- The `is_popular` flag indicates recommended EMI plans
- Variants are ordered by ID in ascending order
- Images are stored as URLs
- All timestamps are in UTC format