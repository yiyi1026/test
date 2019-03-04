import React, { Component } from "react"
import { GridLoader } from "react-spinners"
import "./Dashboard.css"


class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/dashboard")
      .then(response => response.json())
      .then(data => (this.setState({data, isLoading: false})));
  }

  render() {
    if (this.state.isLoading){
      return (
        <div className="loader">
          <GridLoader
            size={20}
            sizeUnit={"px"}
            color={"#00504d"}
          />
        </div>
      );
    }
      
    let names;
    const {count, averageAge, medianAge, topFiveName} = this.state.data;
    
    if (topFiveName){
      names = topFiveName.map( (el, index) => (
        (<div className="nameList-element" key={`nameList ${index}`}>{el[0]} </div>)
        ));
    }

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
              <td>{nameList}</td> 
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DashBoard