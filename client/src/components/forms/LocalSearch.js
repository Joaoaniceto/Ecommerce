import React from 'react'


const LocalSearch = ({keyword,setKeyword})=>{

    const handlechange = (e) =>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
        }
 
return(
    <div className="container pb-4">
    <input type="search" placeholder="Filter" value={keyword} 
onChange={handlechange}
    className="form-control mb-4"
></input>
</div>)
}


export default LocalSearch