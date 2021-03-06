import { Request, Response} from 'express';
import {Post} from '../schema/UserPostSchema';
import {User} from '../schema/UserSchema';

const userProfile = (req: Request, res: Response) => {
    User.findOne({_id:req.params.id}).select("-password").then((user) => {
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts) => {
             if(err){
                 return res.status(422).json({error:err});
             }
             res.json({user,posts});
         })
    }).catch((err: Error) => {
        return res.status(404).json({error:"User not found", err});
    })
}

export { userProfile };