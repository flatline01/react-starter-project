import React, { Component } from 'react';
import { Nav }from "../../components/nav";
import navSource from '../../data/footerlinks.json';


class Footer extends Component {
    render() {
      return (
        <footer>
            <div className="container">
                {this.props.children}
                <Nav cssclass="footernav" datasource={navSource.nav} />
            </div>
        </footer>
      );
    }
  }

export default Footer;