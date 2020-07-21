import 'dotenv/config';

import { app } from './libs/app';
import { connectDB } from './libs/db';

const { PORT = 3000, NODE_ENV = 'development' } = process.env;

(async function main() {
  await connectDB();
  app.listen(PORT, () => console.log(`App running in ${NODE_ENV} mode on port: ${PORT}`));
})();
