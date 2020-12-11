import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategory ,
     updateCategory} from '../../../API/category'




const CategoryUpdate = ({history, match })=>{
    const user = useSelector((state) => state.user)

    const [name,setName] = useState(match.params.slug)
    const [loading,setLoading] = useState(false);
   


    
    const loadCategory = () =>{
        getCategory(match.params.slug)
        .then((res)=>{
            setName(res.data.name);
            
        }).catch((err)=>console.log(err))
       
    }

    useEffect(()=>{
       loadCategory();
    },)



    const handleSubmit = (e) =>{
       e.preventDefault();
       setLoading(true);
       console.log(name);
       updateCategory(match.params.slug,{ name },user.token)
       .then((res)=>{
           setLoading(false);
           history.push('/admin/category')
        toast.success('product updated')
    })
       .catch((err)=>{
           setLoading(false);
           toast.error(err.response.data);
        })



    }

    const CategoryForm = () => (<form onSubmit={handleSubmit}>
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
    </form>)

    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
{loading ? (<h4 className="text-danger">Loading...</h4>):(<h4>Update Category</h4>)}
{CategoryForm()}
</div>

</div>
    </div>
    )
}

export default CategoryUpdate


