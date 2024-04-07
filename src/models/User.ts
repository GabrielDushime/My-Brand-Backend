import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Joi schema for user model validation
const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
 
});

const userMongoSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

// Validate data before saving to database
userMongoSchema.pre('save', async function (next) {
  try {
    await userSchema.validateAsync(this.toObject());
    next();
  } catch (error:any) {
    next(error);
  }
});

const User = mongoose.model<UserDocument>('User', userMongoSchema);

export default User;
