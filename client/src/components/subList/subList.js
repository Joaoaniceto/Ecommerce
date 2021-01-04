import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{getSubs} from '../../API/sub'


const SubsList = ()=>{
    
    const [subs,setSubs] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(()=>{
        setloading(true);
      getSubs().then(res=>setSubs(res.data))
      setloading(false)
      },[])


      const showSubs =()=> subs.map((ele)=> <div  key={ele._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'><Link to={`/sub/${ele.slug}`}>{ele.name}</Link></div>)


      return(<div className="container">
      <div className="row">
          {loading ? <h4 className=" text-center">Loading...</h4>: showSubs()}
          </div>
      </div>)




}

export default SubsList


