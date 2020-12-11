import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Register = ({history}) =>{

    const [email,setEmail] = useState('');

    const {user} = useSelector((state)=>({...state}));

useEffect(()=>{
    if(user && user.token){
        history.push('/');
    }
}, [user]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config ={
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(email,config)
        toast.success(`email is sent to ${email}.`)

        //save user email in local storage

        window.localStorage.setItem('emailForRegistration',email)
        //clear state
        setEmail("");
    }

    const registerForm = () =>

    <form onSubmit={handleSubmit}>
    <input type="email" 
    className="form-control" 
    value={email} 
    onChange={(e)=>{setEmail(e.target.value)}}
        autoFocus
        placeholder="your Email..."
    />
    <br />
    <button type="submit" className="btn btn-raised">register</button>
    </form>
    

    return (
       <div className="container p-5">
           <div className="row">
                <div className="col-md-6 offser-md-3">
                    <h4>Register</h4>
                   
                    {registerForm()}
                </div>

           </div>
       </div>
    );
}

export default Register