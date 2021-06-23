import React, { Component } from 'react';
import "./datagrid.css"

class Datagrid  extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

    componentDidMount() {
        fetch(this.props.endpoint)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.result
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


    render() {
        const { error, isLoaded, items } = this.state;
        console.log(items)
        if (error) {
            return <section><div className="container  datagridholder"><div className="datagrid error">Error: {error.message}</div></div></section>;
        } 
        else if (!isLoaded) {
            return <section><div className="container  datagridholder"><div className="datagrid loading">loading....</div></div></section>;
        } 
        else{
            return(
                <section>
                    <div className="container">
                        <h1>Sakila Actors</h1>
                        <p>Loaded from the default MySql Database</p>
                        <p>This should be rewritten for more generic item handling.</p>
                        <div className="datagridholder">
                            <div className="filter"></div>
                            <div className="datagrid loaded">
                                {items.map(item => (
                                    <div className="card" key={item.actor_id}>
                                        <a href="/actors/byId">
                                            <h3>{item.first_name.toLowerCase()} {item.last_name.toLowerCase()}</h3>
                                        </a>
                                        <h4>Address</h4>
                                        <a href="/address">
                                            <address>
                                                <span>{item.address}</span>
                                                <span>{item.city}</span>
                                                <span>{item.district}, {item.postal_code}</span>
                                            </address>
                                        </a>
                                        {item.phone
                                            ? <a href={`tel:${item.phone}`}>call</a>
                                            : ""
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }

}


export {
    Datagrid
}