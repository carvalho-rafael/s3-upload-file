import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' })

import multer from 'multer'
import path from 'path'

import * as s3Client from './s3Client'

const app = express();

app.use(
  multer({
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '../', 'uploads/'),
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }).single('file')
)

app.post('/upload', async (req, res, next) => {
  const file = req.file
  const url = await s3Client.uploadFile(file.originalname, file.path, file.mimetype);

  res.send(`${url}`);
});

app.listen(process.env.PORT || 3333);
