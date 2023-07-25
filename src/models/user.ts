import mongoose, { Document, Model, Types } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Omit<User, '_id'>, Document {
  _id: Types.ObjectId;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const User: Model<UserModel> = mongoose.model<UserModel>('User', schema);
