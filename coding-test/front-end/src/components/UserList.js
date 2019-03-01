import React, { Component } from 'react'
import UserDetail from './UserDetail';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
    
  }

  render() {
    // user = {'id': 1,'first_name': 'Jane','last_name': 'Doe',
    // 'email': 'JaneDoe@gmail.com',
    // 'age': 38}
    return (
      <div className="todoListMain">
        <div className="header">
          UserList
          {/* <UserDetail user = {user}/> */}
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