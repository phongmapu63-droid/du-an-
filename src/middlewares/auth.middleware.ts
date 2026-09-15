import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { UserRole } from '../constants/enums';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '❌ Bạn chưa đăng nhập hoặc Token không hợp lệ!' });
  }

  // Lấy chuỗi token ở phần tử thứ 2 (index 1) sau chữ 'Bearer '

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '❌ Token không tồn tại!' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: '❌ Token hết hạn hoặc không có quyền truy cập!' });
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: '🚫 Bạn không có quyền thực hiện chức năng này!' });
    }
    next();
  };
};
