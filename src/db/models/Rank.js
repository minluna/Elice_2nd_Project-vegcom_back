import { mysqlDB } from '../index.js';

class Rank {
    static async topTenRankList() {
        const getRankList =
            'SELECT user.id as userId, \
                    user.nickname, \
                    user_image.imageUrl as userImage, \
                    point.accuPoint, \
                    (SELECT count(id) FROM post WHERE post.userId = user.id  AND post.deleteAt is NULL) as storyCount \
                    FROM user \
                    LEFT JOIN user_image \
                    ON user.id = user_image.userId \
                    LEFT JOIN point \
                    ON user.id = point.userId \
                    WHERE user.deleteAt is null \
                    ORDER BY point.accuPoint desc, storyCount desc, user.createAt desc \
                    LIMIT 10';
        const [rows] = await mysqlDB.query(getRankList);

        return rows;
    }
}

export { Rank };
