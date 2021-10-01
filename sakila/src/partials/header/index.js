import React, { Component } from 'react';
import { Nav, LoginButton }from "../../components/nav";
import navSource from '../../data/headerlinks.json';

class Header extends Component {
  render() {
    return (
      <header>
          <div className="container">
              <a href="/" cssclass="logo">Home</a>
              <Nav cssClass="topnav" datasource={navSource.nav}/>
              <LoginButton/>
          </div>
      </header>
    );
  }
}

export default Header;
