import React, { Component } from 'react';
import './Dashboard.css';

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
      let names;
      if (topFiveName){
      names = topFiveName.map(function (el) {
        return el[0];
      })
    }
      return (
        <div className="navigation-menu">

          <div className="navigation-container">
            <div className="navigation-btn">
              Dashboard-flex
            </div>
            <div className="navigation-btn">
              User List-flex
            </div>
            <div className="navigation-btn">
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
              Top Five Most Common First Names: {names}   
              {/*  */}
            </div>
          </div>
        </div>
      )
  }
  }
}

export default DashBoard

// TODO top five popular name , count information