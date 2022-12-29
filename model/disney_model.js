const mongoose=require('mongoose')
const Joi = require('joi')


const Disney = mongoose.model('Disney', new mongoose.Schema({
    backgroundImg: {
         type:String
        },

    cardImg:{
        type:String
    },

    description: {
        type: String,
    },

    subtitle: {
        type: String,
    },

    title:{
        type:String,
    },

    titleImg:{
        type:String
    },

    type:{
        type:String,
    }


}))

// validation function in one key
function validateDisney(disney) {
    const schema = {
        backgroundImg: Joi.string(),
        cardImg: Joi.string(),
        description:Joi.string(),
        subtitle:Joi.string(),
        title:Joi.string(),
        titleImg:Joi.string(),
        type:Joi.string()
    }
    return Joi.validate(disney, schema)
}

exports.Disney=Disney
exports.validate=validateDisney