import React, { Component } from "react"
import { Route, HashRouter } from 'react-router-dom'
import {Switch} from 'react-router'
import UserList from "./components/UserList"
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import NavigationBar from "./components/NavigationBar"
import Developer from "./components/Contributor"
import './App.css'

// api npm run watch
// frontend npm run start

class App extends Component {
  // Current Logic, exact users/ to userlist, exact user/:id to userprofile, other path go to current mainpage(dashboard)
  render() {
    return (
      <HashRouter>
        <div className="app"> 
          <NavigationBar/>
          <Switch>
            <Route exact path="/users" component={UserList}/>
            <Route exact path="/user/:id" component={UserProfile}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/developer" component={Developer}/>
          </Switch>
        </div> 
      </HashRouter>
    )
  }
}

export default App

//TODO when other path doesn't fit come to dashboard
