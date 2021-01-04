import React,{useState,useEffect} from 'react'
import ModalImage from 'react-modal-image'
import laptop from '../../images/laptop.png'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {CheckCircleOutlined,CloseCircleOutlined,CloseOutlined} from '@ant-design/icons'



const ProductCardInCheckout = ({p})=>{

    

    const colors = ['Black','Brown','Silver','White','Blue'];
    const [color, setcolor] = useState(p.color);
    const dispatch = useDispatch();

const handleChangeColor =(e)=>{
    let cart = [];
if(typeof window !== undefined){
   if(localStorage.getItem('cart')){
       cart = JSON.parse(localStorage.getItem('cart'))
   }
   

   cart.map((c,i) => {
       if (c._id === p._id){
         cart[i].color = e.target.value;
       } 
});

localStorage.setItem('cart',JSON.stringify(cart));
dispatch({
    type:'ADD_TO_CART',
    payload: cart
})
setcolor(e.target.value)
}

}

const handleQuantity = (e)=>{

    let count = e.target.value<1 ? 1 : e.target.value;
console.log(e.quantity);

    if(count>p.quantity){
        toast.error(`max available quantity: ${e.quantity}`);
        return;
    }

    let cart = [];
    if(typeof window !== undefined){
       if(localStorage.getItem('cart')){
           cart = JSON.parse(localStorage.getItem('cart'))
       }
       
    
       cart.map((c,i) => {
           if (c._id === p._id){
             cart[i].count = count;
           } 
    });
    
    localStorage.setItem('cart',JSON.stringify(cart));
    dispatch({
        type:'ADD_TO_CART',
        payload: cart
    })
    }
    
}

const handleremove = ()=>{
    let cart = []


    if (typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }

       cart.map((pro,i)=>{
           if(pro._id === p._id){
              cart.splice(i,1)
           }
       })
       console.log(cart);

    localStorage.setItem('cart',JSON.stringify(cart))
    dispatch({
        type:'ADD_TO_CART',
        payload:cart
    })

    }
}

return(
    <tbody className="">
          <tr>
                  <td>
                  <div style={{width:"150px",height:"auto"}}>
                  {p.images.length ?
                   (<ModalImage large={p.images.url} small={p.images[0].url} />)
                    :
                   (<ModalImage large={laptop} small={laptop} />)}
                  </div>

                  </td>
                  <td>{p.title}</td>
                  <td>{p.price}</td>
                  <td>{p.brand}</td>
                  <td className="text-center">
                  <input type="number"
                   className="form-control"
                   value={p.count}
                   onChange={handleQuantity} >

                  </input></td>
                  <td>
                      <select name="color" onChange={handleChangeColor} className="form-control">
                          {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                          {colors
                          .filter((c)=> c !== p.color)
                          .map((c)=><option key={c}>{c}</option>)}
                      </select>
                  </td>
                  <td>{p.shiping === 'Yes' ? ( <CheckCircleOutlined className="text-sucesse" />) : (<CloseCircleOutlined className="text-danger" />)}</td>
                  <td><CloseOutlined onClick={handleremove} className="text-danger pointer" /></td>
              
          </tr>
    </tbody>
)
}


export default ProductCardInCheckout;