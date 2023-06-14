import { mysqlDB } from '../index.js';

class Search {
    static async select({ keyword }) {
        const getPostByKeyword = `SELECT post.id as postId, \
                                post.userId as userId, \
                                post.content, \
                                post_image.imageUrl \
                        FROM post \
                        JOIN post_image \
                        ON post.id = post_image.postId \
                        WHERE content LIKE CONCAT('%', ?, '%') AND post.deleteAt is null \
                        ORDER BY post.createAt DESC \
                        LIMIT 5`;
        const [rows] = await mysqlDB.query(getPostByKeyword, [keyword]);
        console.log(rows);
        return rows;
    }

    // keyword 검색하기
    static async selectKeyword({ keyword, cursor }) {
        const getPostByKeyword = `SELECT post.id as postId, \
                                post.userId as userId, \
                                post.content, \
                                post_image.imageUrl \
                        FROM post \
                        JOIN post_image \
                        ON post.id = post_image.postId \
                        WHERE content LIKE CONCAT('%', ?, '%') AND post.id < ? AND post.deleteAt is null \
                        ORDER BY post.createAt DESC \
                        LIMIT 5`;
        const [rows] = await mysqlDB.query(getPostByKeyword, [keyword, cursor]);

        return rows;
    }
}

export { Search };
