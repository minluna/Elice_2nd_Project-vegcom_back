import { Like } from '../db/in';
import errors from '../../errors.js'; //커스텀 에러 집어넣기

//모델과 서비스를 어떻게 구성할까?
//좋아요는 한 게시물 당 한번만 가능
//좋아요 선택시 체크가 안되어 있으면 체크하고, 이미 되어 잇으면 해지
// 좋아요가 되어있는지 안되어있는지 확인하는 코드 필요 ---> 좋아요 테이블에서 찾아봄 (currentuserid = userid)
// 좋아요테이블에  있으면 ---> 삭제하기
// 좋아요가 되어 있지 않으면 ---> 생성하기 

//수정작성 중
class likeService {

    static async togglePostLike({postId, userId}) {
        try {
            const isLiked = await Like.isLiked(postId, userId);
            
            return {
                statusCode: 200,
                message: '좋아요 여부 확인.'
            };
        } catch (error) {
            throw new error ('좋아요 여부 확인에 실패하였습니다.')
        }
    }

    static async countUp() {
        
        //에러처리 코드 넣기.
        const like = await Like.addAndUpdate();

        return like;
    }

    static async countDown() {

        //에러처리 코드 넣기.
        const like = await Like.DeleteAndUpdate();

        return like;
    }
}

export { likeService };

   

// postService.js

const PostLike = require('../models/postLike');

// 현재 유저가 좋아요를 누른 상태인지 확인하고 처리
async function togglePostLike(postId, userId) {
  try {
    const isLiked = await PostLike.isPostLiked(postId, userId);

    if (isLiked) {
      await PostLike.removePostLike(postId, userId);
      await PostLike.decrementLikeCount(postId);
    } else {
      await PostLike.addPostLike(postId, userId);
      await PostLike.incrementLikeCount(postId);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { togglePostLike };
