// server.js
// Simple Node.js + Express server implementing:
// 1) Register + bcrypt password hashing
// 2) Login + JWT generation
// 3) Protected /profile route that requires JWT


const express = require('express');
const bodyParser = require('body-parser'); // optional; express.json() also works
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret'; // for production keep in env


// Middleware
app.use(bodyParser.json()); // parse application/json


// In-memory user store (array of objects: { username, passwordHash })
const users = [];


// Helper: find user by username
function findUser(username) {
return users.find(u => u.username === username);
}


// Route: POST /register
// Body: { username, password }
app.post('/register', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) {
return res.status(400).json({ message: 'Username and password are required.' });
}


if (findUser(username)) {
return res.status(409).json({ message: 'User already exists.' });
}


const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);


users.push({ username, passwordHash: hash });


return res.status(201).json({ message: 'User registered successfully.' });
} catch (err) {
console.error('Register error:', err);
return res.status(500).json({ message: 'Internal server error.' });
}
});


// Route: POST /login
// Body: { username, password }
// If valid: return JWT token
app.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) {
return res.status(400).json({ message: 'Username and password are required.' });
}


const user = findUser(username);
if (!user) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const match = await bcrypt.compare(password, user.passwordHash);
if (!match) {
return res.status(401).json({ message: 'Invalid credentials' });
