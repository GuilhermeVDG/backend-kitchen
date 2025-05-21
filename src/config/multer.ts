import crypto from 'crypto';
import multer from 'multer';
import path, { extname, resolve } from 'path';
import os from 'os';

export default {
  upload(folder: string){
    return{
      storage: multer.diskStorage({
        destination: path.join(os.tmpdir()),
        filename: (requst, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        }
      })
    }
  }
}