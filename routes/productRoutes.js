import express from 'express';
import { createProductCtrl, getProductsCtrl } from '../controllers/produtCtrl.js';
import { isLogin } from '../middlewares/isLogin.js';


const productRoutes = express.Router();

productRoutes.post('/',isLogin, createProductCtrl);
productRoutes.get('/',isLogin, getProductsCtrl);



export default productRoutes;