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
import SubCreate from './pages/admin/category/subCreate'
import SubUpdate from  './pages/admin/category/subUpdate'
import ProductCreate from './pages/Product/ProductCreate'
import AllProducts from './pages/Product/allProducts'
import ProductUpdate from './pages/Product/ProductUpdate'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import Shop from './pages/shop'
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from './API/auth'
import SubsHome from './pages/Subs/subs';
import Cart from  './pages/Cart'
import Sidedrawer from './components/Drawer/SideDrawer'
import Checkout from './pages/user/Checkout'
import CreateCoupon from './pages/admin/coupon/createcoupon'
import Payment from './pages/Payment'

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
    <Sidedrawer />
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
      <AdminRoute exact path="/admin/sub" component={SubCreate} />
      <AdminRoute exact 
      path="/admin/category/:slug" 
      component={CategoryUpdate} />
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
      <AdminRoute exact path="/admin/product" component={ProductCreate} />
      <AdminRoute exact path="/admin/products" component={AllProducts} />
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
      <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
      <Route exact path="/product/:slug" component={Product}></Route>
      <Route exact path="/category/:slug" component={CategoryHome}></Route>
      <Route exact path="/sub/:slug" component={SubsHome}></Route>
      <Route exact path="/shop" component={Shop}></Route>
      <Route exact path="/cart" component={Cart}></Route>
      <Route exact path="/Checkout" component={Checkout}></Route>
      <Route exact path="/payment" component={Payment}></Route>

    </Switch>
    
    </>
  );
 
}

export default App;
