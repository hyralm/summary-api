import faker from 'faker';
import _ from 'lodash';

import { Summary } from '../modules/summaries/models';

/**
 * Seeds summaries
 * @return {Promise.<*>}
 */

function init(users) {
  if (!users || !users.length) {
    throw Error('Users is required');
  }

  const promises = [];

  _.times(500, () => {
    const summaryPromise = Summary.create({
      title: faker.name.jobTitle(),
      description: faker.lorem.words(50, 100),
      tags: faker.lorem.words(2, 6).split(' '),
      userHash: users[faker.random.number(499)].hash,
    });
    promises.push(summaryPromise);
  });

  return Promise.all(promises);
}

export default init;
