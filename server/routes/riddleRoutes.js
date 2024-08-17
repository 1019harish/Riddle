// // // routes/dashboard.js
// // const express = require('express');
// // const { validationResult } = require('express-validator');
// // const router = express.Router();
// // const fetchuser = require('../middlware/fetchUser'); 
// // const Riddle = require('../model/Riddle');
// // const User = require('../model/User');
// // const crypto = require('crypto'); // Import the crypto module

// // // Route 1: Get all riddles of a particular user
// // router.get('/fetchriddle', fetchuser, async (req, res) => {
// //     try {
// //         const riddles = await Riddle.find({ user: req.user.id });
// //         res.json(riddles);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route 2: Add a new riddle
// // router.post('/addriddle', fetchuser, async (req, res) => {
// //     try {
// //         const errors = validationResult(req);
// //         if (!errors.isEmpty()) {
// //             return res.status(400).json({ errors: errors.array() });
// //         }

// //         const { question, answer, hashType } = req.body;

// //         let hashedAnswer;
// //         if (hashType === 'sha-1') {
// //             hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
// //         } else if (hashType === 'sha-256') {
// //             hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
// //         } else {
// //             return res.status(400).json({ errors: [{ msg: 'Invalid hash type' }] });
// //         }

// //         const riddle = new Riddle({
// //             question,
// //             answer: hashedAnswer,
// //             hashType,
// //             user: req.user.id
// //         });

// //         const savedRiddle = await riddle.save();
// //         res.json(savedRiddle);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route 3: Get all riddles except those added by the logged-in user
// // // router.get('/fetchother', async (req, res) => {
// // //     try {
// // //         const riddles = await Riddle.find({ user: { $ne: req.user.id } });
// // //         res.json(riddles);
// // //     } catch (error) {
// // //         console.error(error.message);
// // //         res.status(500).send("Internal Server Error");
// // //     }
// // // });


// // router.get('/fetchother', fetchuser, async (req, res) => {
// //     try {
// //         const riddles = await Riddle.find({ user: { $ne: req.user.id } });
// //         res.json(riddles);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route 4: Edit a riddle
// // router.put('/editriddle/:id', fetchuser, async (req, res) => {
// //     const { question, answer, hashType } = req.body;
// //     const newRiddle = {};
// //     if (question) newRiddle.question = question;
// //     if (answer) newRiddle.answer = answer;
// //     if (hashType) newRiddle.hashType = hashType;

// //     try {
// //         let riddle = await Riddle.findById(req.params.id);
// //         if (!riddle) return res.status(404).send('Riddle Not Found');
// //         if (riddle.user.toString() !== req.user.id) return res.status(401).send('Unauthorized');

// //         riddle = await Riddle.findByIdAndUpdate(req.params.id, { $set: newRiddle }, { new: true });
// //         res.json({ riddle });
// //     } catch (err) {
// //         console.error(err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // Route 5: Delete a riddle
// // router.delete('/deleteriddle/:id', fetchuser, async (req, res) => {
// //     try {
// //         let riddle = await Riddle.findById(req.params.id);
// //         if (!riddle) return res.status(404).send('Riddle not Found');
// //         if (riddle.user.toString() !== req.user.id) return res.status(401).send('Not Allowed');

// //         riddle = await Riddle.findByIdAndDelete(req.params.id);
// //         res.json({ "Success ": "Riddle has been deleted", riddle });
// //     } catch (err) {
// //         console.error(err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // Route 6: Solve a riddle
// // router.post('/solveriddle', async (req, res) => {
// //     try {
// //         const { riddleId, answer, hashType } = req.body;
// //         console.log('req.body is  in /slveriddle : ' , req.body)
// //         const riddle = await Riddle.findById(riddleId);
// //         if (!riddle)
// //         {
// //             console.log('riddle not found')
// //             return res.status(404).json({ error: 'Riddle not found' });
            
// //         }
// //         else {
// //             console.log('riddle found')
// //             console.log(riddle)
// //         }let hashedAnswer;
// //         if (hashType === 'sha-1') {
// //             hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
// //         } else if (hashType === 'sha-256') {
// //             hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
// //         } else {
// //             return res.status(400).json({ error: 'Invalid hash type' });
// //         }
// //         console.log('hashed answer is : ' , hashedAnswer)
// //         if (riddle.answer === hashedAnswer && !riddle.solved) {
// //             riddle.solved = true;
// //             await riddle.save();

// //             const user = await User.findById(req.user.id);
// //             if (user) {
// //                 user.points += 1;
// //                 await user.save();
// //             }

// //             return res.json({ message: 'Riddle solved! 1 point added.' });
// //         } else {
// //             return res.status(400).json({ error: 'Incorrect answer or riddle already solved' });
// //         }
// //     } catch (error) {
// //         console.error('Error in /solveriddle route:', error.message);
// //         res.status(500).send('Internal Server Error');
// //     }
// // });

// // module.exports = router;


