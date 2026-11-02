import { Schema, model, Document, Types } from 'mongoose';

export interface IBorrow extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  borrowedDate: Date;
  dueDate: Date;
  returnedDate: Date | null;
}

const borrowSchema = new Schema<IBorrow>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedDate: { type: Date, default: null },
});

export default model<IBorrow>('Borrow', borrowSchema);