import { TooManyRequestsException } from '../libs/errors';
import limiter from 'express-rate-limit';
import moment from 'moment';

export const rateLimit = limiter({
  max: 5,
  windowMs: 15 * 1000,
  handler: (req) => {
    const retryAt = moment(req.rateLimit.resetTime).diff(moment(), 'seconds');
    throw new TooManyRequestsException(
      `Too many requests. Please try again within ${retryAt} seconds.`,
    );
  },
});
