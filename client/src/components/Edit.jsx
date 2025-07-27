import React, { useEffect, useState,useContext } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import axi from '../axios';
import { Context } from '../Context';

export const Edit = () => {
    const {role} = useContext(Context);
    const {state} = useLocation();
    const {fileid} = state;
    let text;
    const fn = useParams();
    const [textdata,settextdata] = useState('')
    const [newtext,setnewtext] = useState('');
    const [feedback,setfeedback] = useState('');
    const [comment,setcomment] = useState('');
    useEffect(()=>{
        const getdata = async()=>{
            const filedata = await axi.post(`/uploads/filedata`,{fn});
            settextdata(filedata.data);
            setnewtext(filedata.data);
        }
        getdata();
    },[])

    async function savechanges(){
        try{
            const changedata = await axi.patch('/uploads/changes',{feedback,comment,fileid})
        }
        catch(err){
            console.log(err);
        }
        
    }

    return (
        <div>
            <div className='flex gap-5 mt-10 ml-10 justify-around'>
                <textarea name="recdata" id="recdata" className='w-100 h-100 border border-black p-3' value={textdata} onChange={(e)=>settextdata(e.target.value)}></textarea>
                <div className='w-0.5 h-140 bg-black'></div>
                <div>
                {role=="Reviewer" || role=="Approver" && <div><div>Feedback</div>
                <textarea name="fb" id="fb" className='border border-black w-100 h-60 p-3' value={feedback} onChange={(e)=>setfeedback(e.target.value)}></textarea>
                <div>Comments</div>
                <textarea name="fb" id="fb" className='border border-black w-100 h-60 p-3' value={comment} onChange={(e)=>setcomment(e.target.value)}></textarea></div>}
                </div>
            </div>
            <div className='flex justify-center mt-8 mb-15'>
                <div onClick={savechanges} className='p-2 rounded-2xl text-center bg-red-500 w-30 cursor-pointer text-white'>Save</div>
            </div>
        </div>
    )
}
