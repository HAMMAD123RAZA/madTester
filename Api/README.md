# Campaign Management REST API

This project provides a robust, secure, and scalable RESTful API for managing advertising campaigns, built with Node.js, Express, and PostgreSQL (via Neon).

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete (soft delete) advertising campaigns.
- **JWT Authentication**: Secure all campaign endpoints using JSON Web Tokens.
- **Input Validation**: Comprehensive validation for all incoming data with descriptive error messages.
- **Rate Limiting**: Protection against abuse with a limit of 100 requests per minute per IP.
- **Pagination & Filtering**: Support for `filter`, `sort`, `page`, and `limit` query parameters on the list endpoint.
- **Soft Deletion**: Campaigns are marked with a `deleted_at` timestamp instead of being permanently removed.
- **Metrics Integration**: Single campaign retrieval includes full metrics from the associated table.

## Technical Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit
- **Testing**: Jest, Supertest

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HAMMAD123RAZA/theMadTester.git
   cd theMadTester
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   db=your_postgresql_connection_string
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Documentation

The project includes an OpenAPI 3.0 specification (`openapi.yaml`) and a Postman collection (`postman_collection.json`) for easy testing and integration.

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | JWT authentication | No |
| GET | `/campaigns` | List all campaigns (with filter/sort/pagination) | Yes |
| POST | `/campaigns` | Create a new campaign | Yes |
| GET | `/campaigns/:id` | Get single campaign with full metrics | Yes |
| PUT | `/campaigns/:id` | Update campaign details | Yes |
| DELETE | `/campaigns/:id` | Soft delete campaign | Yes |

## Testing

Run the test suite using:
```bash
npm test
```
