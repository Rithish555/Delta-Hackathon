import React from 'react'
import { useState } from 'react';
import { useEffect,useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axi from '../axios';
import { Context } from '../Context';

export const Items = () => {
    const navigate = useNavigate();
    const {id,role} = useContext(Context);
    const folderid = useParams().id;
    const [file,setfile] = useState(null);
    const[filedata,setfiledata] = useState([]);
    useEffect(()=>{
        const getfileitems = async ()=>{
            try{
                const files = await axi.get(`uploads/parent/${folderid}`);
                console.log(files);
                setfiledata(files.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getfileitems();
    },[])

    async function uploadfile(){
        try{
            const form = new FormData();
            form.append("fileupl",file);
            form.append("folderid",folderid);
            form.append("userid",id)
            const fileupload = await axi.post('uploads/file',form);
            // window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    function fileclick(filename,fileid){
        try{
            navigate(`/uploads/editfile/${filename}`,{state:{fileid:fileid}})
        }
        catch(err){
            console.log(err);
        }
    }

    async function approve(fileid){
        try{
            const app = await axi.patch("/uploads/approve",{role,fileid});
            console.log("ggggg")
            console.log(app.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <div className='flex justify-center mt-5 gap-5'>
                <label className='p-2 rounded-2xl bg-red-500 w-30 text-center cursor-pointer text-white'>Add files
                    <input type="file" name="fileupl" id="fileupl" className='hidden' onChange={(e)=>setfile(e.target.files[0])} />
                </label>
                <div onClick={uploadfile} className='p-2 rounded-2xl bg-red-500 w-30 text-center cursor-pointer text-white'>Upload</div>
            </div>
                
                <div className='flex justify-around mt-10'>
                    {filedata && filedata.map((ele)=>{
                    return(
                        <div key={ele._id} className='flex flex-col gap-2 items-center'>
                        <div className='text-6xl'>📄</div>
                        <div>{ele.filename.slice(0,15)+'...'}</div>
                        <div className='text-center w-20 text-sm border border-black p-2 rounded-2xl'><a href={`http://localhost:5000/uploaded/${ele.filename}`} target='_blank'>View</a></div>
                        <div className='text-sm border border-black p-2 rounded-2xl cursor-pointer w-20 text-center' onClick={()=>fileclick(ele.filename,ele._id)}>Edit</div>
                        <div className='text-sm border border-black p-2 rounded-2xl cursor-pointer w-20 text-center' onClick={()=>approve(ele._id)}>Approve</div>
                        </div>
                    )
                    })}
                </div>
        </div>
    )
}
