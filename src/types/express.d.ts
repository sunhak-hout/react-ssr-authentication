import { UserDocument } from '../models';
import { Services } from '../middlewares/context';

interface Context {
  user?: UserDocument;
  services?: Services;
}

declare module 'express' {
  export interface Request {
    ctx: Context;
  }
}
