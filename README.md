# Sara7a App

A Node.js/Express API that provides authentication, user profiles, and messaging with MongoDB and Redis backing services. The service uses JWT access/refresh tokens, bcrypt password hashing, email verification, and file uploads.

**Tech Stack**
- Node.js (ESM)
- Express
- MongoDB with Mongoose
- Redis (node-redis)
- JWT (jsonwebtoken)
- bcrypt
- Joi validation
- Multer file uploads
- Nodemailer
- dotenv
- crypto-js

**Key Features**
- User signup and login with bcrypt hashing
- Email verification with one-time code stored in Redis
- JWT access and refresh tokens with role-based audiences
- Token revocation on logout using Redis
- User profile management and profile URL generation
- Messaging module with reactions
- Static serving of uploaded files

**Project Structure**
- `src/main.js` entry point
- `src/app.controller.js` app bootstrap and router wiring
- `src/modules/auth/` auth controllers, validation, and service
- `src/modules/users/` user controllers and service
- `src/modules/messages/` message controllers, validation, and service
- `src/database/` MongoDB and Redis helpers
- `src/common/` shared utilities, middleware, enums, and security helpers
- `config/` environment configuration
- `uploads/` uploaded files (served statically)

**Environment Configuration**
Create `config/.env` from the example file, then fill in real values. The app loads variables from `config/.env` (see `config/env.service.js`). Do not commit real secrets to source control.

Required variables:
- `DB_HOST` MongoDB connection string
- `DB_KEY` app key / salt (project-specific usage)
- `DB_PORT` server port
- `DB_MOOD` runtime mode
- `DB_JWT_KEY` general JWT key (project-specific usage)
- `DB_JWT_ADMIN_KEY` JWT signing key for admin access tokens
- `DB_JWT_USER_KEY` JWT signing key for user access tokens
- `JWT_REFRESH_TOKEN_ADMIN` JWT signing key for admin refresh tokens
- `JWT_REFRESH_TOKEN_USER` JWT signing key for user refresh tokens
- `REDIS_URL` Redis connection URL
- `APP_EMAIL` sender email address
- `APP_PASSWORD` sender app password

Example `config/.env.example` template:
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

**Install**
```bash
npm install
```

**Run**
There is no start script in `package.json`. Run directly with Node:
```bash
node src/main.js
```

**Notes**
- `uploads/` is served as a static directory at `/uploads`.
- Access token expiry is set to 30 minutes; refresh tokens are set to 1 year (see `src/common/security/security.js`).
