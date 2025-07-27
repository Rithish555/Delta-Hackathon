import { useState,useContext} from 'react'
import axi from '../axios';
import { Context } from '../Context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const {id} = useContext(Context);
  const [open,setopen] = useState(false);
  const [proj,setproj] = useState("");
  const [projdata,setprojdata] = useState([]);

  useEffect(()=>{
    const getdata = async()=>{
      try{
        const pdata = await axi.get('/uploads/projects/data');
        setprojdata(pdata.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getdata();
  },[])

  async function createproject(){
    try{
      const create = await axi.post('/uploads/proj',{proj,id});
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }

  function getfolder(fid){
    navigate(`/uploads/parent/${fid}`)
  }

  return (
    <div>
      <div className='ml-6 mt-4 flex gap-4 items-center justify-center'>
        <div onClick={()=>setopen(!open)} className='p-2 py-3 rounded-2xl bg-red-500 w-30 text-center cursor-pointer text-white'>Creat Project</div>
        {open && <div className='flex gap-4 items-center'>
            <input type="text" value={proj} onChange={(e)=>setproj(e.target.value)} className='p-2 w-40 h-8 border border-black' />
            <div onClick={createproject} className='p-2 rounded-2xl bg-red-500 w-30 text-center cursor-pointer text-white'>Create</div>
          </div>}
      </div>
      <div className='flex justify-around mt-10'>
        {projdata && projdata.map((ele)=>{
          return(
            <div key={ele._id}>
              <div className='text-3xl cursor-pointer' onClick={()=>getfolder(ele._id)}>📂</div>
              <div>{ele.projname}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
