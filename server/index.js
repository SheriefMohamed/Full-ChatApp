const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const app = express();
const errorMiddleware = require('./middlewares/errors');
require('dotenv').config({ path: "./server/config/.env" });
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/api/auth', userRoutes);

app.use(errorMiddleware);

connectToDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})