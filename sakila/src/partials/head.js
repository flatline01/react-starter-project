import React, { Component } from 'react';

class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadesc:"",
            title:"",
        };
    }
    componentDidMount() {
        this.setState({
            isLoaded: true,
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
                <head id="head">
                    <meta charset="utf-8" />
                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="stylesheet" href="/stylesheets/style.min.css" />
                    <meta
                    name="description"
                    content={this.props.metadesc}  />
                    <title>{this.props.title}</title>
                </head>
            );
        }
    }
}

export {
    Head
}