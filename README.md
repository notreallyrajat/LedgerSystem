# 🏦 Banking Ledger REST API

A backend-focused Banking Ledger REST API built using **Node.js, Express.js, and MongoDB**. The project explores secure authentication, reliable financial transaction processing, database consistency, and backend system design.

It implements essential backend engineering concepts such as JWT authentication, refresh token management, JWT blacklisting, idempotency, concurrency handling, MongoDB sessions and transactions, aggregation pipelines, and third-party service integration.

**Live API:** https://ledgersystem-7y1z.onrender.com/api

---

## 🚀 Key Features

### 🔐 Authentication & Security
- User registration and login using JWT-based authentication.
- Access token and refresh token mechanism.
- JWT blacklisting for invalidating previously issued tokens.
- Protected routes using custom authentication middleware.
- Environment-based configuration for sensitive credentials.

### 💳 Account & Transaction Management
- Account creation and balance management.
- Initial account funding.
- Financial transactions between accounts.
- Transaction-related email notifications.
- Transaction reliability through idempotency and concurrency handling.

### ⚡ Transaction Reliability
- **Idempotency:** Prevents duplicate transaction processing when identical requests are retried.
- **Concurrency Handling:** Addresses simultaneous transaction requests and potential balance inconsistencies.
- **MongoDB Sessions:** Manages database transactions and consistency across related operations.
- **Atomic Operations:** Explores atomic database operations for reliable financial operations.

### 📧 Email Integration
- Nodemailer integration with the Gmail API.
- Google OAuth 2.0 authentication.
- OAuth credentials and refresh token configuration.
- Automated email notifications during user registration and transaction commits.
- HTML-based email templates.

### 📊 Database & Data Processing
- MongoDB integration using Mongoose.
- Schema design and data modelling.
- MongoDB aggregation pipelines.
- Database references and relationships.
- Query filtering and document population.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | NoSQL database |
| Mongoose | ODM and database management |
| JWT | Authentication |
| Nodemailer | Email delivery |
| Google OAuth 2.0 | Gmail API authorization |
| Postman | API testing and development |
| Git & GitHub | Version control |

---

## 📁 Project Structure

