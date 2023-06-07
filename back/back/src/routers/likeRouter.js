import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { getAllLike, createLike, deleteLike, updateLike } from '../controllers/likeController.js';

const likeRouter = Router();

// 특정 사용자를 좋아요
likeRouter.get("/:id", login_required, getAllLike) 
    
likeRouter.post("/:id", login_required, createLike)
    
likeRouter.put("/:id", login_required, updateLike) 
    
likeRouter.delete("/:id", login_required, deleteLike) 
   

export { likeRouter };
