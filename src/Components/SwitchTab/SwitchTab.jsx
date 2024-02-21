import React, { useState } from 'react'
import { Wrapper } from '../'
import './style.scss'

const SwitchTab = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const tabSwitch = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab)
    }

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {
                    data.map((tab, index) => (
                        <span
                            key={index}
                            className={`tabItem ${selectedTab === index ? "active" : ""}`}
                            onClick={() => tabSwitch(tab, index)}
                        >
                            {tab}
                        </span>
                    ))
                }
                <div className="movingBg" style={{left}}></div>
            </div>
        </div>
    )
}

export default SwitchTab