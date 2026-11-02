import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from '../middleware/auth';

export const asyncHandler =
  (fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req as AuthRequest, res, next).catch(next);
  };