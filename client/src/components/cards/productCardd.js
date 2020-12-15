import React from 'react'
import {Card,Skeleton} from 'antd';
import {EyeOutlined,DeleteOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import laptop from '../../images/laptop.png'




const ProductCard = ({products})=>{



    const {Meta} = Card;
   const {images,slug,description,title} = products;



     const handleRemove = ()=>{
       
     }

    return(

        <Card
        cover={<img 
        src={images && images.length ? images[0].url : laptop} 
        className="p-1"
        style={{height:'300px',objectFit:'cover',margin:'auto'}}
        />
        }
        actions={
            [ <Link to={`admin/product/${slug}`} >
            <EyeOutlined className="text-warning" />
            <br/>View Product
            </Link>,
<div>
            <ShoppingCartOutlined className="text-danger" onClick={handleRemove} />
            <br/> Add to Card 
            </div>
            ]
        }
        >

        <Meta
            title={title}
            description={`${description && description.substring(0,40)}`}
        />
        </Card>
    
    
    )
}
export default ProductCard