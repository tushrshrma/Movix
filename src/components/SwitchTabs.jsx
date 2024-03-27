import React, { useState } from 'react'
import './SwitchTabs.scss'

const SwitchTabs = ({ data , onTabChange}) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const setActiveTab = (index) => {
          setSelectedTab(index)
          setLeft(index * 100)
          onTabChange(index)
    }

  return (
    <div className="switchingTabs">
        <div className="tabItems">
          {
            data.map((tab , index) => {
               return <span key={index} onClick={() => setActiveTab(index)} className={`tabItem ${selectedTab === index ? "active" : ""}`}>{tab}</span>
            })
          }
          <span style={{left:left}} className="movingBg"></span>
        </div>
    </div>
  )
}

export default SwitchTabs