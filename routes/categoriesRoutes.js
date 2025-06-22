import express from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLogin} from "../middlewares/isLogin.js"
const categoriesRoutes = express.Router();

categoriesRoutes.post("/",isLogin, createCategoryCtrl);
categoriesRoutes.get("/:id", getSingleCategoryCtrl);
categoriesRoutes.get("/", getAllCategoryCtrl);
categoriesRoutes.put("/:id", updateCategoryCtrl);
categoriesRoutes.delete("/:id", deleteCategoryCtrl);

export default categoriesRoutes;