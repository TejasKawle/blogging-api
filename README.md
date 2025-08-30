# Blogging API

A secure and feature-rich RESTful API for blogging platforms, built with Node.js, Express, and MongoDB. This API supports user authentication, post management, and user administration with robust role-based access control.

## Features

- **User Authentication:** Register and login with JWT-based sessions.
- **Post Management:** CRUD operations on blog posts; supports tags and author relationships.
- **User Administration:** Admin-only routes for user management.
- **Validation:** Input validation using Joi.
- **Security:** Password hashing with bcrypt, protected routes, and role checks.
- **RESTful Design:** Clean, versioned API endpoints.

## Technologies Used

- Node.js, Express
- MongoDB, Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cors, dotenv
- Joi

## API Endpoints

### Authentication

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive a JWT
- `GET /api/auth/profile` – Get current user's profile (requires authentication)

### Posts

- `GET /api/posts/` – Get all posts
- `GET /api/posts/:id` – Get a post by ID
- `POST /api/posts/` – Create a post (authenticated users)
- `PUT /api/posts/:id` – Update a post (author or admin)
- `DELETE /api/posts/:id` – Delete a post (author or admin)

### Users (Admin only, protected)

- `GET /admin/` – Get all users
- `GET /admin/:id` – Get user by ID
- `PUT /admin/:id` – Update user details
- `DELETE /admin/:id` – Delete user

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TejasKawle/blogging-api.git
   cd blogging-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Run the server:**
   ```bash
   npm start
   ```

## Project Structure

```
/config           # Database config
/controllers      # Route controllers (auth, posts, users)
/middlewares      # Authentication, admin check, etc.
/models           # Mongoose models (User, Post)
/routes           # Route definitions
/validation       # Joi validation schemas
index.js          # App entry point
```

## Example Usage

- Register:
  ```http
  POST /api/auth/register
  Content-Type: application/json
  {
    "name": "Alice",
    "email": "alice@example.com",
    "password": "yourpassword"
  }
  ```

- Create Post (JWT required in Authorization header):
  ```http
  POST /api/posts/
  Content-Type: application/json
  Authorization: Bearer <token>
  {
    "title": "First Blog Post",
    "content": "This is a post.",
    "tags": ["intro", "welcome"]
  }
  ```

## Security and Access

- All `/api/auth/profile` and `/api/posts` POST/PUT/DELETE endpoints require a valid JWT.
- `/admin` routes are only accessible by users with the admin role.

## License

ISC

---

**Author:** Tejas Kawle
