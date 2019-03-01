import React, { Component } from "react"
import UserList from "./components/UserList"

class App extends Component {
  render() {
    return (
      <div className="App"> 
        App Component
        <UserList />
      </div> 
    )
  }
}

export default App
