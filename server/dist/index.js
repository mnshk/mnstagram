import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import dbConnect from './utils/database.js';
import errorHandler from './utils/errorHandler.js';
const PORT = process.env.PORT || 9000;
const app = express();
console.clear();
dotenv.config();
dbConnect();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use('/', routes);
app.use(errorHandler);
app.listen(PORT, () => { console.log(`listining ${PORT}`); });
