import React, { Component } from 'react'
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'age': ''
    };

  }

  render() {
    return (
      <div className="userDetailMain">
        <ul>
          {/* <li>{this.state.first_name}</li> */}
          <li>UserDetail</li>
          </ul>
      </div>
    )
  }
}

export default UserDetail

// sample state shape:
// {
//   'id': 1,
//   'first_name': 'Jane',
//   'last_name': 'Doe',
//   'email': 'JaneDoe@gmail.com',
//   'age': 38
// }
