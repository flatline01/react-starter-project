import React, { Component } from 'react';
import Nav from "../../components/nav";

class Footer extends Component {
    render() {
      return (
        <footer>
            <div class="container">
                <p>this is the footer</p>
                <Nav cssClass="footernav"/>
            </div>
        </footer>
      );
    }
  }

export default Footer;