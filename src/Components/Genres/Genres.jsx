import React from 'react'
import { useSelector } from 'react-redux'
import './style.scss'

const Genres = ({ data }) => {
    const { genres } = useSelector(state => state.homeSlice)

    return (
        <div className='genres'>
            {data.map(id => (
                <span key={id} className='genre'>
                    {genres[id]}
                </span>
            ))}
        </div>
    )
}

export default Genres