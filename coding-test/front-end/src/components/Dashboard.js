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
    let names;
    if (statistics){  
      const {count, averageAge, medianAge, topFiveName} = this.state;
      if (topFiveName){
        names = topFiveName.map(function (el, index) {
          return(<span className="nameList-element" key={`nameList ${index}`}>{el[0]} </span>);
      })
    }

    let nameList = <div className="nameList">{names}</div>

      return (
        <div className="dashBoard-container">
          <table className="aggregate-table">
            <caption>Aggregate Information</caption>
            <tbody>
              <tr>
                <td>Total Count:</td>
                <td>{count}</td> 
              </tr>
              <tr>
                <td>Average Age</td>
                <td>{averageAge}</td> 
              </tr>
              <tr>
                <td>Median Age:</td>
                <td>{medianAge}</td> 
              </tr>
            </tbody>
          </table>

          {/*
          <div className="dashBoardDetail-container">
            <div className="dashBoardDetail-col">
              <div className="dashBoardDetail">
                Total Count: {count}
              </div>
              <div className="dashBoardDetail">
                Average Age: {averageAge}            
              </div>
              <div className="dashBoardDetail">
                Median Age: {medianAge}
              </div>
            </div>
            <div className="dashBoardDetail-col">
              Top 5 Most Common First Name 
              <br/>
              (Alphabetically):
              <div className="dashBoardDetail">
                {nameList}
              </div>
            </div>
          </div> */}
        </div>
      )
    }
  }
}

export default DashBoard

// TODO top five popular name , count information