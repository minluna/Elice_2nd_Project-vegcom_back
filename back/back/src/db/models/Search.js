import { mysqlDB } from '../index.js';

class Search {
    // keyword 검색하기
    static async select({ keyword }) {
        const query = `SELECT post.id as postId, \
                                post.userId as userId, \
                                post.content, \
                                post_image.imageUrl
                        FROM post \
                        JOIN post_image \
                        ON post.id = post_image.postId \
                        WHERE content LIKE CONCAT('%', ?, '%') AND post.deleteAt is null`;
        const [rows] = await mysqlDB.query(query, [keyword]);
        console.log(rows);
        return rows;
    }
}

export { Search };
