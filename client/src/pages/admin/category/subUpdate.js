import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getSub ,
     updateSub} from '../../../API/sub'
import CategoryForm from '../../../components/forms/categoryForm'
import { getCategories } from '../../../API/category'





const SubUpdate = ({history, match })=>{
    const user = useSelector((state) => state.user)

    const [name,setName] = useState(match.params.slug)
    const [loading,setLoading] = useState(false);
    const [parent,setParent] = useState("");
    const  [categories, setCategories] = useState([]);
    const  [Category, setCategory] = useState("")
   

    const loadCategories = () =>{
        getCategories()
        .then((res)=>{
            setCategories(res.data);
            
        })
       
    }
    

    const loadSub = () =>{
        getSub(match.params.slug)
        .then((res)=>{
            setName(res.data.name);
            setParent(res.data.parent);
            
        }).catch((err)=>console.log(err))
       
    }

    useEffect(()=>{
       loadSub();
       loadCategories();
    },[])



    const handleSubmit = (e) =>{
       e.preventDefault();
       setLoading(true);
       console.log(name);
       updateSub(match.params.slug,{ name, parent },user.token)
       .then((res)=>{
           setLoading(false);
           history.push('/admin/sub')
        toast.success('product updated')
    })
       .catch((err)=>{
           setLoading(false);
           toast.error(err.response.data);
        })



    }

    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
{loading ? (<h4 className="text-danger">Loading...</h4>):(<h4>Update Sub</h4>)}


<div className="form-group">
<label>Parent Category</label>
<select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
<option>please Select</option>
    {categories.length >0 && 
    categories.map((elem,i)=>(<option value={elem._id} key={elem._id} selected={elem._id === parent} >{elem.name}</option>))}
</select>
 </div>


<CategoryForm
handleSubmit={handleSubmit}
name={name}
setName={setName}
 />
</div>

</div>
    </div>
    )
}

export default SubUpdate


