import React, { Component } from 'react';


class ById  extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          numOfActors:"",
          actorID:this.props.match.params.id
        };
    }
    componentDidMount() {
       
            fetch(`/api/getById/${this.state.actorID}`)
            .then(res => res.json())
            .then(
                (result) => {
                document.title = `${result.result[0].first_name} ${result.result[0].last_name} | Sakila React Project`  ;
                document.querySelector('meta[name="description"]').setAttribute("content", `${result.result[0].first_name} ${result.result[0].last_name} is an acotr found in the sakila database`);
                document.querySelector('meta[name="og:desc"]').setAttribute("content", `${result.result[0].first_name} ${result.result[0].last_name} is an acotr found in the sakila database`);

                this.setState({
                    isLoaded: true,
                    items: result.result,
                    numOfActors:result.numOfActors
                });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        
    }
    render(){
        const { error, isLoaded, items } = this.state;
        return(
            <section id={`actor_${this.state.actorID}`}>
                <div className="container">
                    {items.map(item => (
                            <div className="actor" key={item.id}>
                                <h1>Actor: {item.first_name} {item.last_name}</h1>
                                <p>Number {this.state.actorID} of {this.state.numOfActors}</p>
                            </div>
                      ))}
                </div>
            </section>
        )
    }
}

export{
 ById
}