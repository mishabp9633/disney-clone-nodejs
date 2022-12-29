// const { Router } = require('express')
// const { min } = require('joi/lib/types/array')
// const boolean = require('joi/lib/types/boolean')
const {Disney,validate} = require('../model/disney_model')
const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
// const multer = require('multer')


// function multerStorage(){

// }
//multer storage
// const Storage= multer.diskStorage({
//     destination:'uploads',
//     filename:(req,file,cb)=>{
//         cb(null, `${Date.now()}${file.originalname}`)
//     }
// })
// const upload = multer({
//     storage:Storage
// }).single('testImage')


//get full data
router.get('/', async (req, res) => {
    const disney = await Disney.find()
    // .sort('full_name')
    res.send(disney)
})


//get one data only
router.get('/:id', async (req, res) => {
    const disney = await Disney.findById(req.params.id)
    if (!disney) return res.status(404).send("the course with the given id is invalid")
    res.send(disney)
})



//post or add one data
router.post('/', async (req, res ) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    
    // upload(req, res,(err)=>{
    //     // if(err) throw err

    //     console.log('url: ',req.files[0].path);
    //     imageURl =  req.files[0].path
    // })

    // console.log('imageURl: ',req.files[0].path);

    
    let disney = new Disney({

        backgroundImg : req.body.backgroundImg, 
   
        cardImg : req.body.cardImg,
      
        description:req.body.description,

        subtitle:req.body.subtitle,

        title:req.body.title,

        titleImg :req.body.titleImg ,

        type:req.body.type

        })
        disney = await disney.save() 

    res.send(disney) 
})


//update data //update first approach
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const disney = await Disney.findByIdAndUpdate(req.params.id,{
        
        backgroundImg : req.body.backgroundImg, 
   
        cardImg : req.body.cardImg,
      
        description:req.body.description,

        subtitle:req.body.subtitle,

        title:req.body.title,

        titleImg :req.body.titleImg ,

        type:req.body.type
    },{
        new:true // in put method it used for print updated data first
    })

    if (!disney) return res.status(404).send("the student with the given id is invalid")
   
    res.send(disney)
})


//delete one data
router.delete('/:id', async (req, res) => {
    const disney = await Disney.findByIdAndRemove(req.params.id)

    if (!disney) return res.status(404).send("the student with the given id is invalid")

    //return the same data
    res.send(disney)
})


module.exports=router