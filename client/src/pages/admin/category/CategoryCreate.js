import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {removeCategory ,getCategories,createCategory} from '../../../API/category'
import { Link } from 'react-router-dom'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/categoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'



const CategoryCreate = ()=>{
    const user = useSelector((state) => state.user)

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
//step1
    const [keyword,setKeyword] = useState('');

    
    const loadCategories = () =>{
        getCategories()
        .then((res)=>{
            setCategories(res.data);
            
        })
       
    }

    useEffect(()=>{
       loadCategories();
    },[keyword])


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


       //step 3
const handlechange = (e) =>{
e.preventDefault();
setKeyword(e.target.value.toLowerCase())
}

const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
{loading ? 
(<h4 className="text-danger">Loading...</h4>)
:
(<h4>Create Category</h4>)}

<CategoryForm 
handleSubmit={handleSubmit} 
name={name} 
setName={setName} />

<LocalSearch keyword={keyword} setKeyword={setKeyword} />

{categories.filter(searched(keyword)).map((c)=>(
    <div key={c._id } 
className="alert alert-primary">
    {c.name}{" "}
    <span onClick={() => handleRemove(c.slug)} 
    className="btn btn-sm float-right">
    <DeleteOutlined 
    className="text-danger" />
    </span>
    <Link 
    to={`/admin/category/${c.slug}`}>
    <span className="btn btn-sm float-right">
    <EditOutlined className="text-warning" />
    </span></Link>
</div>))}
</div>

</div>
    </div>
    )
}

export default CategoryCreate


