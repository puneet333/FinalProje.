//user schema...
import mongoose from 'mongoose';
import { userInterface } from '../types/interface';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
       type:String,
       default:"pic"
    }
})

const User = mongoose.model<userInterface>("User",userSchema);

export { User };