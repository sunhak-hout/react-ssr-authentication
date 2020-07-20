import { UnprocessableEntityException } from '../libs/errors';
import { User } from '../models';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import _uniqBy from 'lodash/uniqBy';

export const validateSignup = [
  body('firstName').isString().withMessage('First name must be a string'),
  body('lastName').isString().withMessage('Last name must be a string'),
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) return Promise.reject('Email is already in use');
    }),
  body('password')
    .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,50})/, 'i') // prettier-ignore
    .withMessage(`
      Password requires at least one lower case, one upper case, one number,
      one special character and must be between 8-50 characters`),
  validationHandler,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
  body('password')
    .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,50})/, 'i') // prettier-ignore
    .withMessage(`
      Password requires at least one lower case, one upper case, one number,
      one special character and must be between 8-50 characters`),
  validationHandler,
];

function validationHandler(req: Request, res: Response, next: NextFunction) {
  const validationErrors = validationResult(req)
    .formatWith((err) => ({ field: err.param, message: err.msg }))
    .array();
  if (validationErrors.length === 0) next();
  const errors = _uniqBy(validationErrors, 'field');
  throw new UnprocessableEntityException('Validations failed.', errors);
}
