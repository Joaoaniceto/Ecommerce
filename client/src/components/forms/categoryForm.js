import React from  'react'




const CategoryForm = ({handleSubmit,name,setName}) => (
    <form onSubmit={handleSubmit}>
<div className="form-group">
    <label>
        Name
    </label>
    <input type="text" 
    placeholder={name} 
    value={name} 
    onChange={(e)=>setName(e.target.value)} 
    autoFocus
    required
    className="form-control">
   

    </input>
    <br/>
    <button className=" btn btn-outline-primary">Save</button>
</div>
    </form>
)

export default CategoryForm;