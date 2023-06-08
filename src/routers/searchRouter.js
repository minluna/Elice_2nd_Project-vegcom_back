import { Router } from 'express';
import { searchController } from '../controllers/searchController.js';

import { searchValidationRules, search_validate } from '../middlewares/search_validate.js';

const searchRouter = Router();

// 내용 검색하기
searchRouter.get('/', searchValidationRules, search_validate, searchController.getKeywordPost);

export { searchRouter };
