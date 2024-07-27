# CRUD API App

This project is built with Node.Js, Express, PostgreSQL. It also includes JWT authentication and user management with CRUD operations.

## Prerequisites

- Node.js & npm installed
- PostgreSQL installed and running

## How to run / Installation

1. **Clone the repository**

```bash
git clone https://github.com/Fozzzzy/node-express-jwt.git
cd node-express-jwt
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Set up the PostgreSQL database:**

- Create a new database
- Run the following SQL command to create the users table:

```sql
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE
);
```

4. **Configure the database connection:**

- Open `db.js` and update the connection details

5. **Run the application**
   Start server by typing in the terminal:

```bash
node expressServer.js
```

The server will start running on http://localhost:3000

### Public Routes

- POST /users: Create a new user
- GET /users: Get all users
- PUT /users/:id: Update a user
- DELETE /users/:id: Delete a user
- POST /login: Authenticate and receive a JWT

### Protected Routes

The following routes require a valid JWT token in the Authorization header:

- GET /protected: Test protected GET route
- POST /protected: Test protected POST route
- PUT /protected/:id: Test protected PUT route
- DELETE /protected/:id: Test protected DELETE route
