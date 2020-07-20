import { router } from '../routers';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { context } from '../middlewares/context';
import { errorHandler } from './errors';

export const app = express();

// Middleware: Log Request
app.use(morgan('tiny'));

// Middlware: Enable static folders
app.use('/', express.static('dist'));

// Middlware: Parsing req.body into JSON
app.use(bodyParser.json());

// Middleware: Enable CORS policy - Access-Control-Allow-Origin
app.use(cors());

// Initial req.context
app.use(context);

// Middleware: Enable App Routing
app.use(router);

// Middleware: App Error Handler
app.use(errorHandler);
