import React, { Component } from 'react';


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
        <div className="userDetailMain">
          <p>This is the detailed information for {first_name} {last_name}.</p> 
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
        </div>
      )
    }else{
      return <div>nothing</div>
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
