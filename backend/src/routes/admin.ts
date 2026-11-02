import { Router } from 'express';
import Book from '../models/Book';
import User from '../models/User';
import { protect, adminOnly } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/admin/stats
router.get(
  '/stats',
  protect,
  adminOnly,
  asyncHandler(async (_req, res) => {
    const [totalBooks, totalMembers] = await Promise.all([
      Book.countDocuments(),
      User.countDocuments({ role: 'member' }),
    ]);
    res.json({ totalBooks, totalMembers });
  })
);

export default router;