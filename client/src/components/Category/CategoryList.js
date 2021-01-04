import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{getCategories} from '../../API/category'


const CategoryList = ()=>{
    
    const [categories, setcategories] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(()=>{
        setloading(true);
      getCategories().then(res=>setcategories(res.data))
      setloading(false)
      },[])


      const showCategories =()=> categories.map((ele)=> <div  key={ele._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'><Link to={`/category/${ele.slug}`}>{ele.name}</Link></div>)


      return(<div className="container">
      <div className="row">
          {loading ? <h4 className=" text-center">Loading...</h4>: showCategories()}
          </div>
      </div>)




}

export default CategoryList


