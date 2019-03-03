import React, { Component } from "react"
import './Contributor.css'

class Developer extends Component {


  render() {
    return (
      <div className="developer-container">
        <div className='developerDetail-container'>
        <div className='developer-header'>
          Hui Li
        </div>
        </div>
        <div className="developerDetail-container">
          <div className="developerDetail">
            Name: Hui Li
          </div>
          <div className="developerDetail">
            Email: vivian.li.uibe@gmail.com            
          </div>
        </div>
      </div>
    )
  }
}

export default Developer

