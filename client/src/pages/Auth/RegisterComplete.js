import React,{useState ,useEffect} from 'react'

import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'
import  {createOrUpdateUser} from '../../API/auth'


const RegisterComplete = ({history}) =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    let dispatch = useDispatch()

        const {user} = useSelector((state)=>({...state}));

    useEffect(()=>{
     setEmail(window.localStorage.getItem('emailForRegistration'));
    },[])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password){
            toast.error('Email or password are invalid');
        }
        if(password.length <6){
            toast.error('Password must be ate least 6 characteres long')
        }
      try {
          const result  = await auth.signInWithEmailLink(
              email,
              window.location.href);
              if(result.user.emailVerified){
               
                  // remove user email from loca storage
                  window.localStorage.removeItem('emailFormRegistration')
                  // get token id
                  let user = auth.currentUser
                  await user.updatePassword(password);
                  const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
          console.log(res.data);
          dispatch({
            type:'LOOGED_IN_USER',
            payload:{
              name: res.data.name,
              email: res.data.email,
              role:res.data.role,
              _id:res.data._id,
              token: idTokenResult.token,
            }
          });
        })
        .catch((error)=>{console.log(error)})
                  //redirect
                  history.push('/')
              }
              
      } catch (error){
          console.log(error);
          toast.error(error.message);
      }
    }

    const  completeRegisterForm = () =>

    <form onSubmit={handleSubmit}>
    <input type="email" 
    className="form-control" 
    value={email} 
   disabled
    
    />
     <input type="password" 
    className="form-control" 
    value={password}
    placeholder="Password"
    autoFocus
   onChange={(e)=>{setPassword(e.target.value)}}
    
    />
    <button type="submit" className="btn btn-raised">Complete Register</button>
    </form>
    

    return (
       <div className="container p-5">
           <div className="row">
                <div className="col-md-6 offser-md-3">
                    <h4>Register</h4>
                   
                    {completeRegisterForm()}
                </div>

           </div>
       </div>
    );
}

export default RegisterComplete