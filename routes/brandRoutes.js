import express from "express";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/brandCtrl.js";
import {isLogin} from "../middlewares/isLogin.js"
const brandsRoutes = express.Router();

brandsRoutes.post("/",isLogin, createBrandCtrl);
brandsRoutes.get("/:id", getSingleBrandCtrl);
brandsRoutes.get("/", getAllBrandCtrl);
brandsRoutes.put("/:id", updateBrandCtrl);
brandsRoutes.delete("/:id", deleteBrandCtrl);

export default brandsRoutes;