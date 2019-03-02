import React, { Component } from 'react'
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/dashboard')
      .then(response => response.json())
      .then(data => {
        this.setState(data)
      });
  }

  

  render() {
    let statistics = this.state;
    if (statistics){  
      const {count, averageAge, medianAge, topFiveName} = this.state;
      return (
        <div className="dashBoardContainer">

          <div className="headerbar-container">
            <div className="header-btn">
              Dashboard-flex
            </div>
            <div className="header-btn">
              User List-flex
            </div>
            <div className="header-btn">
              Contributor-flex
            </div>
          </div>

          <div className="dashBoard-Detail-container">
            <div className="dashBoard-Detail">
              Total Count: {count}
            </div>
            <div className="dashBoard-Detail">
              Average Age: {averageAge}            
            </div>
            <div className="dashBoard-Detail">
              Median Age: {medianAge}
            </div>
            <div className="dashBoard-Detail">
              Top Five Most Common First Names: {topFiveName}   
            </div>
          </div>
        </div>
      )
  }
  }
}

export default DashBoard

// TODO top five popular name , count information