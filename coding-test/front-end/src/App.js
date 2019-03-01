import React, { Component } from "react"
import { Route, HashRouter } from 'react-router-dom'
import UserList from "./components/UserList"
import UserProfile from './components/UserProfile'


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App"> 
          <Route exact path="/" component={UserList} />
          <Route path="/user/:id" component={UserProfile} userId = "1" />
        </div> 
      </HashRouter>
    )
  }
}

export default App
