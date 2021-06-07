import React, { Component } from 'react';
import Nav from "../../components/nav";
import navSource from '../../data/footerlinks.json';


class Footer extends Component {
    render() {
      return (
        <footer>
            <div class="container">
                {this.props.children}
                <Nav cssClass="footernav" datasource={navSource.nav} />
            </div>
        </footer>
      );
    }
  }

export default Footer;