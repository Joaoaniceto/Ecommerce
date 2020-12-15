import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../API/product'
import {Select} from 'antd'
import ProductCreateForm from '../../components/forms/productCreateForm'
import {getCategories,getCategorySubs} from '../../API/category'
import FileUpload from '../../components/forms/Fileupload'
import {LoadingOutlined} from '@ant-design/icons'
import {readProduct,updateProduct} from '../../API/product'
import ProductUpdateForm from '../../components/forms/ProductUpdateForm'



   
const {Option} = Select;

const ProductUpdate = ({match,history})=>{


  const initstate ={
    title:'',
    descriptiom:'',
    price:'',
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

    const  { user } = useSelector(state => ({...state}))

    const [values, setvalues] = useState(initstate)
    const [subOptions,setsubOptions] = useState([])
    const [categories,setcategories] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    const [loading, setloading] = useState(false);


    const {slug} = match.params

useEffect(()=>{
 loadProduct()
loadCategories()
},[])



const loadProduct = ()=>{
 
 readProduct(slug).then((res)=>{
     setvalues({...values,...res.data[0]}) 
    

console.log(res.data[0].category);
 getCategorySubs(res.data[0].category._id)
 .then(
     (res)=>{
         setsubOptions(res.data)
     });

 let arr =[];
 res.data[0].subs.map((s)=>{
     arr.push(s._id)
 });
 setArrayOfSubIds((prev)=>arr)

  })
}

const loadCategories = ()=>{
    getCategories()
    .then(
        (res)=>{
            setcategories(res.data)
        })


}

    const handleSubmit = (e)=>{
    e.preventDefault();
    setloading(true);
    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug,values,user.token)
    .then((res)=>{
setloading(false)
toast.sucess('updated');
history.push('/admin/products')
    }).catch((err)=>{
        console.log(err)
        setloading(false)
    })
    }

    const handleChange = (e)=>{
  setvalues({...values,[e.target.name]:e.target.value})

}


const handleCategoryChange = (e)=>{
e.preventDefault();

setvalues({...values,subs:[]})

setselectedCategory(e.target.value)

getCategorySubs(e.target.value)
.then((res)=>{
    setsubOptions(res.data);
});
if(e.target.value === values.category._id){
    console.log('hi')
    loadProduct()
}
setArrayOfSubIds([]);
}



return(
    <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">
    <AdminNav />
        </div>
   
        <div className="col-md-10">
<h4>Product update</h4>
   <hr />

    <FileUpload className="p-3" values={values} setValues={setvalues} setloading={setloading}/>

   


  <div className="form-group">
<label>Category</label>
<select name="category"
value={selectedCategory ? selectedCategory :  values.category._id}
 className="form-control"
 onChange={handleCategoryChange}>
<option>please Select</option>
    {categories.length >0 && 
    categories.map((elem,i)=>(<option value={elem._id} key={elem._id}>{elem.name}</option>))}
</select>
 </div>




<div>

<label>SubCategories</label>
<Select mode="multiple" 
style={{width:'100%'}} 
placeholder="Please Select"
 value={arrayOfSubIds}
onChange={
    (value)=>{setArrayOfSubIds(value)}
}
>
    { subOptions.length && 
    subOptions.map((e) => 
        <Option key={e._id} value={e._id}>{e.name}</Option>
        
        ) } 
</Select>
</div>


 <ProductUpdateForm  values={values} handleChange={handleChange} handleSubmit={handleSubmit} setvalues={setvalues}   /> 

</div>



        </div>
        </div>
)}

export default ProductUpdate;