// const express = require('express');
// const { validationResult } = require('express-validator');
// const router = express.Router();
// const fetchuser = require('../middlware/fetchUser');
// const solveriddle = require('../middlware/solveRiddle')
// const Riddle = require('../model/Riddle');
// const User = require('../model/User');
// const crypto = require('crypto');

// // Route 1: Get all riddles of a particular user
// router.get('/fetchriddle', fetchuser, async (req, res) => {
//     try {
//         const riddles = await Riddle.find({ user: req.user.id });
//         res.json(riddles);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Route 2: Add a new riddle
// router.post('/addriddle', fetchuser, async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { question, answer, hashType } = req.body;

//         let hashedAnswer;
//         if (hashType === 'sha-1') {
//             hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
//         } else if (hashType === 'sha-256') {
//             hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
//         } else {
//             return res.status(400).json({ errors: [{ msg: 'Invalid hash type' }] });
//         }

//         const riddle = new Riddle({
//             question,
//             answer: hashedAnswer,
//             hashType,
//             user: req.user.id
//         });

//         const savedRiddle = await riddle.save();
//         res.json(savedRiddle);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Route 3: Get all riddles except those added by the logged-in user
// router.get('/fetchother', fetchuser, async (req, res) => {
//     try {
//         const riddles = await Riddle.find({ user: { $ne: req.user.id } });
//         res.json(riddles);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Route 4: Edit a riddle
// router.put('/editriddle/:id', fetchuser, async (req, res) => {
//     const { question, answer, hashType } = req.body;
//     const newRiddle = {};
//     if (question) newRiddle.question = question;
//     if (answer) newRiddle.answer = answer;
//     if (hashType) newRiddle.hashType = hashType;

//     try {
//         let riddle = await Riddle.findById(req.params.id);
//         if (!riddle) return res.status(404).send('Riddle Not Found');
//         if (riddle.user.toString() !== req.user.id) return res.status(401).send('Unauthorized');

//         riddle = await Riddle.findByIdAndUpdate(req.params.id, { $set: newRiddle }, { new: true });
//         res.json({ riddle });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Route 5: Delete a riddle
// router.delete('/deleteriddle/:id', fetchuser, async (req, res) => {
//     try {
//         let riddle = await Riddle.findById(req.params.id);
//         if (!riddle) return res.status(404).send('Riddle not Found');
//         if (riddle.user.toString() !== req.user.id) return res.status(401).send('Not Allowed');

//         riddle = await Riddle.findByIdAndDelete(req.params.id);
//         res.json({ "Success ": "Riddle has been deleted", riddle });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Route 6: Solve a riddle
// // router.post('/solveriddle', solveriddle, async (req, res) => {
// //     try {
// //         const { riddleId, answer, hashType } = req.body;

// //         const riddle = await Riddle.findById(riddleId);
// //         if (!riddle) return res.status(404).json({ error: 'Riddle not found' });

// //         let hashedAnswer;
// //         if (hashType === 'sha-1') {
// //             hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
// //         } else if (hashType === 'sha-256') {
// //             hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
// //         } else {
// //             return res.status(400).json({ error: 'Invalid hash type' });
// //         }

// //         if (riddle.answer === hashedAnswer && !riddle.solved) {
// //             riddle.solved = true;
// //             await riddle.save();

// //             const user = await User.findById(req.user.id);
// //             if (user) {
// //                 user.points += 1;
// //                 await user.save();
// //             }
            

// //             return res.json({ message: 'Riddle solved! 1 point added.' });
// //         } else {
// //             return res.status(400).json({ error: 'Incorrect answer or riddle already solved' });
// //         }
// //     } catch (error) {
// //         console.error('Error in /solveriddle route:', error.message);
// //         res.status(500).send('Internal Server Error');
// //     }
// // });
// router.post('/solveriddle', async (req, res) => {
//     const { riddleId, answer, hashType } = req.body;

//     try {
//         // Fetch the riddle from the database
//         const riddle = await Riddle.findById(riddleId);

//         if (!riddle) {
//             return res.status(404).json({ error: 'Riddle not found' });
//         }

//         // Hash the provided answer based on the selected hash type
//         const hash = hashType === 'sha-256'
//             ? crypto.createHash('sha256').update(answer).digest('hex')
//             : crypto.createHash('sha1').update(answer).digest('hex');

//         // Compare the hashed answer with the stored hashed answer
//         if (hash === riddle.answer) {
//             // Update the riddle status to solved
//             riddle.solved = true;
//             await riddle.save();

//             // Optionally, update user's points if you have user tracking (omitted here)
//             // const user = await User.findById(req.user.id);
//             // user.points += 1;
//             // await user.save();

//             return res.json({ success: 'Riddle solved! 1 point added.' });
//         } else {
//             return res.status(400).json({ error: 'Incorrect answer' });
//         }
//     } catch (error) {
//         console.error('Error solving riddle:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });
// module.exports = router;


// routes/dashboard.js
const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Riddle = require('../model/Riddle');
const User = require('../model/User');
const crypto = require('crypto');

