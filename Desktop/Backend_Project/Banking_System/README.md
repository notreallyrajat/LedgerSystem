# 🏦 Banking Ledger REST API

A backend-focused Banking Ledger REST API built using **Node.js, Express.js and MongoDB**, designed to explore secure authentication, reliable financial transaction processing, database consistency and backend system design.

The project focuses on implementing essential backend engineering concepts such as JWT authentication, refresh token management, JWT blacklisting, idempotency, concurrency handling, MongoDB sessions, aggregation pipelines and third-party service integration.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- User registration and login using JWT-based authentication.
- Access token and refresh token mechanism.
- JWT blacklisting for invalidating previously issued tokens.
- Protected routes using custom authentication middleware.
- Secure environment-based configuration for sensitive credentials.

### 💳 Account & Transaction Management
- Account creation and balance management.
- Initial account funding.
- Financial transaction processing.
- Transaction-related email notifications.
- Transaction reliability through idempotency and concurrency handling.

### ⚡ Transaction Reliability
- **Idempotency:** Prevents duplicate transaction processing when identical requests are retried.
- **Concurrency Handling:** Addresses simultaneous transaction requests and potential balance inconsistencies.
- **MongoDB Sessions:** Used to manage database transactions and maintain consistency across related database operations.
- **Atomic Operations:** Explored atomic database operations to improve the reliability of financial operations.

### 📧 Email Integration
- Integrated Nodemailer with the Gmail API.
- Implemented Google OAuth 2.0 authentication.
- Configured OAuth credentials and refresh tokens using Google OAuth Playground.
- Automated email notifications during user registration and transaction commits.
- HTML-based email templates.

### 📊 Database & Data Processing
- MongoDB database integration using Mongoose.
- Schema design and data modelling.
- MongoDB aggregation pipelines for data retrieval and processing.
- Database references and relationships between application entities.
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
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
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

## 🧠 Core Backend Engineering Concepts

This project provided hands-on experience with several important backend engineering concepts.

### 1. JWT Authentication & Blacklisting

Implemented token-based authentication using JSON Web Tokens.

Key concepts explored:
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

Explored:
- Starting and managing database sessions.
- Executing related operations within transactions.
- Committing transactions.
- Aborting transactions when operations fail.
- Maintaining consistency across related database operations.

### 5. MongoDB Aggregation Pipelines

Explored MongoDB aggregation pipelines for processing and retrieving structured information from collections.

Concepts include:
- `$match`
- `$group`
- `$project`
- `$lookup`
- `$sort`
- `$unwind`

These operations provide powerful ways to filter, transform, group and analyze database documents.

### 6. Google OAuth 2.0 & Nodemailer

Integrated the Gmail API with Nodemailer to automate application emails.

Implementation involved:
- Setting up Google Cloud credentials.
- Configuring Gmail API access.
- Using Google OAuth 2.0.
- Generating and configuring OAuth refresh tokens through Google OAuth Playground.
- Sending HTML-based emails through Nodemailer.

Automated emails are triggered during user registration and transaction commits.

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

**Security Notice:** Never commit your `.env` file, database credentials, JWT secrets or Google OAuth credentials to a public repository.

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

The REST API was developed and tested using Postman.

The collection is organized into logical groups to make API exploration and testing easier.

**Postman Collection:** 

[Add your public Postman collection link here]

**Live API Deployment:**

[Add your Render deployment URL here]

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

---

*Built to explore backend engineering, secure API development, database consistency and reliable financial transaction processing.*