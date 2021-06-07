import React, { Component } from 'react';
import Nav from "../../components/nav";



class Header extends Component {
    render() {
      return (
        <header>
            <div class="container">
                <a href="/" cssClass="logo">Home</a>
                <Nav cssClass="topnav"/>
            </div>
        </header>
      );
    }
  }

export default Header;