import Project from '../Models/projectModel.js'
import fs, { chownSync } from 'fs'
import Files from '../Models/fileModel.js'
import mongoose from 'mongoose';
export const createproject = async(req,res)=>{
    try{
        const {proj,id} = req.body;
        const project = await Project.create({parentid:id,projname:proj});
        res.status(201).send(project);
    } 
    catch(err){
        console.log(err);
    }      
}
export const getprojects = async(req,res)=>{
    try{
        const project = await Project.find();
        res.status(201).send(project);
    } 
    catch(err){
        console.log(err);
    }      
}

export const getitems = async (req,res)=>{
    try{
        const {id} = req.params;
        const pid = new mongoose.Types.ObjectId(id,id)
        const items = await Files.find();
        res.status(200).send(items);
    }
    catch(err){
        console.log(err);
    }
}

export const uploadfile = async (req,res)=>{
    try{
        const {folderid,userid} = req.body;
        const fileupl = req.file
        const items = Files.create({projectid:folderid,userid:userid,filename:fileupl.filename});
        res.status(200).send(items);
    }
    catch(err){
        console.log(err);
    }
}

export const getfiledata = async(req,res)=>{
    try{
        const {fn} = req.body;
        console.log(fn.filename)
        const data = fs.readFile(`../server/uploaded/${fn.filename}`,'utf-8',(err,datatext)=>{
            if(err) console.log(err);
            console.log(datatext);
            res.send(datatext);
        });
    }
    catch(err){
        console.log(err);
    }
}

export const modifycontent = async(req,res)=>{
    let values = {};
    const {feedback,comment,textdata,fileid} = req.body;
    const user = await Files.findById(fileid);
    user.comments = comment;
    user.feedback = feedback;
    if(textdata){
        fs.writeFile(`../server/uploaded/${user.filename}`)
    }
    await user.save();
}

export const approvefile = async(req,res)=>{
    const {role,fileid} = req.body;
    const file = await Files.findById(fileid);
    if(file.approvedby==undefined && role=="Creator"){
        file.approvedby = "Creator";
        await file.save();

    }
    else if(file.approvedby=="Creator" && role=="Reviewer"){
        file.approvedby = "Reviewer";
        await file.save();
    }
    else if(file.approvedby=="Reviewer" && role=="Approver"){
        file.approvedby = "Approver";
        await file.save();
    }
    res.send(file.approvedby);

}