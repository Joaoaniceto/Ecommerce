import React,{useState} from 'react'
import {Card,Tooltip} from 'antd';
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import laptop from '../../images/laptop.png'
import {showAverage} from '../../API/rating'
import _ from 'lodash'
import {useSelector,useDispatch} from 'react-redux'


const ProductCard = ({products})=>{



    const {Meta} = Card;
    const {images,slug,description,title,price,quantity} = products;
    const [tooltop, settooltop] = useState('Click to add')

     const {user,cart} = useSelector(state=>({...state})) 
     const dispatch = useDispatch()

     const handleRemove = ()=>{
       
     }



     const handleAddToCart = ()=>{
         let cart=[];
         if(typeof window !== 'undefined'){   
             // if 
             if(localStorage.getItem('cart')){
                 cart =JSON.parse(localStorage.getItem('cart'))
             }
             cart.push({
                 ...products,
                 count:1
             });

             let unique = _.uniqWith(cart, _.isEqual);
             localStorage.setItem('cart',JSON.stringify(unique))
         settooltop('added')


         dispatch({
             type:'ADD_TO_CART',
             payload: unique
         })
         dispatch({
            type:'SET_VISIBLE',
            payload: true
        })

         }
     }

    return(
        <div className="col">
        {products && products.ratings && products.ratings.length>0 ? 
            showAverage(products) : <div className="text-center pt-1 pb-3">No rating yet</div>}
        <Card
        cover={<img alt="laptop"
        src={images && images.length ? images[0].url : laptop} 
        className="p-1"
        style={{height:'300px',objectFit:'cover',margin:'auto'}}
        />
        }
        actions={
            [ <Link to={`/product/${slug}`} replace >
            <EyeOutlined className="text-warning" />
            <br/>View Product
            </Link>,
<div> 
<Tooltip title={tooltop}>
    

             <a onClick={handleAddToCart} disabled={quantity < 1}>
            <ShoppingCartOutlined className="text-danger" onClick={handleRemove} />
            </a>
            
            <br/> {quantity<1 ? 'out of stock': 'add to Cart'}
            </Tooltip> 
            </div>
            ]
        }
        >

        <Meta
            title={`${title}-$${price}`}
            description={`${description && description.substring(0,40)}`}
        />
        </Card>
    </div>
    
    )
}
export default ProductCard