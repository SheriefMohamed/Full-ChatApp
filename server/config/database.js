const mongoose = require('mongoose');
const connectToDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DATABASE_LINK,()=> {
        console.log("Connected to database !!");
    });
}

module.exports = connectToDatabase;