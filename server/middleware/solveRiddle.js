var jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const solveriddle = (req, res, next) => {
    // Retrieve the token from the request body
    const token = req.body.token;
    console.log('auth-token in solveriddle is:', token);

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        // Attach the user ID to the request object
        req.user = data.user;
        console.log('User data:', req.user);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = solveriddle;
