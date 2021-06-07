import React, { Component } from 'react';
import myData from '../data/headerlinks.json';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        this.setState({
            isLoaded: true,
            items: myData.nav
        });
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else {
        return (
            <nav class={this.props.cssClass} >
                <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <a href={item.url}> {item.label}</a>
                    </li>
                ))}
                </ul>
            </nav>
        );
        }
    }
  }

export default Nav;