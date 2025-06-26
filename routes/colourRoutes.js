import express from "express";
import { createColourCtrl, deleteColourCtrl, getAllColourCtrl, getSingleColourCtrl, updateColourCtrl } from "../controllers/colorsCtrl.js";
import {isLogin} from "../middlewares/isLogin.js"
const colourRoutes = express.Router();

colourRoutes.post("/",isLogin, createColourCtrl);
colourRoutes.get("/:id", getSingleColourCtrl);
colourRoutes.get("/", getAllColourCtrl);
colourRoutes.put("/:id", updateColourCtrl);
colourRoutes.delete("/:id", deleteColourCtrl);

export default colourRoutes;