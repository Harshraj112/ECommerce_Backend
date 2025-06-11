import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogin = ( req, res, next) => {
    //Get Token from Header
    const token = getTokenFromHeader(req);
    //Verify the Token
    const decodedUser = verifyToken(token);
    //Save the user into req obj
    if(!decodedUser) {
        throw new Error(' Invalid/Expired token, Please login again');
    }else {
        req.userAuthId = decodedUser?.id;
        next();
    }
}