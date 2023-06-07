import { Router } from 'express';
import { searchController } from '../controllers/searchController.js';

const searchRouter = Router();

// 내용 검색하기
searchRouter.get('/', searchController.getKeywordPost);

export { searchRouter };
