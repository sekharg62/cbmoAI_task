import express from 'express';
import dotenv from 'dotenv';
import apiRoute, { apiProtected } from './routes/api.js';
dotenv.config({path: './.env'});
import mongoose from 'mongoose';
import { DB_connect } from './utils/constants.js';
import AuthMiddleware from './middleware/auth.middleware.js';

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
   

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.json())
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);