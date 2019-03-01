import React, { Component } from 'react'
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {userData: []};
  }

  

  render() {
    
    return (
      <div className="DashBoardMain">
        <div className="header">
          Dashboard
        </div>
      </div>
    )
  }
}

export default DashBoard
