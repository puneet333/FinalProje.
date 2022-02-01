



import { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import {User} from '../schema/UserSchema';
import { JwtPayload, customRequest} from '../types/interface';

const requireLogin = (req: customRequest, res: Response, next: NextFunction)=>{
    const {authorization} = req.headers;

    if(!authorization){
       return res.status(401).json({error:"Unauthorized."});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,config.JWT_SECRET,(err, payload) => {
        if(err){
         return res.status(401).json({error:"you must be logged in with correct credentials"});
        }
        const { _id } = payload as JwtPayload;
        User.findById(_id).then((userdata)=> {
            req.user = userdata;
            next();
        })
        
        
    })
}

export { requireLogin };