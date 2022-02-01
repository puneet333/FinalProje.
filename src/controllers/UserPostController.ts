import { Response} from 'express';
import { CallbackError } from 'mongoose';
import {Post} from '../schema/UserPostSchema';
import { customRequest} from '../types/interface';

const getAllPosts = (req: customRequest, res: Response)=>{
    Post.find().populate("postedBy","_id name").populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts) => {
        res.json({posts});
    }).catch((err: Error) => {
        console.log(err);
    })
    
}

const createPost = (req: customRequest, res: Response) => {
    const {title,body,pic} = req.body; 
    if(!title || !body || !pic){
      return  res.status(422).json({error:"all fields are required.."});
    }
    if(req.user){
        req.user.password = "";
    }
    
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then((result) => {
        res.json({post:result});
    })
    .catch((err: Error) => {
        console.log(err);
    })
}

const myPost = (req: customRequest, res: Response)=>{
    Post.find({postedBy:req?.user?._id})
    .populate("postedBy","_id name")
    .then((mypost) => {
        res.json({mypost});
    })
    .catch((err: Error) => {
        console.log(err);
    })
}

const like = (req: customRequest, res: Response)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req?.user?._id}
    },{
        new:true
    }).exec((err: CallbackError,result) => {
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
}

const unlike = (req: customRequest, res: Response)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req?.user?._id}
    },{
        new:true
    }).exec((err: CallbackError,result) => {
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
}

const comment = (req: customRequest, res: Response)=>{
    const comment = {
        text:req.body.text,
        postedBy:req?.user?._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err: CallbackError,result) => {
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
}

const deletePost = (req: customRequest, res: Response)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err: CallbackError,post) => {
        if(err || !post){
            return res.status(422).json({error:err});
        }
        if(post.postedBy.toString() === req?.user?._id.toString()){
              post.remove()
              .then((result) => {
                  res.json(result);
              }).catch((err: Error) => {
                  console.log(err);
              })
        }
    })
}

export { createPost, getAllPosts, myPost, like, unlike, comment, deletePost };