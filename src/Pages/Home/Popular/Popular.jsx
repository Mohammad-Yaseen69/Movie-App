import React, { useEffect, useState } from 'react'
import { Wrapper, SwitchTab, Carousel } from '../../../Components'
import '../Trending/style.scss'
import useFetch from '../../../hooks/useFetch'

const Popular = () => {
    const [endPoint, setEndPoint] = useState("movie")
    const { data, loading, error } = useFetch(`${endPoint}/popular`)


    const onTabChange = (tab) => {
        const currentEndPoint = tab.toLowerCase()
        setEndPoint(currentEndPoint === "tv shows" ? "tv" : currentEndPoint)
    }
    
   
    return (
        <div className='crouselSection'>
            <Wrapper>
                <h1 className='crouselTitle'>What's Popular</h1>
                <SwitchTab data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
            </Wrapper>
            <Carousel data={data?.results} loading={loading} type={endPoint}/>
        </div>
    )
}

export default Popular