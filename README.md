# express-basic-endpoints

Basic Express.js, TS & TypeORM server app demonstrating how to implement a
basic CRUD (Create, Read, Update, Delete) API for users and posts.

## How to setup and run the app

Before you start, you need to install the following prerequisites:
1. PostgreSQL database: https://www.postgresql.org/download/
2. PgAdmin (offers an interface for managing the DB): https://www.pgadmin.org/download/
3. Node.js (along with NPM): https://nodejs.org/en/download

Once finished installing the software, please create a `.env` file in
the root folder of the project and put inside the following populated
environment variables (populate them with your database details):
```
WEB_SERVER_PORT=3000

DB_HOST=localhost
DB_TYPE=postgres
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_PORT=5432

```

Lastly, run the following commands in the terminal:

```
npm i
npm run up-migration
npm run dev
```

The app should start on http://localhost:3000

## Endpoints

- `/auth/login` **(POST)** - For logging in as a user with the request body containing
                         an `{ email: "...", password: "..." }` object. You can try
                         with `{ "email": "admin@gmail.com", "password": "Test123$" }`.
- `/users` **(GET)** - Gets all the users from the DB
- `/users/:id` **(GET)** - Gets a user from the DB by a specified ID (e.g.: `/users/1`).
- `/users` **(POST)** - Creates a user. Expected request body:
```
{
  "name": "Your Full Name",
  "email": "your.email@gmail.com",
  "password": "YourStrongPassword123$"
}
```
- `/users/:id` **(PATCH)** - Updates the data of the user with the ID specified in the
                         route params. Expects an object containing any combination
                         of the following properties: `name`, `email` or `passowrd`.
- `/users/:id` **(DELETE)** - Deletes a specific user from the DB, recognized by ID.