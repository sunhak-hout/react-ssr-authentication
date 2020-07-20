import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = model<UserDocument>('User', UserSchema);
