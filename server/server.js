require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./config/db');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken to verify tokens
const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
// Configure CORS to allow specific origins
const fetchuser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

app.use(express.json());

connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/dashboard', require('./routes/riddleRoutes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
