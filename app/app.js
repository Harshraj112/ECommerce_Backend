import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import dbConnect from '../config/dbConnect.js';             //Use JS
import userRoutes from '../routes/userRoutes.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import productRoutes from '../routes/productRoutes.js';
import categoriesRoutes from '../routes/categoriesRoutes.js';
import brandsRoutes from '../routes/brandRoutes.js';
import colourRoutes from '../routes/colourRoutes.js';
import reviewRouter from '../routes/reviewRouter.js';

//DB connect
dbConnect();
const app = express();

//pass income data
app.use(express.json());

//Routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoriesRoutes);
app.use("/api/v1/brands", brandsRoutes);
app.use("/api/v1/colours", colourRoutes);
app.use("/api/v1/reviews", reviewRouter)

//Err middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;