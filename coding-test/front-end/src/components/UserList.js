import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './UserList.css'


class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      searchValue: '',
      filtered: []
    }
    this.updateSearchValue  = this.updateSearchValue.bind(this)
  }

  updateSearchValue(e) {
    this.setState({
      searchValue: e.target.value,
      filtered: [{
        id: 'first_name',
        value: e.target.value
      }]
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data })
      })
  }

  render() {
    let {userData} = this.state
    let columns
    
    if (userData){
      columns = [
        {
          Header: 'ID',
          accessor: 'id',
          width: 50
        }, {
          Header: 'First Name',
          accessor: 'first_name',
          width: 150
        }, {
          Header: 'Last Name',
          accessor: 'last_name',
          width: 150
        }, {
          Header: 'Email',
          accessor: 'email',
          width: 300
        }, {
          Header: 'Age',
          accessor: 'age',
          width: 50
        }
      ]
    }else{
      return
    }
    
    return (
      <div className="userListContainer">
        <div className= "userNameSearchContainer">
          <span className= "userNameSearch">Filter by name:</span>
          <input className="userNameSearch"
            placeholder='Type name to search'
            value={this.state.searchValue}
            onChange={this.updateSearchValue}
          ></input>
        </div>
        <div className="usersTableContainer">
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
// TODO 2. put inline-style to separate css file