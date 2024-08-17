
    const express = require("express");
    require("dotenv").config();
    const { body, validationResult } = require("express-validator");
    const User = require("../model/User");
    const router = express.Router();
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const fetchuser = require('../middleware/fetchUser');
    
    const JWT_SECRET = process.env.JWT_SECRET;
    
    router.post(
        "/createuser",
        [
            body("username")
                .isLength({ min: 5 })
                .withMessage("Username must be at least 5 characters long"),
            body("email").isEmail().withMessage("Please provide a valid email"),
            body("password")
                .isLength({ min: 5 })
                .withMessage("Password must be at least 6 characters long"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            try {
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ message: "Email already exists" });
                }
    
                const hasheduser = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    points: req.body.points || 0 // Ensure points are saved and default to 0
                });
    
                // JWT payload
                const payload = {
                    user: {
                        id: hasheduser.id,
                        username: hasheduser.username,
                        email: hasheduser.email,
                        points: hasheduser.points // Include points in the payload
                    },
                };
    
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
    
                res.json({ token, user: payload.user });
            } catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        }
    );
    
    //Route 2: Authenticate user, no login required
    router.post(
        "/login",
        [
            body("email", "Enter a valid email").isEmail(),
            body("password", "Password cannot be blank").exists(),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            // If any error, return bad request and the errors
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
    
            const { email, password } = req.body;
            try {
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ error: "Invalid credentials" });
                }

                
                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({ error: "Invalid credentials" });
                }
                
                const payload = {
                    user: {
                        id: user.id,
                    },
                };
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2hr" });
                res.json({token})
            } catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    );
    
    
    // Route 3: Get logged-in user details using POST /api/user/getuser, login required
    router.post(
        "/getuser", fetchuser,
        async (req, res) => {
            try {
                const userId = req.user.id;
                const user = await User.findById(userId).select("-password");
                res.send(user);
            } catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    );
    //route to fetch user points
    router.post('/getuserpoints', fetchuser, async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('points');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ points: user.points });
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
    //leaderboard route
    router.get('/leaderboard', async (req, res) => {
        try {
            // Fetch users sorted by points in descending order
            const users = await User.find().sort({ points: -1 }).select('username points riddlesSolved');
            res.json(users);
        } catch (error) {
            console.error(`Error fetching leaderboard: ${error.message}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    module.exports = router;
    