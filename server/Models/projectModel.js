import mongoose from 'mongoose'

const projectschema = new mongoose.Schema({
    parentid:{
        type:mongoose.Schema.Types.ObjectId,
    },
    projname:{
        type:String
    },
    deadline:{
        type:String
    }

    
},{timestamps:true})

export default mongoose.model("project",projectschema);