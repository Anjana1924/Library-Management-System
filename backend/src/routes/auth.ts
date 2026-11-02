import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

const sign = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

export const publicUser = (u: IUser) => ({
  _id: u._id,
  name: u.name,
  regNo: u.regNo,
  idNo: u.idNo,
  email: u.email,
  role: u.role,
});

// POST /api/auth/register
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, regNo, email, password } = req.body;
    if (!name || !regNo || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const user = await User.create({
      name,
      regNo,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json({ token: sign(user.id), user: publicUser(user) });
  })
);

// POST /api/auth/login  (member)
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { regNo, password } = req.body;
    const user = await User.findOne({ regNo, role: 'member' });
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ message: 'Invalid Reg No. or password' });
    }
    res.json({ token: sign(user.id), user: publicUser(user) });
  })
);

// POST /api/auth/admin-login
router.post(
  '/admin-login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase(), role: 'admin' });
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    res.json({ token: sign(user.id), user: publicUser(user) });
  })
);

export default router;