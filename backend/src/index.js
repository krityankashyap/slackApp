import express from 'express';
import { PORT } from './config/serverConfig.js';
import { StatusCodes } from 'http-status-codes';
import connectDB from '../src/config/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'pong'
  });
});

app.listen(PORT, () => {
  console.log(`server is started at PORT no: ${PORT}`);
  connectDB();
});
