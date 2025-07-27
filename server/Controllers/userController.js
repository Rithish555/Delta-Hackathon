import User from '../Models/userModel.js'
export const registeruser = async (req,res)=>{
    try{
        const {email,password,roles} = req.body;
        const user = await User.create({email,password,role:roles});
        res.status(201).send(user);
    }
    catch(err){
        console.log(err);
    }
}

export const loginuser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        res.status(200).send(user);
    }
    catch(err){
        console.log(err);
    }
}