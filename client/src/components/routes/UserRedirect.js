import React,{useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom'



const LoadingToRedirect = () =>{
    const [count,setCount] = useState(5);


    let history = useHistory();




    useEffect(() => {
        const interval = setInterval(() => {
           setCount(count-1);  
        },1000);
     count === 0 && history.push('/')

     return ()=> clearInterval(interval);
       
    }, [count])

    return (
    <div className="container p-5 text-center">
        <h3>Redirecting in {count}</h3>
    </div>
    )
}

export default LoadingToRedirect
