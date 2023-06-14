import { Router } from 'express';
import { searchController } from '../controllers/searchController.js';

import { search_validate } from '../middlewares/search_validate.js';

const searchRouter = Router();

// 내용 검색하기
searchRouter.get('/', search_validate, searchController.getKeywordPost);

export { searchRouter };
