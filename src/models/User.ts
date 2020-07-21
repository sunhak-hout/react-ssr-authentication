import { Document, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true, dropDups: true },
  password: String,
});

export const User = model<UserDocument>('User', UserSchema);
