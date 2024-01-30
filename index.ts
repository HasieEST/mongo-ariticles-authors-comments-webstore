import express, { Express, Request, Response, application } from "express";
import cors from "cors"
import mongoose from "mongoose";
import { config } from "dotenv";
config()
import articleCntrl from './controllers/articleController';
import commentCntrl from './controllers/commentController';
import authorCntrl from './controllers/authorController';
import userCntrl from './controllers/userController';
import cartProductCntrl from './controllers/cartProductController';
import categoryCntrl from './controllers/categoryController';
import productCntrl from './controllers/productController';
import orderCntrl from './controllers/orderController';
import bodyParser from "body-parser";

mongoose.connect("mongodb+srv://external:" + process.env.DB_PW + "@cluster0.joiivi4.mongodb.net/test")
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app: Express = express();

app.use(cors({
    origin: ['http://localhost:3006']
}));

app.use(bodyParser.json);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/', articleCntrl);
app.use('/', commentCntrl);
app.use('/', authorCntrl);
app.use('/', userCntrl);
app.use('/', categoryCntrl);
app.use('/', productCntrl);
app.use('/', cartProductCntrl);
app.use('/', orderCntrl);

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});