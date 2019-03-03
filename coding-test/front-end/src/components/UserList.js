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
    // let userMap;
    let columns
    
    if (userData){
      // userMap = <ul className="userListMain">
      // {userData.map((user, i) => (
      //   <li key={`user-${i}`}> 

      //     <span> {user.id} </span>
      //     <span> {user.first_name} </span>
      //     <span> {user.last_name} </span>
      //     <span> {user.email} </span>
      //     <span> {user.age} </span>
      //   </li>
      //     ))}
      //   </ul>

      columns = [
        {
          Header: 'ID',
          accessor: 'id',
          width: 100
        }, {
          Header: 'First Name',
          accessor: 'first_name',
          width: 200
        }, {
          Header: 'Last Name',
          accessor: 'last_name',
          width: 200
        }, {
          Header: 'Email',
          accessor: 'email',
          width: 400
        }, {
          Header: 'Age',
          accessor: 'age',
          width: 100
        }
      ]
    }else{
      return
    }
    
    return (
      <div className="userListContainer">
        <div>
          <input 
            placeholder='type name to search'
            value={this.state.searchValue}
            onChange={this.updateSearchValue}
          ></input>
        </div>
        <div style={{width:"1000px"}}>
          {/* <div className="header">
            {userMap}
          </div> */}
          <ReactTable
            data={userData}
            columns={columns}
            // filterable
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
                console.log(rowInfo)
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

// sample state shape:
//   {users:[
//     {
//       'id': 1,
//       'first_name': 'Jane',
//       'last_name': 'Doe',
//       'email': 'JaneDoe@gmail.com',
//       'age': 38
//     }
//   ]
// }

// TODO 1. add spinner
// TODO 2. put inline-style to separate css file