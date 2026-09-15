import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint Đăng ký: POST /api/v1/auth/register
router.post('/register', AuthController.register);

// Endpoint Đăng nhập: POST /api/v1/auth/login
router.post('/login', AuthController.login);

// Endpoint Lấy thông tin cá nhân (Cần Token): GET /api/v1/auth/me
router.get('/me', authenticateJWT, AuthController.getProfile);

export default router;
