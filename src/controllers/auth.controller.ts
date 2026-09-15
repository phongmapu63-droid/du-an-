import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { phone, password, fullName, role, companyName } = req.body;
      if (!phone || !password || !role) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ phone, password và role!' });
      }

      const result = await authService.register({ phone, password, fullName, role, companyName });
      return res.status(201).json({ message: '🎉 Đăng ký tài khoản thành công!', ...result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { phone, password } = req.body;
      if (!phone || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập phone và password!' });
      }

      const result = await authService.login(phone, password);
      return res.json({ message: '🎉 Đăng nhập thành công!', ...result });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const user = await authService.getProfile(userId);
      return res.json({ user });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}