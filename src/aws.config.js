import 'dotenv/config';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3({
    accessKeyId: process.env.s3_access_key_id,
    secretAccessKey: process.env.s3_secret_access_key,
    region: process.env.s3_region,
});

// Multer 설정 (파일 업로드를 위한 미들웨어)
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '7team-bucket',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const date = new Date().toISOString().replace(/:/g, '-');
            const fileExtension = file.originalname.split('.').pop();
            const filename = `image-${date}.${fileExtension}`;
            cb(null, filename);
        },
    }),
});

export { s3, upload };
