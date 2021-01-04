import React,{useState,useEffect} from 'react'
import {getSub} from '../../API/sub'
import {Link} from 'react-router-dom'
import ProductCard from '../../components/cards/productCardd'
import CategoryList from '../../components/Category/CategoryList'
import { productstar } from '../../API/product'



const SubsHome =({match})=>{
  
    const [subs, setsubs] = useState({});
   const [products, setproducts] = useState([]);
   const [loading, setloading] = useState(false)


   const {slug} = match.params;


    useEffect(()=>{
        setloading(true);

    getSub(slug).then(res=>{
      setsubs(res.data.sub);
      setproducts(res.data.products)
      setloading(false)
    })


    },[])


    return(

        <div className="container-fluid">
            <div className="row">
<div className="col">
{loading? (<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading</h4>) : (
    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">{products.length} products in '{subs.name}' category </h4>
)}
</div>

</div>

<div className="row">
{products.map(p =>(<div className="col" key={p._id}>
<ProductCard products={p} />
</div>))}
            </div>
        </div>
    )
}


export default SubsHome;