import React, { Component } from 'react';


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {userData: []};
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data })
      });
  }

  render() {
    let {userData} = this.state;
    let userMap;
    
    if (userData){
      userMap = <ul className="userListMain">
      {userData.map((user, i) => (
        <li key={`user-${i}`}> 
          <span> {user.first_name} </span>
          <span> {user.last_name} </span>
        </li>
      ))}
    </ul>
    }else{
      return
    }
    
    return (
      <div className="todoListMain">
        <div className="header">
          {userMap}
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