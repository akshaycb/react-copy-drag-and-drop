import React, { useState, memo } from 'react'
import ls from 'local-storage'
import staticdata from '../../staticData/data'
import RewardCard from './RewardCard'
import './CatRewardsTable.css'

const localStorageData = ls.get('data')
const finalData = localStorageData ? {...localStorageData} : {previousData: {}, currentData: staticdata}

const CatRewardTable = () => {
    const [data, setData] = useState(finalData)
    const [recentDraggedReward, setRecentDraggedReward] = useState(null)

    const moveRewards = ({e, category, reward}) => {
        setRecentDraggedReward({category: category.id, reward: reward.id})
    }

    const dropRewards = ({e, category, reward}) => {
        if(recentDraggedReward && reward.id === recentDraggedReward.reward && category.id !== recentDraggedReward.category){
            setData(prevData => {
                const previousData = JSON.parse(JSON.stringify(prevData?.currentData))
                const currentData = JSON.parse(JSON.stringify(prevData?.currentData))
                const categoriesRewardsRelation = currentData.categoriesRewardsRelation.map((currentReward)=>{                    
                    if(currentReward.id === reward.id && !currentReward.categories.includes(category.id)){
                        currentReward.categories = recentDraggedReward.category ? currentReward.categories.filter(catId => recentDraggedReward.category !== catId) : currentReward.categories
                        currentReward.categories.push(category.id)
                        return currentReward
                    }
                    return currentReward
                })
                currentData.categoriesRewardsRelation = categoriesRewardsRelation
                return {previousData, currentData}
            })
        }
    }

    const addRewards = (rewardId) => {
        setRecentDraggedReward({category: null, reward: rewardId})
    }

    const deleteReward = (categoryId, rewardId) => {
        setData(prevData => {
            const currentData = JSON.parse(JSON.stringify(prevData?.currentData))
            const previousData = JSON.parse(JSON.stringify(prevData?.currentData))
            const categoriesRewardsRelation = currentData.categoriesRewardsRelation.map((currentReward)=>{    
                if(rewardId === currentReward.id){
                    currentReward.categories = currentReward.categories.filter(catId => categoryId !== catId)
                    return currentReward
                }
                return currentReward
            })
            currentData.categoriesRewardsRelation = categoriesRewardsRelation
            return {previousData, currentData}
        })        
    }

    const undoRedo = () => {
        setData(prevData => {
            return {currentData: prevData?.previousData, previousData: prevData?.currentData}
        })
    }

    const saveToLocalStorage = () => {
        setTimeout(() => {
            ls.set('data', data)
            alert('Data Saved!')
        }, 0);
    }

    return (
        <React.Fragment>
            <div className='undoRedo'>
                <a style={{float: 'left'}} onClick={undoRedo}>Undo/Redo</a>
                <a className='save' onClick={saveToLocalStorage}>Save</a>
            </div>
            <table>
                <thead>
                    <tr>
                    <th colSpan="1">Rewards</th>
                        <th colSpan={data.currentData.categories.length}>Categories</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <th></th>{data?.currentData?.categories?.length > 0 && data.currentData.categories.map( category => <th key={category.id}>{category.title}</th>)}
                    </tr>
                    {data?.currentData?.categoriesRewardsRelation?.map((reward, index)=>{
                        return (
                            <tr key={index}>
                                <td className='tableheading' style={{cursor: 'cell'}} draggable onDragStart={() => addRewards(reward.id)}>
                                    <b> {reward.title}</b>
                                </td>
                                {data?.currentData?.categories?.length > 0 && data?.currentData?.categories?.map( category =>{
                                    return (
                                        <td 
                                            onDragStart={(e) => moveRewards({e, category, reward})}
                                            onDrop={(e) => dropRewards({e, category, reward})}
                                            onDragOver={(e) => e.preventDefault()}
                                            className='rewardsBox'
                                            key={category.id}>
                                                {reward.categories.includes(category.id) ? <RewardCard 
                                                draggable={reward.categories.includes(category.id)} 
                                                deleteReward={() => deleteReward(category.id, reward.id)} 
                                                reward={reward}/>: ''}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default memo(CatRewardTable)