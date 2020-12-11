import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategory ,
     updateCategory} from '../../../API/category'
import CategoryForm from '../../../components/forms/categoryForm'




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
    },[])



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

    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
{loading ? (<h4 className="text-danger">Loading...</h4>):(<h4>Update Category</h4>)}
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

export default CategoryUpdate


