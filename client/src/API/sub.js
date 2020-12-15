import axios from 'axios'



export const getSubs = async () =>{
return await axios.get('http://localhost:8000/api/subs')
}

export const getSub = async (slug) =>{
    return await axios.get(`http://localhost:8000/api/sub/${slug}`,)
    }

export const removeSub = async (slug,authtoken) =>{
    return await axios.delete(`http://localhost:8000/api/Sub/${slug}`,{
    headers:{
       authtoken
    }
    })
}

export const updateSub = async (slug,Sub,authtoken) =>{
 return await axios.put(`http://localhost:8000/api/Sub/${slug}`,Sub,{
    headers:{
       authtoken
    }
    })
}


export const createSub = async (Sub,authtoken) =>{
        return await axios.post(`http://localhost:8000/api/Sub`,Sub,{
           headers:{
              authtoken
           }
           })
           }