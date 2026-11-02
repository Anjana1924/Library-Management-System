import { Router } from 'express';
import Book from '../models/Book';
import Borrow from '../models/Borrow';
import { protect, adminOnly } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/books?search=
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const search = String(req.query.search || '').trim();
    const filter = search
      ? {
          $or: ['title', 'author', 'category', 'isbn'].map((f) => ({
            [f]: { $regex: escapeRegex(search), $options: 'i' },
          })),
        }
      : {};
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  })
);

// POST /api/books  (admin)
router.post(
  '/',
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { title, isbn, author, category, publisher, quantity } = req.body;
    const qty = Number(quantity);
    if (!title || !isbn || !author || !category || !publisher || !qty || qty < 1) {
      return res.status(400).json({ message: 'All fields are required (quantity must be at least 1)' });
    }
    const book = await Book.create({
      title, isbn, author, category, publisher,
      totalQty: qty,
      availableQty: qty,
    });
    res.status(201).json(book);
  })
);

// DELETE /api/books/:id  (admin)
router.delete(
  '/:id',
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const active = await Borrow.countDocuments({ book: req.params.id, returnedDate: null });
    if (active > 0) {
      return res.status(400).json({ message: 'Cannot remove: this book is currently borrowed' });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book removed' });
  })
);

export default router;