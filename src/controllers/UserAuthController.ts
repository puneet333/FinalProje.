import { Request, Response } from 'express';
import {User} from '../schema/UserSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config';

//for user registration....
const register = (req: Request, res: Response) => {const {name,email,password, pic} = req.body; 
    
     if(!email || !password || !name){
       return res.status(401).json({error:"please fill the details....."});
    }
      
    User.findOne({email:email}).then((saveddUser) => {
        //if user already present check...
         if(savedUser){
          return res.status(401).json({error:"User present already.."});
        }
        bcrypt.hash(password,8).then((hashedPassword: string) => {
              const user = new User({
                  email,
                  password:hashedPassword,
                  name,
                  pic
              })
      
              user.save().then((user) => {
                  res.json({message:"user saved successfully", user});
              })
              .catch((err: Error) => {
                  console.log(err);
                  return res.json({message: err});
              })
        })
       
    })
    .catch((err) => {
      console.log(err);
      return res.json({message: err});
    })
  }


//for login if user try to login then check their password.
  const login = (req: Request, res: Response) => {
    const {email,password} = req.body;
    // check email and password of the user...
    // if passw or email any one is wrong we return false.
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"});
    }

    User.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        //compare hashPassw to saved password...
        bcrypt.compare(password,savedUser.password)
        .then((Match: boolean) => {
            //if it match then generate the token..
            if(Match){
               const token = jwt.sign({_id:savedUser._id},config.JWT_SECRET, {expiresIn: "7d"});
               const {_id,name,email,pic} = savedUser;
               res.json({token,user:{_id,name,email,pic}});
            }
            // else return invalid case...
            else{

                return res.status(422).json({error:"Invalid Email or password"});
            }
        })

        .catch((err: Error) => {
            console.log(err);
            return res.json({error: err});
        })
    })
}
  export { register, login };
