import mongoose from 'mongoose'

const fileschema = new mongoose.Schema({
    projectid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"projects"
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    filename:{
        type:String
    },
    comments:{
        type:String,
    },
    feedback:{
        type:String,
    },
    approvedby:{
        type:String,
    }

    
},{timestamps:true})

export default mongoose.model("files",fileschema);