import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Avatar,Badge, } from 'antd'


const FileUpload = ({values,setValues,setloading})=>{

const { user } =  useSelector(state => ({...state}))




const handleDelete = (id)=>{
 
    setloading(true);
    axios.post(`http://localhost:8000/api/removeimage`,{public_id:id},{
        headers:{
            authtoken:user ? user.token : ''
        }
    }).then(
        (res)=>{
           setloading(false)
           const {images} = values;
           let filterimages = images.filter((item)=> item.public_id !== id);
           setValues({...values,images:filterimages})
        }
    ).catch((err)=>{
        setloading(false)
        console.log(err)
    })
}



    const handleimage =(e)=>{

    let file = e.target.files;
    let alluploadedfiles = values.images;
    if (file) {
        setloading(true);
        for(let i = 0;i<(file.length);i++){
            Resizer.imageFileResizer(
                file[i],
                720,
                720,
                'JPEG',
                100,
                0,
                (url)=>{
                   axios.post(`http://localhost:8000/api/uploadimage`,{image: url},{
                       headers:{
                           authtoken:user ? user.token : ''
                       }
                   })
                   .then((res)=>{
                       setloading(false);
                       alluploadedfiles.push(res.data)
                       setValues({...values,images:alluploadedfiles})
                    })
                   .catch((err)=>{
                       setloading(false)
                       console.log(err)
                    })
                },
                'base64'
            );
        }
    }
    }

    return(
        
        <>
        <div className='row'>
        {values.images && values.images.map((img)=>(
            <Badge  key={img.public_id} onClick={()=>handleDelete(img.public_id)} count="X">
            <Avatar src={img.url} shape="square" size={100} className="ml-3" />
            </Badge>
        ))}
        </div>
<div className='row'>
<label className="btn btn-primary btn-raised">Choose File
<input type="file" multiple hidden accept="images/*" onChange={handleimage}></input>
</label>
</div>
</>
    )
}

export default FileUpload