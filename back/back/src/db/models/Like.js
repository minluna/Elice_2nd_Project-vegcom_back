import { mysqlDB } from '../index.js';

//userid와 postid를 찾는 모델 작성하기
//없다면 새롭게 생성하고 업데이트 해주는 모델 작성
//있다면 삭제해주고 업데이트 해주는 모델 작성

// like 모델
class Like {

  // 좋아요 수 가져오기.
  static async getLike({postId}) {
  
      const query = 'SELECT * FROM post_like_count WHERE likeCount = ?';
      const [rows] = await mysqlDB.query(query, [likeCount]);

      return rows;
  }
  
  //좋아요 눌렀는지 안눌렀는지 확인
  static async isLiked(postId, userId) {
    
    const query = 'SELECT * FROM post_like WHERE postId = ? AND userId = ?';
    const result = await mysqlDB.query(query,[postId, userId]);

    return result.length > 0;
  }
  
  // 새로운 좋아요 생성
  static async addLike({postId, userId}) {
    
      const query = 'INSERT INTO post_like (postId, userId) VALUES (?, ?)';
      await mysqlDB.query(query, [postId, userId]);

    //   // 게시물의 좋아요 개수 업데이트(수정 필요)
    //   const updateLikeCountQuery = `
    //     INSERT INTO post_like_count (postId, likeCount)
    //     VALUES (?, ?)
    //     ON DUPLICATE KEY UPDATE likeCount = likeCount + 1
    //   `;
    //   await mysqlDB.query(updateLikeCountQuery, [postId]);
      
    //   return true;

  }

  static async removeLIke({postId, userId}) {
  
    // 좋아요 삭제.
    const query = 'DELETE FROM post_like WHERE postId = ? AND userId = ?';
    await mysqlDB.query(query, [postId, userId]);
    
    // 게시물의 좋아요 개수 업데이트 (수정필요)
    // const updateLikeCountQuery = `
    //   UPDATE post_like_count
    //   SET likeCount = likeCount - 1
    //   WHERE postId = (
    //     SELECT postId
    //     FROM post_like
    //     WHERE id = ?
    //   )
    // `;
//      await mysqlDB.query(updateLikeCountQuery, [likeId]);
    
//     return true;
//   }
}

    // 좋아요 수 증가
    static async incrementLikeCount({postId}) {
      const query = 'UPDATE posts SET likeCount = likeCount + 1 WHERE id = ?';
      await mysqlDB.query(query, [postId]);
    }


    // 좋아요 수 감소
    static async decrementLikeCount({postId}) {
      const query = 'UPDATE posts SET likeCount = likeCount - 1 WHERE id = ?';
      await mysqlDB.query(query, [postId]);
    }
}
export { Like };

//이렇게 저렇게 해봣는데 모르겠다...

// static async findByOne({ user_id, target_user }) {
//     const query = `SELECT * FROM likes WHERE user_id = ? AND target_user = ?`;
//     const values = [user_id, target_user];
//   }

//   static async saveAndPush({ user_id, target_user }) {
//     const createQuery = `INSERT INTO likes (user_id, target_user) VALUES (?, ?)`;
//     const createValues = [user_id, target_user._id];

//     const updateQuery = `UPDATE users SET like_user = CONCAT_WS(',', like_user, ?) WHERE id = ?`;
//     const updateValues = [user_id, target_user._id];

//       await connection.query(createQuery, createValues);
//       await connection.query(updateQuery, updateValues);

//       const updatedUserQuery = `SELECT like_user FROM users WHERE id = ?`;
//       const updatedUserValues = [target_user._id];

//       const updatedUserResult = await connection.query(updatedUserQuery, updatedUserValues);
//       const updatedUser = updatedUserResult[0];
//       return updatedUser.like_user.split(',').length;
//   }

//   static async deleteAndPull({ id, target_user, user_id }) {
//     const deleteQuery = `DELETE FROM likes WHERE id = ?`;
//     const deleteValues = [id];

//     const updateQuery = `UPDATE users SET like_user = REPLACE(like_user, ?, '') WHERE id = ?`;
//     const updateValues = [user_id, target_user._id];

//       await connection.query(deleteQuery, deleteValues);
//       await connection.query(updateQuery, updateValues);

//       const updatedUserQuery = `SELECT like_user FROM users WHERE id = ?`;
//       const updatedUserValues = [target_user._id];

//       const updatedUserResult = await connection.query(updatedUserQuery, updatedUserValues);
//       const updatedUser = updatedUserResult[0];
//       return updatedUser.like_user.split(',').length;
//   }