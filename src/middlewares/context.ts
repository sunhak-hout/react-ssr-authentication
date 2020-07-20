import * as models from '../models';
import AuthService from '../services/AuthService';
import { NextFunction, Request } from 'express';

const services = {
  authService: new AuthService(models),
};

export const context = async (req: Request, res: any, next: NextFunction) => {
  req.ctx = {};
  req.ctx.services = services;

  const token = req.headers.authorization;
  req.ctx.user = await services.authService.getAuthUser(token);

  next();
};

export type Models = typeof models;
export type Services = typeof services;
