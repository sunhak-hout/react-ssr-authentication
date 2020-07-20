import { NextFunction, Request } from 'express';
import { UnauthorizedException } from '../libs/errors';

export const auth = async (req: Request, res: any, next: NextFunction) => {
  if (!req.ctx.user) throw new UnauthorizedException('Unauthorized');
  next();
};
