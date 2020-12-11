import React,{useEffect} from 'react';

import { Switch, Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RegisterComplete from './pages/Auth/RegisterComplete'
import Home from './pages/Home'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Header from './components/Nav/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoutes'
import Password from './pages/user/password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/Admindashboard'
import AdminRoute from './components/routes/AdminRoute'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'

import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from './API/auth'



const App = () => {
 const dispatch = useDispatch()



 useEffect(()=>{
   console.log('hi');
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if (user){
        const idTokenResult = await user.getIdTokenResult();
         currentUser(idTokenResult.token)
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
        }).catch((e) => console.log(e));

      }
    })

    return () => unsubscribe()
 },)




  return(
    <>
       <Header />
       <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/register/complete" component={RegisterComplete}></Route>
      <Route exact path="/forgot/password" component={ForgotPassword}></Route>
      <UserRoute exact path="/user/history" component={History} />
      <UserRoute exact path="/user/password" component={Password} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact 
      path="/admin/category/:slug" 
      component={CategoryUpdate} />

    </Switch>
    </>
  );
 
}

export default App;
