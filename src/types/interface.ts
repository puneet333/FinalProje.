import { Request } from 'express';
import mongoose, {Document} from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

export interface JwtPayload {
    _id: string;
}

export interface userInterface extends Document{
    name: string,
    email: string,
    password: string,
    pic: string
}
export interface postInterface extends Document{
    title: string,
    body: string,
    photo: string,
    likes: [],
    comment: [],
    postedBy: typeof ObjectId
}

export interface customRequest extends Request {
    user? : (userInterface & {
        _id: string;
    }) | null
}