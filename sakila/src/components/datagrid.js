import React, { Component, useState, useEffect } from 'react';
import { SelectFilter } from './selectfilter';
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
        //console.log(items)
        if (error) {
            return <section><div className="container error datagridholder"><div className="datagrid error">Error: {error.message}</div></div></section>;
        } 
        else if (!isLoaded) {
            return <section><div className="container loading datagridholder"><div className="datagrid loading">loading....</div></div></section>;
        } 
        else{
            return(
                <section>
                    <div className="container">
                        {this.props.children}
                        <div className="datagridholder">
                            <div className="filter">
                                <h3>Filters</h3>
                                <SelectFilter id="countries" keyvalue="country_id,country" endpoint="/api/" query="countries" title="Countries"></SelectFilter>
                                
                            </div>
                            <div className="datagrid loaded">
                                {items.map(item => (
                                    <div className="card" key={item.actor_id}>
                                        <a href={`/actors/byId/${item.actor_id}`}>
                                            <h3>{item.first_name.toLowerCase()} {item.last_name.toLowerCase()}</h3>
                                        </a>
                                        <h4>Address</h4>
                                        <a href={`/address/${item.actor_id}`}>
                                            <address>
                                                <span>{item.address}</span>
                                                <span>{item.city}</span>
                                                <span>{item.district}, {
                                                    item.postal_code 
                                                        ? `${item.postal_code}, `
                                                        : ""
                                                    } {item.country}</span>
                                            </address>
                                        </a>
                                        {item.phone
                                            ? <a href={`tel:${item.phone}`} className="button callnow">call</a>
                                            : ""
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>pagination</div>
                    </div>
                </section>
            );
        }
    }

}


export {
    Datagrid
}