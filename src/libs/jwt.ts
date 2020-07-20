import { verify, sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

interface SignPayload {
  email: string;
}

export const verifyToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET) as SignPayload;
  } catch (error) {
    return null;
  }
};

export const signToken = (payload: SignPayload) => {
  const expiresIn = '30 days';
  const token = sign(payload, JWT_SECRET, { expiresIn });
  return { token, expiresIn };
};
