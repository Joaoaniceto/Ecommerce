import React,{useState,useEffect} from 'react'
import {getProductsbyCount} from '../API/product'
import {useSelector,useDispatch} from 'react-redux'
import ProductCard from '../components/cards/productCardd'
import {fetchProductByFilter} from '../API/product'
import {Menu,Slider,Checkbox,Radio} from 'antd'
import {DollarOutlined,DownSquareOutlined} from '@ant-design/icons'
import {getCategories} from '../API/category'
import {getSubs} from '../API/sub'
import Star from '../components/forms/star'

const {SubMenu} = Menu

 const Shop = ()=>{

const [categories, setcategories] = useState([])
const [categorieids, setcategorieids] = useState([])
const [products, setproducts] = useState([])
const [loading, setloading] = useState(false)
const [price,setprice] = useState([0,0]);
const [ok, setok] = useState(false)
const [star, setstar] = useState('')
const [subs, setsubs] = useState([])
const [sub, setsub] = useState('')
const [brands, setbrands] = useState(['Apple','Microsoft','Omen','Asus','Lenovo'])
const [colors, setcolors] = useState(['Black','Brown','Silver','White','Blue'])
const [brand, setbrand] = useState('')
const [color, setcolor] = useState('')

const dispatch = useDispatch()
let {search} = useSelector(state => ({...state}))
const {text} = search;


useEffect(()=>{
loadAllProducts();

getCategories().then(res=>setcategories(res.data))
getSubs().then(res=>setsubs(res.data));
},[])

// load on default
const loadAllProducts =() =>{
    setloading(true);
    getProductsbyCount(13).then(res=>{
        console.log(res.data);
         setproducts(res.data);
         setloading(false)
    }).catch(err=>{
        console.log(err);
        setloading(false)
    })
}

//load products on user search input
useEffect(()=>{
    const delayed = setTimeout(()=>{
        fetchProduct({query:text});
        if(!text){
            loadAllProducts();
        }
    },300);
     return ()=> clearTimeout(delayed);
},[text])


const fetchProduct = (text)=>{
    fetchProductByFilter(text).then((res)=>{
        setproducts(res.data);
    
    })
}




useEffect(()=>{
console.log(products)
fetchProduct({price:price})
},[ok])



const handleSlider = (value)=>{
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""}
    })
  setprice(value);
  setTimeout(()=>{
      setok(!ok);
  },300)
}


const handleCheck = (e)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload:{text:""}
    })
    setprice([0,0])
    setcategorieids([])
let intheState = [...categorieids];
let justChecked = e.target.value;
let foundIntheState = intheState.indexOf(justChecked);

if (foundIntheState ===-1) { 
    intheState.push(e.target.value);
   
} 
else{ intheState.splice(foundIntheState,1)}
setcategorieids(intheState);
console.log(intheState);

fetchProduct({category:intheState})
console.log(products)
}

const handleSubs = (s)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload:{text:""}
    })
    setprice([0,0])
    setcategorieids([]);
    setsub(s)
    fetchProduct({sub})
}


const showSubs =()=>{
    return <div>
        {subs.map((s)=><div onClick={()=> handleSubs(s)} style={{cursor:'pointer'}} className="p-1 m-1 badge badge-secondary" key={s._id}>{s.name}</div>)}
    </div>
}


const showCategories = ()=> categories.map((c)=> <div key={c._id}>
    <Checkbox onChange={handleCheck} value={c._id} checked={categorieids.includes(c._id)} className="pb-2 pl-4 pr-4">
        {c.name}
    </Checkbox>
</div>)


const showBrands =()=> brands.map(b=>(<Radio value={b} 
name={b} 
checked={b===brand} 
onChange={handlebrand} 
    className="pb-1 pl-1 pr-4"
>{b}</Radio>))

const handlebrand = (e)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload:{text:""}
    })
    setprice([0,0])
    setcategorieids([]);
    setsub('');
    setbrand(e.target.value);
    fetchProduct({brand: e.target.value})
}

const handleColor = (e)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload:{text:""}
    })
    setprice([0,0])
    setcategorieids([]);
    setsub('');
    setbrand('');
    setcolor(e.target.value)
    fetchProduct({color: e.target.value})
}


const showColors = ()=> colors.map(b=>(<Radio value={b} 
    name={b} 
    checked={b===brand} 
    onChange={handleColor} 
        className="pb-1 pl-1 pr-4"
    >{b}</Radio>))

return(
    <div className="container-fluid">
    <div className="row">
    <div className="col-md-3">
       <h4>Search/Filter </h4>
       <Menu defaultOpenKeys={['1','2','3','4','5','6']} mode="inline">
           <SubMenu key="1" title={<span className="h6"><DollarOutlined/>price</span>}>
<div>
    <Slider className="ml-4 mr-4" 
    tipFormatter={(v)=> `${v}`}  
    range value={price} 
    onChange={handleSlider}
    max="4999"
     />
</div>
           </SubMenu>
           <SubMenu key="2" title={<span className="h6"><DownSquareOutlined/>Categories</span>}>
<div>
   {showCategories()}
</div>
           </SubMenu>
           <SubMenu key="3" title={<span className="h6"><DownSquareOutlined/>Subs</span>}>
<div>
   {showSubs()}
</div>
           </SubMenu>

           <SubMenu key="4" title={<span className="h6"><DownSquareOutlined/>Brands</span>}>
<div className="pl-4 pr-4">
   {showBrands()}
</div>
           </SubMenu>

           <SubMenu key="5" title={<span className="h6"><DownSquareOutlined/>Colors</span>}>
<div className="pl-4 pr-4">
   {showColors()}
</div>
           </SubMenu>
       </Menu>
    </div>
    <div className="col-md-9 pt-3">

   {loading ? <h4 className="text-danger">Loading...</h4>:<h4 className="text-danger">Products</h4>}
   {products.length <1 && 'no Products found'}

   <div className="row">
   {products.map((p)=>
       <div key={p._id} className="col-md-4">
       <ProductCard products={p} />
       </div>
   )}
   </div>
   </div>
   </div>
    </div>
)


 }

export default Shop