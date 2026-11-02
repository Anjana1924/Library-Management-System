import { Router } from 'express';
import Book from '../models/Book';
import Borrow from '../models/Borrow';
import { protect, memberOnly } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const LOAN_DAYS = 14;

const statusOf = (b: { returnedDate?: Date | null; dueDate: Date }) =>
  b.returnedDate ? 'Returned' : b.dueDate < new Date() ? 'Over Due' : 'Pending';

// GET /api/borrows/my   -> history
router.get(
  '/my',
  protect,
  memberOnly,
  asyncHandler(async (req, res) => {
    const records = await Borrow.find({ user: req.user!._id })
      .populate('book', 'title')
      .sort({ borrowedDate: -1 })
      .lean();
    res.json(records.map((r) => ({ ...r, status: statusOf(r) })));
  })
);

// POST /api/borrows/:bookId   -> borrow a book
router.post(
  '/:bookId',
  protect,
  memberOnly,
  asyncHandler(async (req, res) => {
    const already = await Borrow.findOne({
      user: req.user!._id,
      book: req.params.bookId,
      returnedDate: null,
    });
    if (already) return res.status(400).json({ message: 'You have already borrowed this book' });

    // atomic decrement: only succeeds if a copy is available
    const book = await Book.findOneAndUpdate(
      { _id: req.params.bookId, availableQty: { $gt: 0 } },
      { $inc: { availableQty: -1 } },
      { new: true }
    );
    if (!book) return res.status(400).json({ message: 'Book is not available' });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + LOAN_DAYS);
    const borrow = await Borrow.create({ user: req.user!._id, book: book._id, dueDate });
    res.status(201).json(borrow);
  })
);

// PUT /api/borrows/:id/return
router.put(
  '/:id/return',
  protect,
  memberOnly,
  asyncHandler(async (req, res) => {
    const borrow = await Borrow.findOne({ _id: req.params.id, user: req.user!._id });
    if (!borrow) return res.status(404).json({ message: 'Record not found' });
    if (borrow.returnedDate) return res.status(400).json({ message: 'Already returned' });

    borrow.returnedDate = new Date();
    await borrow.save();
    await Book.findByIdAndUpdate(borrow.book, { $inc: { availableQty: 1 } });
    res.json({ message: 'Book returned' });
  })
);

export default router;