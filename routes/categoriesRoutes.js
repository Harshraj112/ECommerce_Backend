import express from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLogin} from "../middlewares/isLogin.js"
const categoriesRoutes = express.Router();

categoriesRoutes.post("/",isLogin, createCategoryCtrl);
categoriesRoutes.get("/", deleteCategoryCtrl);
categoriesRoutes.get("/:id", getSingleCategoryCtrl);
categoriesRoutes.get("/:id",isLogin, deleteCategoryCtrl);

export default categoriesRoutes;