import React,{useState,useEffect} from 'react'

import {auth, googleprovider} from '../../firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button} from 'antd'
import { GoogleOutlined, MailOutlined, } from '@ant-design/icons'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import  {createOrUpdateUser} from '../../API/auth'




const Login = ({history}) =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
     const [loading, setLoading] = useState(false)
    let dispatch = useDispatch()

    const {user} = useSelector((state)=>({...state}));

    useEffect(()=>{
     let intended = history.location.state;
     if (intended){
       return
      }
        if(user && user.token){
            history.push('/');
        }
    }, [user,history]);
    

    
const roleBaseRedirect = (res) =>{
  //check if intended
  console.log(history)
  let inteded = history.location.state;
  console.log(inteded);
  if(inteded){
    history.push(inteded.from)
  }
else if(res.data.role === 'admin'){
  history.push('/admin/dashboard');
} else {
  history.push('/user/history');
}
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
         try {
        const result = await auth.signInWithEmailAndPassword(email,password)
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult()


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
          roleBaseRedirect(res);
        })
        .catch((error)=>{console.log(error)})
        

         
        } catch (e){
          toast.error(e.message);
          setLoading(false);
        }
    }


    const googleLogin = () =>{
        auth.signInWithPopup(googleprovider)
        .then( async(result)=>{
          const {user} = result;
          const idTokenResult =await user.getIdTokenResult();

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
           roleBaseRedirect(res);
        })
        .catch((error)=>{console.log(error)})
          
        })
        .catch((error)=>{toast.error(error.message)})
       
    }
    
    const LoginForm = () =>

    <form onSubmit={handleSubmit}>
    <input type="email" 
    className="form-control" 
    value={email} 
    onChange={(e)=>{setEmail(e.target.value)}}
        autoFocus
        placeholder="Your Email..."
    />
    <br />
    <input type="email" 
    className="form-control" 
    value={password} 
    onChange={(e)=>{setPassword(e.target.value)}}
        autoFocus
        placeholder="Your Password..."
    />
    <br />
    <Button block
    shape ="round" 
    type="primary" 
    className="mb-3" 
    icon={<MailOutlined />}
    size="large"
    disabled={!email || password.length<6}
    onClick={handleSubmit}>Login with Email/Password</Button>
    </form>
    

    return (
       <div className="container p-5">
           <div className="row">
                <div className="col-md-6 offser-md-3">
                   {loading ?  <h4>Loading...</h4>  :  <h4>Login</h4>}
                   
                    {LoginForm()}
                    <Button block
    shape ="round" 
    type="danger" 
    className="mb-3" 
    icon={<GoogleOutlined />}
    size="large"
    onClick={googleLogin}>Login with Google</Button>

    <Link to='/forgot/password' className="float-right text-danger">
  Forgot Password
</Link>
                </div>

           </div>
       </div>
    );
}

export default Login