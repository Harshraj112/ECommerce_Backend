import express from "express";
import { createCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLogin} from "../middlewares/isLogin.js"
const categoriesRoutes = express.Router();

categoriesRoutes.post("/", createCategoryCtrl)

export default categoriesRoutes;