
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  description: string;
  image: string;
  creationDate: Date;
  comments: IComment[];
  likes: number;
  dislikes: number;
}

export interface IComment {
  fullName: string;
  email: string;
  comment: string;
  creationDate: Date;
}

const CommentSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  creationDate: { type: Date, default: Date.now }
});

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  comments: [CommentSchema],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
