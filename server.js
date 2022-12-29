const express=require('express')
const app = express()
const Joi = require('joi')
const mongoose = require('mongoose')
const disney = require('./routes/disney')
const cors = require('cors')
const bodyParser = require('body-parser')
// const multer = require('multer')


mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/Disney-world')
.then(()=>{console.log('mongodb connected')})
.catch(err=>console.error('mongodb connection failed',err))

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
//connect to fontend cors
app.use(cors({
    preflightContinue: true,
    credentials: true 
}))

//multer storage
// const Storage= multer.diskStorage({
//     destination:'uploads',
//     filename:(req,file,cb)=>{
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({
//     storage:Storage
// }).single('testImage')

app.use('/disney',disney)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`connect to server ${port}`);
})