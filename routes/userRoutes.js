import express from 'express';
import { registerUserCtrl } from '../controllers/userCtrl.js';
import { loginUserCtrl } from '../controllers/userCtrl.js';
import { getUserProfileCtrl } from '../controllers/userCtrl.js';
import { isLogin } from '../middlewares/isLogin.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLogin, getUserProfileCtrl);


export default userRoutes;