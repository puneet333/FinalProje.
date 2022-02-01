

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
import { postInterface } from '../types/interface';

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default: "apic"
    },
    likes:
          [{type:ObjectId,
             ref:"User"
            }],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

const Post = mongoose.model<postInterface>("Post",postSchema);

export { Post };