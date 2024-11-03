import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import todoRouter from './routes/todoRoutes.js';
import cors from 'cors';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/routes', todoRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`***Server running on port: ${port}***`));
