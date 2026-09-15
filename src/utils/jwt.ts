import jwt from 'jsonwebtoken';
import { UserRole } from '../constants/enums';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_logistics_2026';

export interface TokenPayload {
  userId: string;
  role: UserRole;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
