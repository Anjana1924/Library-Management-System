import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  regNo?: string;
  idNo?: string;
  email: string;
  password: string;
  role: 'member' | 'admin';
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    regNo: { type: String, unique: true, sparse: true, trim: true },
    idNo: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);