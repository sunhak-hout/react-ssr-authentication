import { Request, Response } from 'express';

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { authService } = req.ctx.services;
    const { email, password } = req.body;
    const { token, expiresIn } = await authService.login({ email, password });
    res.json({ success: true, data: { token, expiresIn } });
  }

  static async signup(req: Request, res: Response) {
    const { authService } = req.ctx.services;
    const { firstName, lastName, email, password } = req.body;
    const { token, expiresIn } = await authService.signup({
      firstName,
      lastName,
      email,
      password,
    });
    res.json({ success: true, data: { token, expiresIn } });
  }

  static async authorize(req: Request, res: Response) {
    res.json({ success: true, data: { user: req.ctx.user } });
  }
}
