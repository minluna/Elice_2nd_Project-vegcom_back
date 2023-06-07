import { User } from '../db/index.js';
import { ConflictError, UnauthorizedError, BadRequestError, NotFoundError, InternalServerError } from '../../errors.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userAuthService {
    // 유저 생성
    static async createUser({ email, password, nickname }) {
        try {
            // 이메일 중복 확인
            const user = await User.findByEmail({ email });

            if (user) {
                throw ConflictError('EmailAlreadyExists', '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PW_HASH_COUNT));

            await User.create({
                email,
                password: hashedPassword,
                nickname,
            });

            return {
                statusCode: 200,
                message: '회원가입에 성공했습니다.',
            };
        } catch (error) {
            throw BadRequestError('RegistrationFailedError', '회원가입에 실패했습니다.');
        }
    }

    // 로그인 검사
    static async getUser({ email, password }) {
        try {
            const user = await User.findByEmail({ email });

            // 이메일 검증
            if (!user) {
                throw NotFoundError('UserNotFoundEmail', '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
            }

            // 비밀번호 확인
            const correctPasswordHash = user.password;
            const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

            if (!isPasswordCorrect) {
                throw UnauthorizedError('InvalidCredentials', '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
            }

            // 유저 정보가 있고 비밀번호가 일치하면 JWT 토큰을 생성한다.
            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign(
                { userId: user.id, email: user.email, name: user.nickname, description: user.description },
                secretKey,
            );

            return {
                statusCode: 200,
                message: '로그인에 성공했습니다.',
                token,
            };
        } catch (error) {
            throw UnauthorizedError('LoginFailedError', '로그인에 실패하셨습니다.');
        }
    }

    // ID로 유저 검색(로그인 체크)
    static async loginCheck({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw NotFoundError('UserNotFoundId', '요청한 사용자의 정보를 찾을 수 없습니다.');
        } else {
            return {
                statusCode: 200,
                message: '정상적인 유저입니다.',
            };
        }
    }

    // 유저의 현재 포인트, 누적 포인트 불러오기
    static async getUserPoint({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const getUserPoint = await User.getPoint({ userId });

            return {
                statusCode: 200,
                message: '유저 포인트 내역 불러오기에 성공했습니다.',
                userPoint: {
                    id: getUserPoint.userId,
                    currentPoint: getUserPoint.currentPoint,
                    accuPoint: getUserPoint.accuPoint,
                },
            };
        } catch (error) {
            throw InternalServerError('PointLoadFailedError', '유저 포인트 내역 불러오기에 실패했습니다.');
        }
    }

    // 전체 유저 수 불러오기
    static async getUserCount({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const getUserCount = await User.getCount();

            return {
                statusCode: 200,
                message: '전체 유저 수 불러오기에 성공하셨습니다.',
                userCount: getUserCount.userCount,
            };
        } catch (error) {
            throw InternalServerError('UserCountLoadFailedError', '전체 유저 수 불러오기에 실패했습니다.');
        }
    }

    // 유저 정보 불러오기
    static async getUserInfo({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw NotFoundError('UserNotFoundId', '요청한 사용자의 정보를 찾을 수 없습니다.');
        } else {
            return {
                statusCode: 200,
                message: '유저 정보 불러오기에 성공하셨습니다.',
                userInfo: {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                    userImage: user.userImage,
                },
            };
        }
    }

    // 유저 정보 수정(별명, 설명)
    static async setUserInfo({ userId, toUpdate }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw NotFoundError('UserNotFoundId', '요청한 사용자의 정보를 찾을 수 없습니다.');
        }

        try {
            // toUpdate -> nickName, description
            for (const [fieldToUpdate, newValue] of Object.entries(toUpdate)) {
                await User.update({ userId, fieldToUpdate, newValue });
            }

            return {
                statusCode: 200,
                message: '유저 정보 수정하기에 성공하셨습니다.',
            };
        } catch (error) {
            throw InternalServerError('UserUpdateFailedError', '유저 정보 수정하기에 실패했습니다.');
        }
    }

    // 유저 정보 삭제
    static async delUserInfo({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw NotFoundError('UserNotFoundId', '요청한 사용자의 정보를 찾을 수 없습니다.');
        }

        try {
            await User.delete({ userId });

            return {
                statusCode: 200,
                message: '유저 정보 삭제하기에 성공하셨습니다.',
            };
        } catch (error) {
            throw InternalServerError('UserDeleteFailedError', '유저 정보 삭제하기에 실패했습니다.');
        }
    }
}

export { userAuthService };
