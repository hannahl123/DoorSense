import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
});

export default upload;
