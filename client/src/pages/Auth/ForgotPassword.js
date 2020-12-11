import React,{useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'


const ForgotPassword = ({history}) =>{




const [email, setEmail] = useState('');
const [loading, setloading] = useState(false);

const {user} = useSelector((state)=>({...state}));

useEffect(()=>{
    if(user && user.token){
        history.push('/');
    }
}, [user]);



const handlesubmit = async (e) =>{
    e.preventDefault();
    setloading(true)
try{
    const config ={
        url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
    }
 await auth.sendPasswordResetEmail(email,config)
 .then((response)=>{
     setEmail('')
     setloading(false)
     toast.success('Check your email to reset your password')
 })
 .catch((error)=>{
     console.log(error)
     setloading(false)
     toast.error(error.message);
    })


}catch (e){
    toast.error(e.message);
    setEmail('');
    setloading(false)
}



    
    
}
    return(
        <div className="container col.md-6 offset-md-3 p-5">
          {loading ? <h4 className="text-danger">Loading</h4> : <h4>Forgot Password</h4>}
          <form onSubmit={handlesubmit}>
          <input 
          type="email"
          className="form-control"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Type your Email"
          autoFocus
          /> 
          <button disabled={!email} className="btn btn-raised"> submit </button>
          </form>
        </div>
    );
}


export default ForgotPassword;