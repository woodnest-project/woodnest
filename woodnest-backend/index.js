const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Connection = require('./config/db');
const itemRouter = require('./routes/route');
const authRouter = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Static directory serving for uploaded photos

app.use('/', itemRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 8000;

Connection();
app.listen(PORT, () => console.log("Server Running on Port Number " + PORT));