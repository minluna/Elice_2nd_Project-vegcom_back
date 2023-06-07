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
            const isLiked = await Like.isLiked({postId, userId});
            
            return {
                statusCode: 200,
                message: '좋아요 여부 확인.',
                isLiked
            };
        } catch (error) {
            throw new error ('좋아요 여부 확인에 실패하였습니다.')
        }
    }

    //좋아요 생성
    static async create({postId, userId}) {
        
        try{
            const createLike = await Like.addLike({postId,userId})

            return {
                statusCode: 200,
                message: '좋아요 생성에 성공했습니다.',
                createLike
            };
        } catch (error) {
            throw new error ('좋아요 생성에 실패하였습니다.')
        }        
    }
    // 좋아요 삭제
    static async delete({postId, userId}) {
        
        try{
            const deleteLike = await Like.removeLike({postId,userId})

            return {
                statusCode: 200,
                message: '좋아요 삭제에 성공했습니다.',
                deleteLike
            };
        } catch (error) {
            throw new error ('좋아요 삭제에 실패하였습니다.')
        }        
    }

    //좋아요 횟수 증가
    static async countUpAndDown({postId, userId}) {
        try {
            const isLiked = await PostLike.isPostLiked(postId, userId);
        
            if (isLiked) {
              await PostLike.removeLike(postId, userId);
              await PostLike.decrementLikeCount(postId);
            } else {
              await PostLike.addPostLike(postId, userId);
              await PostLike.incrementLikeCount(postId);
            }
          } catch (error) {
            throw new Error('좋아요 카운트에 실패하였습니다.');
          }
        }
        
}

export { likeService };

   

