import React, { useState } from 'react'

import {Menu} from 'antd'

import { SettingOutlined,HomeOutlined,UserOutlined,UserAddOutlined } from '@ant-design/icons';

import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const { SubMenu,Item } = Menu; // subbmenu




const Header = () => {


   const [current, setcurrent] = useState('home');

   const handleClick = (e) =>{
       setcurrent(e.key)
       //
   }

   let dispatch = useDispatch();
   // select user from redux
   let { user } = useSelector((state)=>({...state}))
   let history = useHistory();


   const logout = () =>{
     firebase.auth().signOut();
     dispatch({
       type:'LOGOUT',
       payload: null
     })
     history.push('/login')
   }

 return(
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
    <Item key="home" icon={<HomeOutlined />}>
      <Link to="/">Home</Link>
    </Item>

    {!user && ( <Item key="register" icon={<UserAddOutlined />} className="float-right">
    <Link to="/register">Register</Link>
    </Item>)}

    {!user && (
    <Item key="user" icon={<SettingOutlined />} className="float-right">
    <Link to="/login">Login</Link>
    </Item>)}
 

{user && (  <SubMenu
      icon={<SettingOutlined />}
      title={user.name } // name / @gmail.com [name,gmail.com]
      className="float-right"
    >
        {user && user.role==='subscribre' && (
          <Item >
       <Link to='/user/history'>Dashboard</Link>
        </Item>)}

        {user && user.role==='admin' && (
          <Item>
       <Link to='/admin/dashboard'>Dashboard</Link>
        </Item>)}
       
        <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
    </SubMenu>)}
 
  
  
  </Menu>
 )
}

export default Header