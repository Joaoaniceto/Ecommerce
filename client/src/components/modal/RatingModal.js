import React,{useState} from 'react'
import {Modal,Button} from 'antd'

import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'
import {useHistory,useParams} from 'react-router-dom'



const RatingModal = ({children})=>{


    const {user} = useSelector(state => ({...state}))
    const [modalVisible, setmodalVisible] = useState(false)

    let history = useHistory();
    let params = useParams();

    const {slug} = params;

    console.log(slug);
    const handleModal = ()=>{
        if (user && user.token){
            setmodalVisible(true);
        } else {
            history.push({
                pathname: '/login',
                state: {
                    from: `/product/${slug}`
                }
            });
        }
    }

    return(
        <>
        <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br/> {" "}
        {user ? 'leave rating' : 'login to leave rating'}
       
        </div>
        <Modal
        title="leave your rating"
        centered
        visible={modalVisible}
        onOk={()=>setmodalVisible(false)}
        onCancel={()=>setmodalVisible(false)}
        >
{children}
        </Modal>
        </>
    );
}
export default RatingModal