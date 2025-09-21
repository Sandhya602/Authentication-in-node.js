# Authentication in Node.js (bcrypt + JWT)


This repository is a simple implementation of the assignment described in the provided PDF. It includes:


- **Password Hashing** using `bcrypt`.
- **JWT Authentication** using `jsonwebtoken`.
- In-memory user storage (no database required).


> Assignment reference: Password hashing and JWT authentication tasks as provided in the assignment PDF. fileciteturn0file0


## Files


- `server.js` - Main Express server with routes:
- `POST /register` - Register new user (hashes password with bcrypt)
- `POST /login` - Login and receive JWT token
- `GET /profile` - Protected route, requires `Authorization: Bearer <token>` header
- `package.json` - Project dependencies and scripts


## Requirements


- Node.js (v14+ recommended)
- npm


## Setup


```bash
# 1. Clone (or copy files into) your repo folder
# 2. Install dependencies
npm install


# 3. Start the server
npm start
# or for development with automatic reload (if nodemon installed)
npm run dev
