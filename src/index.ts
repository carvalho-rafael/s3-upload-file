import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' })

const app = express();

app.use(express.json());

app.get('/upload', (req, res) => {
  return res.json('hello')
})

app.listen(process.env.PORT || 3333);
