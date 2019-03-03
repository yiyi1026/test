import React, { Component } from 'react';
import './UserProfile.css'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {'id': "",'first_name': "", "last_name": "", "email": "", "age": ""};
    this.toggleDetail = false;
  }

  // double refresh to reload

  componentDidMount() {
    let id = this.props.match.params.id;
    // console.log(this.props);
    fetch(`http://localhost:3001/api/user/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState(data)
      });
  }

  componentDidUpdate(prevProps) {
    let id = this.props.match.params.id
    if (prevProps.match.params.id !== id) {
      fetch(`http://localhost:3001/api/user/${id}`)
        .then(response => response.json())
        .then(data => {
          this.setState(data)
        });
    }
  }

  render() {
    let user = this.state;
    if (user){
      let {first_name, last_name, email, age} = user;
      return (
        <div className="user-container">
          <div className="userDetail-container">
            <div className='user-header'>
              {first_name +" "+ last_name}
            </div>
            <div className="userDetail-container">
              <div className="userDetail">
                First Name: {first_name}
              </div>
              <div className="userDetail">
                Last Name: {last_name}
              </div>
              <div className="userDetail">
                Age : {age}            
              </div>
              <div className="userDetail">
                Email: {email}           
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return <div></div>
    }
  }
}

export default UserProfile

// sample state shape:
// {
//   'id': 1,
//   'first_name': 'Jane',
//   'last_name': 'Doe',
//   'email': 'JaneDoe@gmail.com',
//   'age': 38
// }


// front-end npm run start
// api npm run watch
