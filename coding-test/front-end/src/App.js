import React, { Component } from "react"
import { Route, BrowserRouter } from "react-router-dom"
import {Switch} from "react-router"
import UserList from "./components/UserList"
import UserProfile from "./components/UserProfile"
import Dashboard from "./components/Dashboard"
import NavigationBar from "./components/NavigationBar"
import Developer from "./components/Contributor"
import "./App.css"


class App extends Component {

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App
