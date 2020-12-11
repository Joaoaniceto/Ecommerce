import React from 'react'
import { Route } from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './UserRedirect'

const UserRoute = ({children,...rest})=>{

   const { user } = useSelector((state)=>({...state}));


   return (user && user.token) ? (<Route {...rest} />) : (<LoadingToRedirect className="text-danger" />)
}


export default UserRoute;