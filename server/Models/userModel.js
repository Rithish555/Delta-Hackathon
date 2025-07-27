import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
},{timestamps:true})

export default mongoose.model("user",userschema);