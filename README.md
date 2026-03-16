# Sara7a App

A **Node.js / Express REST API** that provides authentication, user profiles, and anonymous messaging similar to the Sara7a concept.
The application uses **MongoDB** for persistent storage and **Redis** for caching, token revocation, and verification codes.

The API implements **JWT authentication with access and refresh tokens**, **email verification**, **secure password hashing**, and **file uploads**.

---

# Tech Stack

* **Node.js (ES Modules)**
* **Express.js**
* **MongoDB + Mongoose**
* **Redis (node-redis)**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **Joi validation**
* **Multer (file uploads)**
* **Nodemailer**
* **Helmet (security headers)**
* **CORS**
* **Rate limiting**
* **dotenv**
* **crypto-js**
* **Nginx (reverse proxy for production)**

---

# Key Features

### Authentication

* User signup and login
* Password hashing with bcrypt
* Email verification using one-time codes stored in Redis
* JWT authentication (Access + Refresh tokens)
* Role-based audiences

### Security

* Rate limiting
* Security headers using Helmet
* Token revocation using Redis
* CORS protection

### Users

* User profile management
* Profile URL generation
* Upload profile images

### Messaging

* Send anonymous messages
* Message reactions
* Message retrieval

### File Handling

* Upload files using Multer
* Static file serving from `/uploads`

---

# Project Structure

```
src
│
├── main.js
├── app.controller.js
│
├── modules
│   ├── auth
│   ├── users
│   └── messages
│
├── database
│   ├── mongo
│   └── redis
│
├── common
│   ├── middleware
│   ├── utils
│   └── security
│
config
uploads
```

---

# Environment Configuration

Create:

```
config/.env
```

Then copy values from:

```
config/.env.example
```

Example:

```env
DB_HOST=mongodb://127.0.0.1:27017/bcrypt
DB_KEY=your_app_key
DB_PORT=3000
DB_MOOD=dev

DB_JWT_KEY=your_jwt_key
DB_JWT_ADMIN_KEY=your_admin_jwt_key
DB_JWT_USER_KEY=your_user_jwt_key

JWT_REFRESH_TOKEN_ADMIN=your_admin_refresh_key
JWT_REFRESH_TOKEN_USER=your_user_refresh_key

REDIS_URL=redis://localhost:6379

APP_EMAIL=your_email@example.com
APP_PASSWORD=your_app_password
```

---

# Installation

```bash
npm install
```

---

# Run the Project

Since there is no start script:

```bash
node src/main.js
```

Server will start on:

```
http://localhost:3000
```

---

# Static Files

Uploaded files are served from:

```
/uploads
```

Example:

```
http://localhost:3000/uploads/image.png
```

---

# Token Expiration

| Token         | Expiration |
| ------------- | ---------- |
| Access Token  | 30 minutes |
| Refresh Token | 1 year     |

Defined in:

```
src/common/security/security.js
```

---

# Nginx Reverse Proxy (Production)

In production, **Nginx is used as a reverse proxy** in front of the Node.js server.

Benefits:

* Better performance
* SSL termination
* Static file handling
* Protection from direct access to Node.js

### Example Nginx Configuration

```
server {
    listen 80;

    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;
    }
}
```

### Architecture

```
Client
   ↓
Nginx
   ↓
Node.js (Express)
   ↓
MongoDB
   ↓
Redis
```

---

# Security Notes

* Never commit `.env` files
* Always store secrets in environment variables
* Use HTTPS in production
* Rate limiting helps prevent abuse

---

# Future Improvements

* Docker support
* API documentation using Swagger
* Automated tests
* CI/CD pipeline
* Horizontal scaling with Redis rate limiting

---

# Author

Hazem Adel Gaber Zaki
Backend Developer (Node.js)
