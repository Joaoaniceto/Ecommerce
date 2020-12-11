import React,{useEffect,useState} from 'react'
import { Route } from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './UserRedirect'
import {currentAdmin} from '../../API/auth'

const AdminRoute = ({children,...rest})=>{

   const { user } = useSelector((state)=>({...state}));


   const [ok, setok] = useState(false);



   useEffect(()=>{
     if (user && user.token){
         currentAdmin(user.token)
         .then(res=>{console.log('current admin res',res)
        setok(true)
        })
        .catch((err)=>{
          console.log(err)
            setok(false)})
           
     }
   },[user])

   


   return ok ? (<Route {...rest} />) : (<LoadingToRedirect className="text-danger" />)
}


export default AdminRoute;