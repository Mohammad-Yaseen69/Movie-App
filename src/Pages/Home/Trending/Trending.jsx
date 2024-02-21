import React, { useEffect, useState } from 'react'
import { Wrapper, SwitchTab } from '../../../Components'
import './style.scss'
import useFetch from '../../../hooks/useFetch'

const Trending = () => {
    const [endPoint, setEndPoint] = useState("day")
    const { data, loading, error } = useFetch(`trending/all/${endPoint}`)


    const onTabChange = (tab) => {
        const currentEndPoint = tab.toLowerCase()
        setEndPoint(currentEndPoint)
    }




    return (
        <div className='crouselSection'>
            <Wrapper>
                <h1 className='crouselTitle'>Trending</h1>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </Wrapper>
        </div>
    )
}

export default Trending