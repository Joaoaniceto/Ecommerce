import axios from 'axios'



export const createProduct = async (product,authtoken) =>{
    return await axios.post(`http://localhost:8000/api/product`,product,{
       headers:{
          authtoken
       }
       })
       }

       export const getProductsbyCount = async (count) =>{
        return await axios.get(`http://localhost:8000/api/products/${count}`)
           }       



export const removeProduct = async (slug,authtoken) =>{
    return await axios.delete(`http://localhost:8000/api/product/${slug}`,{
       headers:{
          authtoken
       }
       })
       }

export const readProduct = async (slug) =>{
    return await axios.get(`http://localhost:8000/api/product/${slug}`)
       }


export const updateProduct = async (slug,data,authtoken) =>{
    return await axios.put(`http://localhost:8000/api/product/${slug}`,data,{
       headers:{
          authtoken
       }
    })
       }

       export const getProducts = async (sort,order,limit) =>{
         return await axios.post(`http://localhost:8000/api/products`,{sort,order,limit})
            }
     