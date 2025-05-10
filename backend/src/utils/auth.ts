import { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

interface TokenPayload {
  userId: string;
  role: string;
}

export const generateToken = (payload: TokenPayload, options: SignOptions = {}) => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '24h',
    ...options 
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
