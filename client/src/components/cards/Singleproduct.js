import React,{useState} from 'react'
import {Card,Descriptions,Tabs,Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import{HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png'
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
import RatingModal from '../../components/modal/RatingModal'
import {showAverage} from '../../API/rating'
import _, { uniq } from 'lodash'
import{useDispatch,useSelector} from 'react-redux'
import {addtowishlist} from '../../API/user'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

const {TabPane} = Tabs;

const Singleproduct = ({product,onStarClick,star})=>{



 
const{title,images,description,subs,_id} = product;
const [tooltop, settooltop] = useState('Click to add')

const {user,cart} = useSelector(state=>({...state})) 
const dispatch = useDispatch()

const handleAddToCart = ()=>{
    let cart=[];
    if(typeof window !== 'undefined'){   
        // if 
        if(localStorage.getItem('cart')){
            cart =JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count:1
        });

        let unique = _.uniqWith(cart, _.isEqual);
        localStorage.setItem('cart',JSON.stringify(unique))
    settooltop('added')


    dispatch({
        type:'ADD_TO_CART',
        payload: unique
    })
    }
    dispatch({
        type:'SET_VISIBLE',
        payload: true
    })

}

const handleaddtowishlist =(e)=>{
        e.preventDefault();
        addtowishlist(product._id,user.token).then(res=>{
            history.push('/user/wishlist')
            toast.success('added to wishlist')
        
        })
        
}

let history=useHistory();

    return(
        <>
        
        <div className="col-md-7">
        <Carousel>
        {images &&images.length ? images.map((elem)=>(
        
                    <img src={elem.url} key={elem.public_id} alt="img" />
                    
        )) : <img src={laptop} key={'id'} alt="img" />}
            </Carousel>



            <Tabs type="card">
              <TabPane tab="Description" key="1">
                      {description && description}
              </TabPane>

              <TabPane tab="Description" key="2">
                      Call use on xxxx xxx xxx to learn more about this product
              </TabPane>
            </Tabs>
        </div>





        <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

{product && product.ratings && product.ratings.length>0 ? 
showAverage(product) : <div className="text-center pt-1 pb-3">No rating yet</div>}

<Card actions={
    [<> <Tooltip title={tooltop}>
    

    <a onClick={handleAddToCart}> 
    <ShoppingCartOutlined className="text-sucess" /><br/> Add to cart
    </a>
    </Tooltip> 
    </>
    ,
    <a  onClick={handleaddtowishlist}>
    <HeartOutlined className="text-info"  /><br/>
   Add to wishlist
    </a>,<RatingModal>
        <StarRating
            name={_id}
            numberOfStars={5}
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="red"
        />


</RatingModal> ]
}>

<ProductListItem product={product} subs={subs} />


</Card>

        </div>
        </>
    )
}

export default Singleproduct