import React, { Component } from "react";
import "./NavigationBar.css";
import {Link, withRouter} from "react-router-dom";

class NavigationBar extends Component {

  render() {
    return (
          <div className="navigation">
            <Link to="/dashboard" className="navigation-btn">Dashboard</Link>
            <Link to="/users" className="navigation-btn">Users List</Link>
            <Link to="/developer" className="navigation-btn">Contributor</Link>
          </div>
    )
  }
}

export default withRouter(NavigationBar)

