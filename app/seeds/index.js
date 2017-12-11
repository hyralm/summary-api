import mongooseConnector from '../connectors/mongoose-connector';
import { MONGO_URI } from '../config';
import userSeeds from './user-seeds';
import summarySeeds from './summary-seeds';

/**
 * Seeds DB
 * @return {void}
 */
async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI);

  await mongoConnection.dropDatabase();

  try {
    const users = await userSeeds();
    await summarySeeds(users);
  } catch (err) {
    console.error(err);
  } finally {
    mongoConnection.close();
  }
}

/**
 * Sets up seeds
 */
initSeeds();
