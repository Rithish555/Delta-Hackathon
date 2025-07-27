import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axi from '../axios.js'
import { Context } from '../Context.jsx'

export const Register = () => {
    const {isLoggedIn,setIsLoggedIn,role,setRole,mail,setmail,id,setid} = useContext(Context)
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [roles,setroles] = useState('');
    const [mailerrormsg,setmailerrormsg] = useState('');

    async function registeruser(e){
        e.preventDefault();
        try{
            const reg = await axi.post("/user/register",{email,password,roles});
            setmail(reg.data.email);
            setid(reg.data._id);
            setRole(reg.data.role);
            setIsLoggedIn(true);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col justify-center mx-100 mt-40 h-[500px] rounded-2xl bg-[rgb(208,226,251))] shadow-[8px_8px_6px_rgba(0,0,0,0.4)] mb-30'>
        <div className='mb-7 text-5xl text-center ml-7 text-[#474747]'>Register</div>
        <form onSubmit={registeruser}>
            <div className='flex flex-col items-center mb-5'>
            <div className='flex flex-col'>
                <label htmlFor="email" className='ml-7'>Email</label>
                <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-60 pl-3 ml-7 border border-[#0000008c] rounded-md mb-1 mt-1 h-8'/>
            </div>
            <div className='ml-7 text-red-700 mb-3 text-sm'>{mailerrormsg}</div>
            <div className='flex flex-col'>
                <label htmlFor="password" className='ml-7'>Password</label>
                <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-60 pl-3 ml-7 border border-[#000] rounded-md mb-1 mt-1 h-8'/>
            </div>
            <div className='flex gap-4 mt-2'>
                <label htmlFor="role" className='ml-7'>Role</label>
                <select name="role" id="role" value={roles} onChange={(e)=>{setroles(e.target.value)}}>
                    <option value="Creator">Creator</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Approver">Approver</option>
                </select>
            </div>
            </div>
            <div className='flex justify-center'>
            <button type='submit' className='cursor-pointer p-2 rounded-3xl font-bold w-22 bg-red-500 text-white transition hover:scale-110'>Sign Up</button>
            </div>
        </form>
        </div>
    )
}
