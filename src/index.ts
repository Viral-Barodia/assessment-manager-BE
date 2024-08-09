import express from 'express';
import dotenv from 'dotenv';
var cors = require('cors');

import { connectToMongoDB } from "./connection";
import { authRouter } from "./routers/authRoute";
import { questionRouter } from "./routers/questionRoute";
import { candidateRouter } from './routers/candidateRoute';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT;
if(process.env.DB_URL) {
  connectToMongoDB(process.env.DB_URL)
    .then(async () => {
        console.log("Database connected");
    })
    .catch((err: any) => console.error('Database connection error:', err));
}

app.use('/auth', authRouter);
app.use('/question', questionRouter);
app.use('/candidate', candidateRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});