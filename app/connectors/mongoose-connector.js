import mongoose from 'mongoose';

mongoose.Promise = Promise;

/**
 * Connects to Mongo DB
 * @param {string} mongoUri
 * @return {Promise}
 */
export default mongoUri => {
  if (!mongoUri) {
    throw Error('Mongo URI is undefined');
  }

  return mongoose.connect(mongoUri, { useMongoClient: true }).then(mongodb => {
    console.log(`Mongo has been connected.`);
    return mongodb;
  });
};
