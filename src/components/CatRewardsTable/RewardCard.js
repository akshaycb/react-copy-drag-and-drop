import React from 'react'
import './RewardCard.css'

const RewardCard = ({reward, deleteReward, draggable}) => {
    return (
        <div className="coupon" draggable={draggable}>
            <div onClick={deleteReward} className="remove">&times;</div>
            <div className="container" style={{backgroundColor:'white'}}>
                <h4><b>{reward.title}</b></h4>
                <p>Description: {reward.description}</p>
            </div>
        </div>
    )
}

export default RewardCard