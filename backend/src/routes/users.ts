import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { protect, adminOnly } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { publicUser } from './auth';

const router = Router();

// GET /api/users  (admin) -> all members
router.get(
  '/',
  protect,
  adminOnly,
  asyncHandler(async (_req, res) => {
    const members = await User.find({ role: 'member' }).select('-password').sort({ createdAt: -1 });
    res.json(members);
  })
);

// GET /api/users/me
router.get('/me', protect, (req: any, res) => res.json(publicUser(req.user)));

// PUT /api/users/me
router.put(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    const { name, email, idNo } = req.body;
    const user = req.user!;
    if (name) user.name = name;
    if (email) user.email = email;
    if (idNo !== undefined) user.idNo = idNo;
    await user.save();
    res.json(publicUser(user));
  })
);

// PUT /api/users/me/password
router.put(
  '/me/password',
  protect,
  asyncHandler(async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    req.user!.password = await bcrypt.hash(newPassword, 10);
    await req.user!.save();
    res.json({ message: 'Password updated' });
  })
);

export default router;