import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import dbConnect from '../config/dbConnect.js';             //Use JS
import userRoutes from '../routes/userRoutes.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';

//DB connect
dbConnect();
const app = express();

//pass income data
app.use(express.json());

//Routes
app.use("/api/v1/users", userRoutes);

//Err middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;