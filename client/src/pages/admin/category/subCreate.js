import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {removeSub ,getSubs,createSub, getSub} from '../../../API/sub'
import { Link } from 'react-router-dom'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/categoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import { getCategories } from '../../../API/category'



const SubCreate = ()=>{
    const user = useSelector((state) => state.user)

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [subs, setSubs] = useState([])
    const [keyword,setKeyword] = useState('');
    const  [Category, setCategory] = useState("")

    
    const loadCategories = () =>{
        getCategories()
        .then((res)=>{
            setCategories(res.data);
            
        })
       
    }
       
    const loadSubs = () =>{
        getSubs()
        .then((res)=>{
            setSubs(res.data);
            console.log(subs);
        })
       
    }

    useEffect(()=>{
       loadCategories();
       loadSubs();
    },[keyword])


    const handleRemove = async(slug) => {
    
    if (window.confirm('Delete?')){
        setLoading(true)
    removeSub(slug,user.token)
    .then((res)=>{setLoading(false);loadSubs()}).catch((err)=>{
        toast.error(err.message)
    })
    }
    }


    const handleSubmit = (e) =>{
       e.preventDefault();
       setLoading(true);
       createSub({name,parent:Category},user.token)
       .then((res)=>{
           setLoading(false);
           setName('');
        toast.success('product created')
        loadSubs();
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
(<h4>Create sub Category</h4>)}

<div className="form-group">
<label>Parent Category</label>
<select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
<option>please Select</option>
    {categories.length >0 && 
    categories.map((elem,i)=>(<option value={elem._id} key={elem._id} >{elem.name}</option>))}
</select>
 </div>



 <CategoryForm 
handleSubmit={handleSubmit} 
name={name} 
setName={setName} />

<LocalSearch keyword={keyword} setKeyword={setKeyword} />


{subs.filter(searched(keyword)).map((c)=>(
    <div key={c._id } 
className="alert alert-primary">
    {c.name}{" "}
    <span onClick={() => handleRemove(c.slug)} 
    className="btn btn-sm float-right">
    <DeleteOutlined 
    className="text-danger" />
    </span>
    <Link 
    to={`/admin/sub/${c.slug}`}>
    <span className="btn btn-sm float-right">
    <EditOutlined className="text-warning" />
    </span></Link>
</div>))}






</div>

</div>
    </div>
    )
}

export default SubCreate

