import express from "express";
import { createReviewCtrl } from "../controllers/reviewCtrl.js";
import { isLogin } from "../middlewares/isLogin.js";

const reviewRouter = express.Router();

reviewRouter.post('/:productID',isLogin, createReviewCtrl);

export default reviewRouter;