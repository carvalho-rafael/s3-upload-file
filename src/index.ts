import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' })

import multer from 'multer'
import path from 'path'

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

app.post('/upload', (req, res, next) => {
  res.send('File uploaded!');
});

app.listen(process.env.PORT || 3333);
