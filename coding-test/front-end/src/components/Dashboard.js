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
          return(<div className="nameList-element" key={`nameList ${index}`}>{el[0]} </div>);
      })
    }
    console.log(names)

    let nameList = <div className="nameList">{names}</div>

      return (
        <div className="dashBoard-container">
          <table className="aggregate-table">
            <caption className="aggregate-header">Aggregate Information</caption>
            <tbody className="aggregate-body">
              <tr className="aggregate-row">
                <td className="aggregate-cell">Total Count:</td>
                <td>{count}</td> 
              </tr>
              <tr className="aggregate-row">
                <td className="aggregate-cell">Average Age:</td>
                <td>{averageAge}</td> 
              </tr>
              <tr className="aggregate-row">
                <td className="aggregate-cell">Median Age:</td>
                <td>{medianAge}</td> 
              </tr>
              <tr className="aggregate-row">
                <td className="aggregate-cell">Top Five Names:</td>
                <td>
                    {nameList}
                </td> 
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