```text
Banking-Ledger/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*The structure represents the main architectural divisions of the application. Individual files and subdirectories may vary.*

---

# 📖 API Documentation

The Banking Ledger API follows a RESTful architecture and provides endpoints for user authentication, account management, and financial transaction processing.

**Base URL**

```text
https://ledgersystem-7y1z.onrender.com/api
```

**Content-Type**

```http
Content-Type: application/json
```

### API Route Groups

| Module | Base Route | Purpose |
|---|---|---|
| Authentication | `/auth` | Registration, login and logout |
| Accounts | `/account` | Account creation and balance retrieval |
| Transactions | `/Transaction` | Initial funding and fund transfers |

> **Note:** The transaction route uses an uppercase `T` in the supplied endpoint paths. Keep the capitalization consistent when making requests.

## 1. Authentication API

Base route: `/api/auth`

### 1.1 Register User

Registers a new user in the Banking Ledger system.

| Property | Value |
|---|---|
| Endpoint | `/auth/register` |
| HTTP Method | `POST` |
| Request Body | JSON |

**Request Body**

```json
{
  "email": "user@example.com",
  "name": "Test User",
  "password": "YOUR_PASSWORD"
}
```

**Description**

- Accepts user registration details.
- Creates a new user in the database.
- Integrates with the email service to send a registration email.
- Uses the configured authentication and security mechanisms.

### 1.2 Login User

Authenticates an existing user and initiates an authenticated session.

| Property | Value |
|---|---|
| Endpoint | `/auth/login` |
| HTTP Method | `POST` |
| Request Body | JSON |

**Request Body**

```json
{
  "email": "user@example.com",
  "password": "YOUR_PASSWORD"
}
```

**Description**

- Validates user credentials.
- Authenticates the user.
- Uses the JWT access and refresh token mechanism.
- Establishes the authentication state according to the application's token handling implementation.

### 1.3 Logout User

Terminates the active authenticated session.

| Property | Value |
|---|---|
| Endpoint | `/auth/logout` |
| HTTP Method | `POST` |
| Request Body | None / Empty |

**Description**

- Handles user logout.
- Uses JWT blacklisting to invalidate previously issued tokens.
- Helps prevent further use of invalidated authentication tokens.

---

## 2. Accounts API

Base route: `/api/account`

### 2.1 Fetch Account Balance

Retrieves the current balance associated with a specific account ID.

| Property | Value |
|---|---|
| Endpoint | `/account/balance/{accountId}` |
| HTTP Method | `GET` |
| Request Body | None |

**Example Request**

```http
GET /api/account/balance/{accountId}
```

Example using the deployed API:

```text
https://ledgersystem-7y1z.onrender.com/api/account/balance/YOUR_ACCOUNT_ID
```

**Description**

- Accepts an account ID as a URL parameter.
- Retrieves the corresponding account balance.
- Provides account balance information through the API.

### 2.2 Fetch Accounts

Retrieves the accounts associated with the authenticated user.

| Property | Value |
|---|---|
| Endpoint | `/account/` |
| HTTP Method | `GET` |
| Request Body | None |

**Example Request**

```http
GET /api/account/
```

**Description**

- Fetches account information from the database.
- Supports account retrieval for the user.
- Uses the application's account-query and authentication logic.

### 2.3 Create Account

Creates a new bank ledger account.

| Property | Value |
|---|---|
| Endpoint | `/account/CreateAccount` |
| HTTP Method | `POST` |
| Request Body | JSON |

**Example Request**

```http
POST /api/account/CreateAccount
```

**Description**

- Creates a new account.
- Stores account information in MongoDB.
- Associates account information with the relevant application user according to the account model.

*The exact request-body fields depend on the account schema and controller implementation.*

---

## 3. Transactions API

Base route: `/api/Transaction`

This module handles financial operations, including initial account funding and transfers between accounts.

### 3.1 Initial Fund

Deposits opening funds into an account.

| Property | Value |
|---|---|
| Endpoint | `/Transaction/InitialFund` |
| HTTP Method | `POST` |
| Request Body | JSON |

**Request Body**

```json
{
  "toAccount": "YOUR_ACCOUNT_ID",
  "amount": 120,
  "idempotencyKey": "UNIQUE_IDEMPOTENCY_KEY"
}
```

**Description**

- Accepts the destination account and funding amount.
- Processes the initial funding operation.
- Uses an idempotency key to help prevent duplicate processing when a request is retried.
- Uses the application's transaction-management logic to maintain database consistency.

### 3.2 Normal Transaction

Executes a fund transfer between two accounts.

| Property | Value |
|---|---|
| Endpoint | `/Transaction/CreateTransaction` |
| HTTP Method | `POST` |
| Request Body | JSON |

**Request Body**

```json
{
  "fromAccount": "SOURCE_ACCOUNT_ID",
  "toAccount": "DESTINATION_ACCOUNT_ID",
  "amount": 200,
  "idempotencyKey": "UNIQUE_IDEMPOTENCY_KEY"
}
```

**Description**

- Accepts source and destination account IDs.
- Accepts the amount to be transferred.
- Uses an idempotency key to prevent duplicate transaction processing.
- Handles database operations involving the participating accounts.
- Uses MongoDB sessions and transactions to maintain consistency across related database changes.
- Integrates transaction-related email notifications.

**Important: Idempotency**

An idempotency key identifies a particular transaction request. If the client retries the same operation using the same key, the application can recognize the previously processed request and avoid executing the same financial operation again.

For separate transactions, generate a new unique idempotency key.

---

## 📌 API Endpoint Summary

| Module | Endpoint | Method |
|---|---|---|
| Authentication | `/auth/register` | POST |
| Authentication | `/auth/login` | POST |
| Authentication | `/auth/logout` | POST |
| Accounts | `/account/` | GET |
| Accounts | `/account/balance/{accountId}` | GET |
| Accounts | `/account/CreateAccount` | POST |
| Transactions | `/Transaction/InitialFund` | POST |
| Transactions | `/Transaction/CreateTransaction` | POST |

All endpoint paths above are relative to the base URL:

```text
https://ledgersystem-7y1z.onrender.com/api
```

---

## 🧠 Core Backend Engineering Concepts

This project provided hands-on experience with several important backend engineering concepts.

### 1. JWT Authentication & Blacklisting

Implemented token-based authentication using JSON Web Tokens.

Concepts explored:
- Access token generation and validation.
- Refresh token workflows.
- Token invalidation through JWT blacklisting.
- Authentication middleware for protected routes.
- Managing authenticated user sessions.

### 2. Idempotency in Financial Transactions

Idempotency is essential in financial systems where clients may retry requests due to network failures or unexpected responses.

Implemented idempotency handling to prevent duplicate transaction processing when the same request is submitted multiple times.

This helps maintain transaction integrity and prevents unintended duplicate operations.

### 3. Concurrency Handling

Financial applications can receive multiple requests attempting to modify the same account balance simultaneously.

Explored concurrency-related challenges and approaches to ensure reliable transaction processing and prevent inconsistent account balances.

### 4. MongoDB Sessions & Transactions

Used MongoDB sessions to manage operations involving multiple database changes.

Concepts explored:
- Starting and managing database sessions.
- Executing related operations within transactions.
- Committing transactions.
- Aborting transactions when operations fail.
- Maintaining consistency across related database operations.

### 5. MongoDB Aggregation Pipelines

Explored MongoDB aggregation pipelines for processing and retrieving structured information from collections.

Aggregation stages explored:

| Stage | Purpose |
|---|---|
| `$match` | Filters documents |
| `$group` | Groups documents and performs calculations |
| `$project` | Selects or transforms fields |
| `$lookup` | Performs collection joins |
| `$sort` | Sorts documents |
| `$unwind` | Deconstructs array fields |

### 6. Google OAuth 2.0 & Nodemailer

Integrated the Gmail API with Nodemailer to automate application emails.

Implementation involved:
- Setting up Google Cloud credentials.
- Configuring Gmail API access.
- Using Google OAuth 2.0.
- Generating and configuring OAuth refresh tokens through Google OAuth Playground.
- Sending HTML-based emails through Nodemailer.

Automated emails are triggered during user registration and transaction commits.

### 7. Modular Backend Architecture

Organized application logic into separate architectural layers:

- **Routes:** Define API endpoints.
- **Controllers:** Handle incoming requests and responses.
- **Services:** Contain application/business logic.
- **Models:** Define database schemas and data structures.
- **Middleware:** Handle authentication and request processing.
- **Configuration:** Manage database and application configuration.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Google Cloud project with Gmail API enabled

### 1. Clone the Repository

```bash
git clone https://github.com/notreallyrajat/LedgerSystem.git
```

### 2. Navigate to the Project Directory

```bash
cd LedgerSystem
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_DB_URL=your_mongodb_connection_string

