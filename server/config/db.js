const mongoose = require('mongoose');
const Mongodb_Url = process.env.MONGODB_URL;

//connect to mongodb
const connectToMongo = async () => {
    try {
        const connection = await mongoose.connect(Mongodb_Url);
        console.log(`Connected to Database: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToMongo;
