const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const app = express();
require('dotenv').config({ path: "./server/config/.env" });

app.use(cors());
app.use(express.json())

connectToDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})