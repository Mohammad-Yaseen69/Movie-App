import React, { useEffect, useState } from 'react'
import { Wrapper, SwitchTab, Carousel } from '../../../Components'
import '../Trending/style.scss'
import useFetch from '../../../hooks/useFetch'

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie")
    const { data, loading, error } = useFetch(`${endPoint}/top_rated`)


    const onTabChange = (tab) => {
        const currentEndPoint = tab.toLowerCase()
        setEndPoint(currentEndPoint === "tv shows" ? "tv" : currentEndPoint)
    }
    
    console.log(data);
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

export default TopRated