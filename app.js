import dotenv from 'dotenv';
dotenv.config(".env");

import express from 'express';
const app = express();
import dbConnection from './db.js';
import todo from './routes/todoRoute.js';
import cors from 'cors';
const port = process.env.PORT || 8000;

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/todo", todo);

app.listen(port, () => {
    console.log(`Application Listening on port ${port}`);
});
