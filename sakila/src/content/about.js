import React, { Component } from 'react';


class AboutUs  extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    render(){
        return(
            <section>
                <div className="container">
                    <h1>About us</h1>
                    <p>this is from the content component.</p>
                </div>
            </section>
        )
    }
}

export{
 AboutUs
}