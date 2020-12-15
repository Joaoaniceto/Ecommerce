import React from 'react'
import {Card,Skeleton} from 'antd';

const LoadingCard = ({count})=> {

const cards = () =>{
    let totalCards = [];

    for(let i = 0;i<count;i++){
        totalCards.push(
            <Card className="col md-4">
                <Skeleton active></Skeleton>
            </Card>
        )
    }
    return totalCards;
}

return <div className="row pb-5">{cards().map((elem)=>elem)}</div>
}

export default LoadingCard