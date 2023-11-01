import { Response, Request, NextFunction } from 'express';

export default class UserMiddleware {
  static verifyIfEmailAndPasswordExists(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static verifyIfEmailAndPasswordAreValid(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
