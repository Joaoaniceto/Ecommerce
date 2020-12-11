import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {removeCategory ,getCategories,createCategory} from '../../../API/category'
import { Link } from 'react-router-dom'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'




const CategoryCreate = ()=>{
    const user = useSelector((state) => state.user)

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);

    
    const loadCategories = () =>{
        getCategories()
        .then((res)=>{
            setCategories(res.data);
            
        })
       
    }

    useEffect(()=>{
       loadCategories();
    },[])


    const handleRemove = async(slug) => {
    
    if (window.confirm('Delete?')){
        setLoading(true)
    removeCategory(slug,user.token)
    .then((res)=>{setLoading(false);loadCategories()}).catch((err)=>{
        toast.error(err.message)
    })
    }
    }


    const handleSubmit = (e) =>{
       e.preventDefault();
       setLoading(true);
       createCategory({name},user.token)
       .then((res)=>{
           setLoading(false);
           setName('');
        toast.success('product created')
        loadCategories();   
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
{loading ? (<h4 className="text-danger">Loading...</h4>):(<h4>Create Category</h4>)}
{CategoryForm()}
{categories.map((c)=>(<div key={c._id } className="alert alert-primary">
    {c.name}{" "}
    <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>
    <Link to={`/admin/category/${c.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-warning" /></span></Link>
</div>))}
</div>

</div>
    </div>
    )
}

export default CategoryCreate


