import express from 'express'
import 'dotenv/config';
import userRouter from './routes/UserRouter';

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(userRouter);
app.listen(port);