JWT_KEY=your_jwt_secret

EMAIL_USER=your_gmail_address
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token
```

Replace the placeholder values with your actual credentials.

**Security Notice:** Never commit your `.env` file, database credentials, JWT secrets, or Google OAuth credentials to a public repository.

### 5. Run the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🧪 API Testing & Documentation

The REST API was developed and tested using **Postman**.

The collection is organized into logical groups to make API exploration and testing easier:

- Authentication
- Accounts
- Transactions

**Postman Collection:**  
[Add your public Postman collection link here]

**Live API Deployment:**  
https://ledgersystem-7y1z.onrender.com/api

---

## 🔍 Key Learning Outcomes

Building this project helped me develop a deeper understanding of:

- RESTful API architecture and HTTP methods.
- Authentication, authorization and token lifecycle management.
- JWT blacklisting and refresh token workflows.
- Idempotency in financial transaction processing.
- Concurrency challenges in backend systems.
- MongoDB sessions and multi-document transactions.
- Database consistency and atomic operations.
- MongoDB aggregation pipelines.
- OAuth 2.0 and third-party API integration.
- Asynchronous programming with Node.js.
- Modular backend architecture using controllers, services and middleware.
- Deployment and environment-based application configuration.

---

## 🔮 Future Improvements

- Comprehensive automated testing with integration and unit tests.
- Enhanced transaction auditing and logging.
- Rate limiting and advanced request validation.
- Improved observability and error monitoring.
- More extensive API documentation.
- Additional security and transaction integrity mechanisms.

---

## 👨‍💻 Author

**Rajat Chhangani**

B.Tech CSE – AI & ML  
Backend Development | Node.js | Express.js | MongoDB

- **GitHub:** [@notreallyrajat](https://github.com/notreallyrajat)
- **LinkedIn:** [Add your LinkedIn profile URL]

---

*Built to explore backend engineering, secure API development, database consistency, and reliable financial transaction processing.*
