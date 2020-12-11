import React,{useState} from 'react'
import UserNav from '../../components/Nav/UserNav'
import {auth} from  '../../firebase'
import {toast} from 'react-toastify'


const Password =()=>{
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);

   const handleSubmit = async(e)=>{
       e.preventDefault()
       setloading(true)
       console.log(password);

       await auth.currentUser.updatePassword(password)
       .then((res)=>{
         setloading(false);
         toast.success('Password updated')
       })
       .catch((e)=>{
        setloading(false);
         toast.error(e.message)})
   }


    const passwordUpdateForm =()=>(<form onSubmit={handleSubmit}>
        <div className="form-group"></div>
        <label>Your password</label>
        <input 
        type="passsword" 
        onChange={(e)=>setpassword(e.target.value)} 
        className="form-contol"
        placeholder="Enter new password"
        disabled={loading}
        value={password} />
        <button className="btn bten-primary" disabled={!password || loading || password.length<6}>Submit</button>
    </form>);







return(
    <div className="container-fluid">
    <div className="row"> 
    <div className="col-md-2">
        <UserNav />
    </div>
    <div className="col">
   {loading ? (<h4 className="text-danger">Loading..</h4>): (<h4>Password Update</h4>) }
        {passwordUpdateForm()}
    </div>
    </div>
        </div>
)
}

export default Password;