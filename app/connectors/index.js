import { MONGO_URI } from '../config';
import mongooseConnector from './mongoose-connector';
import server from '../server';

/**
 * Connects to DB ...
 * @return {void}
 */
async function connectorsInit() {
  try {
    await mongooseConnector(MONGO_URI);
  } catch (err) {
    server.close();
    console.error(err);
  }
}

export { mongooseConnector };

export default connectorsInit;
