import React from 'react'

const InfoItem = ({ data, text, method }) => {
    return (
        <div>
            {(data) && (
                <span className="infoItem">
                    <span className="text bold">{text} : {""}</span>
                    <span className="text">
                        {method ? method(data) : data}
                    </span>
                </span>
            )}
        </div>
    )
}

export default InfoItem