import React from 'react'
import { useSelector } from 'react-redux'
import './style.scss'

const Genres = ({ data }) => {
    const { genres } = useSelector(state => state.homeSlice)
    const updatedData = data.slice(0, 2)
    return (
        <div className='genres'>
            {updatedData.map(id => (
                <span key={id} className='genre'>
                    {genres[id]}
                </span>
            ))}
        </div>
    )
}

export default Genres