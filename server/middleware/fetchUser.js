var jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req , res , next) => {

        //get user from the jwt token and append id to req object
        const token = req.header('auth-token');
        // const token = req.body.token;
        if (!token){
            return res.status(401).json({error : "Please authenticate using a valid token"})
        }
        else{
            console.log('token verified')
        }
        try {
            const data = jwt.verify(token , JWT_SECRET);
            req.user = data.user
            next();
        }
        catch (error){
            res.status(401).json({error : "Please authenticate using a valid token"})
        }
}

module.exports = fetchuser;