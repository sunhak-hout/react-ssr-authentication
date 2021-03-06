import { AsyncRouter } from 'express-async-router';
import AuthController from './controllers/AuthController';
import { NotFoundException } from './libs/errors';
import { renderViews } from './views/libs/renderViews';
import { auth } from './middlewares/auth';
import { rateLimit } from './middlewares/rateLimit';
import { validateLogin, validateSignup } from './middlewares/validators';

export const router = AsyncRouter();

// API: AuthController Routers
router.post('/login', [rateLimit, ...validateLogin], AuthController.login);
router.post('/signup', [...validateSignup], AuthController.signup);
router.post('/authorize', [auth], AuthController.authorize);

// FrontEnd: Render View
router.get('*', (req, res) => res.send(renderViews()));

// Handler: 404 - Not Found
router.all('*', (req, res) => {
  throw new NotFoundException(`${req.method} ${req.url} endpoint does not exist`);
});
