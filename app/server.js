import app from './app';
import { ENV, MONGO_URI, PORT } from './config';
import { IS_DEV } from './utils/env';

/**
 * Creates an HTTP server
 */
const server = app.listen(PORT, err => {
  if (err) {
      console.error(err);
  }
  // todo: delete
  console.log(`MONGO_URI: ${MONGO_URI}.`);
  console.log(`ENV: ${ENV}.`);
  console.log(`IS_DEV: ${IS_DEV}.`);

  console.log(`Server is running on port: ${PORT}.`);
});

export default server;
