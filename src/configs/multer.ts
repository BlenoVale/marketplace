import multer from 'multer';
import mime from 'mime-types'
import sharp from "sharp";

//const uploadUrl = path.dirname('/public/media/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/')
    },
    filename: (req, file, cb) => {
        const type = mime.extension(file.mimetype);
        cb(null, `${new Date().getTime()}.${type}`);
    }
});

const upload = multer({storage});

export default upload;