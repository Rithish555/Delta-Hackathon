import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import http from 'http'
import userRoute from './Routes/userRoute.js'
import uploadRoute from './Routes/uploadRoute.js'
import cor from './corsMiddle.js';


const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const server = http.createServer(app);


mongoose.connect(DB_URI)
            .then(()=>console.log("DB Connection Successful"))
            .catch((err)=>console.log("DB Connection Failed"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cor)
app.use('/uploaded', express.static('uploaded'));

app.use('/user',userRoute)
app.use('/uploads',uploadRoute)


server.listen(PORT,()=>console.log(`server running on port ${PORT}`));