// Route 1: Get all riddles of a particular user
router.get('/fetchriddle', fetchuser, async (req, res) => {
    try {
        const riddles = await Riddle.find({ user: req.user.id });
        res.json(riddles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new riddle
router.post('/addriddle', fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { question, answer, hashType } = req.body;

        let hashedAnswer;
        if (hashType === 'sha-1') {
            hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
        } else if (hashType === 'sha-256') {
            hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
        } else {
            return res.status(400).json({ errors: [{ msg: 'Invalid hash type' }] });
        }

        const riddle = new Riddle({
            question,
            answer: hashedAnswer,
            hashType,
            user: req.user.id
        });

        const savedRiddle = await riddle.save();
        res.json(savedRiddle);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get all riddles except those added by the logged-in user
router.get('/fetchother', fetchuser, async (req, res) => {
    try {
        const riddles = await Riddle.find({ user: { $ne: req.user.id } });
        res.json(riddles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Edit a riddle
router.put('/editriddle/:id', fetchuser, async (req, res) => {
    const { question, answer, hashType } = req.body;
    const newRiddle = {};
    if (question) newRiddle.question = question;
    if (answer) newRiddle.answer = answer;
    if (hashType) newRiddle.hashType = hashType;

    try {
        let riddle = await Riddle.findById(req.params.id);
        if (!riddle) return res.status(404).send('Riddle Not Found');
        if (riddle.user.toString() !== req.user.id) return res.status(401).send('Unauthorized');

        riddle = await Riddle.findByIdAndUpdate(req.params.id, { $set: newRiddle }, { new: true });
        res.json({ riddle });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route 5: Delete a riddle
router.delete('/deleteriddle/:id', fetchuser, async (req, res) => {
    try {
        let riddle = await Riddle.findById(req.params.id);
        if (!riddle) return res.status(404).send('Riddle not Found');
        if (riddle.user.toString() !== req.user.id) return res.status(401).send('Not Allowed');

        riddle = await Riddle.findByIdAndDelete(req.params.id);
        res.json({ "Success ": "Riddle has been deleted", riddle });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route 6: Solve a riddle
// router.post('/solveriddle', fetchuser,async (req, res) => {
//     const { riddleId, answer, hashType } = req.body;
//     console.log(`req.body is : ${req.body.riddleId}`)
//     console.log(`req.body is : ${req.body.answer}`)
//     console.log(`req.body is : ${req.body.hashType}`)

//     try {
//         const riddle = await Riddle.findById(riddleId);
//         console.log(`riddle found is : ${riddle}`)

//         if (!riddle) {
//             return res.status(404).json({ error: 'Riddle not found' });
//         }

//         let hashedAnswer;
//         if (hashType === 'sha-1') {
//             hashedAnswer = crypto.createHash('sha1').update(answer).digest('hex');
//         } else if (hashType === 'sha-256') {
//             hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
//         } else {
//             return res.status(400).json({ error: 'Invalid hash type' });
//         }

//         if (riddle.answer === hashedAnswer && !riddle.solved) {
//             riddle.solved = true;
//             await riddle.save();

//             const user = await User.findById(req.user.id);
//             console.log(`user id is : ${user}`)
//             if (user) {
//                 user.points += 1;
//                 await user.save();
//                 return res.json({ message: 'Riddle solved! 1 point added.', points: user.points });
//             }
//         } else {
//             return res.status(400).json({ error: 'Incorrect answer or riddle already solved' });
//         }
//     } catch (error) {
//         console.error('Error in /solveriddle route:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.post('/solveriddle', fetchuser, async (req, res) => {
    try {
        const { riddleId, answer, hashType } = req.body;
        const userId = req.user.id; // Get userId from fetchuser middleware

        // Fetch the riddle from the database
        const riddle = await Riddle.findById(riddleId);
        if (!riddle) {
            return res.status(404).json({ message: 'Riddle not found' });
        }

        // Hash the user's answer using the specified hash type
        const hash = crypto.createHash(hashType).update(answer).digest('hex');

        // Check if the hashed answer matches the stored hashed answer
        if (hash !== riddle.answer) {
            return res.status(400).json({ message: 'Incorrect answer' });
        }

        // Update the riddle to mark it as solved and increment the solvedCount
        riddle.solved = true;
        riddle.solvedCount += 1;
        await riddle.save();

        // Fetch the user and update their points and riddlesSolved count
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.points += 1;          // Increment the points by 1
        user.riddlesSolved += 1;   // Increment riddlesSolved by 1
        await user.save();

        res.status(200).json({ 
            message: 'Riddle solved', 
            points: user.points, 
            riddlesSolved: user.riddlesSolved 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//route  7 get points
// Get user points
router.get('/points', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ points: user.points });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user points
router.post('/points', async (req, res) => {
    try {
        const userId = req.user.id;
        const { points } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.points = points;
        await user.save();

        res.json({ points: user.points });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
