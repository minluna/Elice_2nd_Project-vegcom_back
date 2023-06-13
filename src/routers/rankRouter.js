import { Router } from 'express';
import { rankController } from '../controllers/rankController.js';

const rankRouter = Router();

rankRouter.get('/list/:cursor', rankController.rankList);

export { rankRouter };
