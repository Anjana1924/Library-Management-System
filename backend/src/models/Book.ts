import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  isbn: string;
  author: string;
  category: string;
  publisher: string;
  totalQty: number;
  availableQty: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    publisher: { type: String, required: true, trim: true },
    totalQty: { type: Number, required: true, min: 1 },
    availableQty: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default model<IBook>('Book', bookSchema);