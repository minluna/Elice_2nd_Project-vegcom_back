import 'dotenv/config';
import mysql from 'mysql2/promise';

import { User } from './models/User.js';
import { Rank } from './models/Rank.js';
import { Comment } from './models/Comment.js';
import { Search } from './models/Search.js';
import { Post } from './models/Post.js';

const mysqlDBPromise = mysql.createPool({
    host: process.env.DB_IP,
    user: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

mysqlDBPromise
    .getConnection()
    .then(() => {
        console.log(
            `정상적으로 MysqlDB 서버에 연결되었습니다. mysql://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        );
    })
    .catch(err => {
        console.log('MysqlDB 연결에 실패하였습니다...\n' + err);
        mysqlDBPromise.end();
        throw err;
    });

export { mysqlDBPromise as mysqlDB, User, Rank, Comment, Search, Post };
