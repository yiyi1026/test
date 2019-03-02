import React, { Component } from "react";
import { Route, HashRouter } from 'react-router-dom';
import UserList from "./components/UserList";
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';

// api npm run watch
// frontend npm run start

class App extends Component {
  // Current Logic, exact users/ to userlist, exact user/:id to userprofile, other path go to current mainpage(dashboard)
  render() {
    return (
      <HashRouter>
        <div className="App"> 
          <Route exact path="/users" component={UserList} />
          <Route exact path="/user/:id" component={UserProfile} userId = "1" />
          <Route path="/" component={Dashboard}  />
        </div> 
      </HashRouter>
    )
  }
}

export default App
