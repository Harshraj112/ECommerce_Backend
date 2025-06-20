import express from 'express';
import { createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl } from '../controllers/produtCtrl.js';
import { isLogin } from '../middlewares/isLogin.js';


const productRoutes = express.Router();

productRoutes.post('/',isLogin, createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductCtrl);
productRoutes.put('/:id', updateProductCtrl);



export default productRoutes;