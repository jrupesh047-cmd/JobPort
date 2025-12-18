import jwt from 'jsonwebtoken';

export const createAccessToken =(payload)=>(jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "1D" })) 
export const createRefreshToken =(payload)=>(jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "15D" })) 
