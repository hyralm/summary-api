import Router from 'koa-router';

import checkSummary from './handlers/checkSummary';
import checkUser from '../../handlers/checkUser';
import { Summary } from './models';
import summaryController from './controllers/summary-controller';

const router = new Router({ prefix: '/summaries' });

router
  .post('/', checkUser(), summaryController.create)
  .get('/', summaryController.searchSummaries)
  .param('hash', checkSummary())
  .put('/:hash', checkUser(), summaryController.update)
  .delete('/:hash', checkUser(), summaryController.delete)
  .get('/:hash', summaryController.getSummary);

export { Summary };

export default router.routes();
