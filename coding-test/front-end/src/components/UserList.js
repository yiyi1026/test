import React, { Component } from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import "./UserList.css"
import { GridLoader } from "react-spinners";

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      userData: [],
      searchValue: "",
      filtered: []
    }
    this.updateSearchValue  = this.updateSearchValue.bind(this)
  }

  updateSearchValue(e) {
    this.setState({
      searchValue: e.target.value,
      filtered: [{
        id: "first_name",
        value: e.target.value
      }]
    })
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/users")
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data,
                        isLoading: false })
      })
  }

  render() {
    if (this.state.isLoading){
      return(
        <div className="userList-container">
          <div className= "userNameSearch-container padding">
            <GridLoader
            size={20}
            sizeUnit={"px"}
            color={"#00504d"}
            />
          </div>
        </div>
      )
    }
    let {userData} = this.state
    let columns = [
        {
          Header: "ID",
          accessor: "id",
          width: 50
        }, {
          Header: "First Name",
          accessor: "first_name",
          width: 150
        }, {
          Header: "Last Name",
          accessor: "last_name",
          width: 150
        }, {
          Header: "Email",
          accessor: "email",
          width: 300
        }, {
          Header: "Age",
          accessor: "age",
          width: 50
        }
      ]
    
    return (
      <div className="userList-container">
        <div className= "userNameSearch-container">
          <span className= "userNameSearch">Filter by name:</span>
          <input className="userNameSearch"
            placeholder="Type name to search"
            value={this.state.searchValue}
            onChange={this.updateSearchValue}
          ></input>
        </div>
        <div className="usersTable-container">
          <ReactTable
            data={userData}
            columns={columns}
            filtered={this.state.filtered}
            defaultFilterMethod={(filter, row) =>{
                const f = filter.value.toLowerCase()
                return (
                    String(row.first_name).toLowerCase().startsWith(f)
                    ||
                    String(row.last_name).toLowerCase().startsWith(f)
                  )
              }
            }
            getTrProps={(state, rowInfo, column, instance) => ({
              onClick: e => {
                this.props.history.push("user/"+ rowInfo.row.id)
              }
            })}
            defaultPageSize={50}
            className="-striped -highlight"
            width="1000"
          />
        </div>
      </div>
    )
  }
}

export default UserList

// TODO 1. add spinner
