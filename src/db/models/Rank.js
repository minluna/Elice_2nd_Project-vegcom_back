import { mysqlDB } from '../index.js';

class Rank {
    static async getRankList() {
        const query =
            'SELECT user.id as userId, \
                    user.nickname, \
                    user.userImage, \
                    point.accuPoint, \
                    (SELECT count(*) FROM post WHERE post.userId = user.id) as storyCount \
                    FROM user \
                    JOIN point \
                    ON user.id = point.userId \
                    WHERE user.deleteAt is null \
                    ORDER BY point.accuPoint desc';
        const [rows] = await mysqlDB.query(query);

        return rows;
    }
}

export { Rank };
