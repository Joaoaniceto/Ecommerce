import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../API/product'
import {Select} from 'antd'
import ProductCreateForm from '../../components/forms/productCreateForm'
import {getCategories,getCategorySubs} from '../../API/category'
import FileUpload from '../../components/forms/Fileupload'
import {LoadingOutlined } from '@ant-design/icons'




const {Option} = Select;
 const initstate ={
    title:'',
    descriptiom:'',
    price:'',
    categories:[],
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:['Black','Brown','Silver','White','Blue'],
    brands:['Apple','Microsoft','Omen','Asus','Lenovo'],
    color:'',
    brand:'',
 }



const ProductCreate = ()=>{

    const  { user } = useSelector(state => ({...state}))

const [values, setValues] = useState(initstate)
const [subOptions, setsubOptions] = useState([]);
const [showSub, setshowSub] = useState(false)
const  [loading, setloading] = useState(false)

    
const loadCategories = () =>{
    getCategories()
    .then((res)=>{
        setValues({...values,categories:res.data});
        
    })
   
}

useEffect(()=>{
   loadCategories();
},[])


const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand} = values;


const handleSubmit = (e)=>{
  e.preventDefault();


 createProduct(values,user.token).then((res)=>{
     toast.success(`Product ${title} was created`)
     window.alert(`${res.data.title} is created`)
     window.location.reload();
 }).catch((err)=> {

     toast.error(err.response.data.err);
    })
}


const handleChange = (e)=>{
  setValues({...values,[e.target.name]:e.target.value})
  console.log(e.target.name,e.target.value)
}



const handleCategoryChange = (e)=>{
e.preventDefault();

setValues({...values,subs:[], category:e.target.value})

getCategorySubs(e.target.value)
.then((res)=>{
    setsubOptions(res.data);
})
setshowSub(true);
}

return(
    <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">
    <AdminNav />
        </div>

   
        <div className="col-md-10">
       {loading ? <LoadingOutlined className="text-danger" />:  <h4>Product Create</h4>}
   <hr />
        {JSON.stringify(values.images)}


    <FileUpload className="p-3" values={values} setValues={setValues} setloading={setloading}/>

 
    
           <ProductCreateForm 
           handleChange={handleChange} 
           handleSubmit={handleSubmit}
           values ={values}
            />

            <div className="form-group">
<label>Category</label>
<select name="category" className="form-control" onChange={handleCategoryChange}>
<option>please Select</option>
    {categories.length >0 && 
    categories.map((elem,i)=>(<option value={elem._id} key={elem._id} >{elem.name}</option>))}
</select>
 </div>


 {showSub && 
<div>

<label>SubCategories</label>
<Select mode="multiple" 
style={{width:'100%'}} 
placeholder="Please Select"
value={subs}
onChange={
    (value)=>{setValues({...values,subs:value})}
}
>
    { subOptions.length && 
    subOptions.map((e) => 
        <Option key={e._id} value={e._id}>{e.name}</Option>
        
        ) } 
</Select>
</div>

}



 <button className="btn btn-outline-info" onClick={handleSubmit}>Save</button>
        </div>
        </div>
    </div>
)
}

export default ProductCreate