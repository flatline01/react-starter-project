import React, { Component } from 'react';



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
            items: this.props.datasource
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
            <nav className={this.props.cssClass} >
                <Menu datasource={items} />
            </nav>
        );
        }
    }
}

class Menu extends Component{
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
            items: this.props.datasource
        });
    }
   render() {
    const { items } = this.state;
        return(
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                            {item.target
                                ? <a href={item.url} target="_blank" rel="noreferrer"> {item.label}</a>
                                : <a href={item.url}> {item.label}</a>
                            }
                            {item.nav
                                ? <Menu datasource={item.nav} />
                                : ""
                            }
                    </li>
                ))}
            </ul>
        )
    }
}

export {
    Nav,
    Menu
}