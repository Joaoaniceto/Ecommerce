import React,{useEffect,useState} from 'react'
import {readProduct,productstar} from '../API/product'
import Singleproduct from '../components/cards/Singleproduct'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import {getRelated} from '../API/product'
import ProductCard from '../components/cards/productCardd'

const Product = ({match}) =>{

    const [product, setproduct] = useState({})
    const [star, setstar] = useState(0)
    const [related, setrelated] = useState([])

    const {user} = useSelector(state=>({...state}))

    const {slug} = match.params;



    useEffect(()=>{
    loadSingleProduct()
    console.log(related);
    },[slug])


    useEffect(()=>{
        if(product.ratings && user){
            let existingRatingObject = product.ratings.find((ele)=>ele.postedBy.toString() == user._id.toString());
            existingRatingObject && setstar(existingRatingObject.star);

        };
        },[])
    

    const loadSingleProduct = ()=>{
        readProduct(slug).then((res)=>{
            setproduct(res.data);

            getRelated(res.data._id).then(res=>{
                setrelated(res.data);
            })
        })

    }

    const onStarClick = (newRating,name)=>{
 console.log(newRating,name)
 setstar(newRating);
 productstar(product._id,newRating,user.token)
 .then((res)=>toast.success('thanks for the review'))
 .catch(err=>console.log(err))
 loadSingleProduct()
    }


    return(
        <div className="conmtainer-fluid">
        <div className="row pt-4">
             <Singleproduct  product={product} onStarClick={onStarClick} star={star} />
        </div>
        <div className="row">
       <div className="col text-center pt-5 pb-5">
       <hr/>
       <h4>Related Products</h4>
        <hr/>
       </div>
        </div>


        <div className="row pb-5">
           {related.length ? related.map((ele)=>{
               console.log(ele)
               return(
               <ProductCard products={ele}/>
               )
           }) : 'not found'}
        </div>
        </div>
    )
}

export default Product