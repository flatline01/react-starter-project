import React, { Component, useState, useEffect } from 'react';
import { SelectFilter } from './selectfilter';
import "./datagrid.css"

class SimpleSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selected:"",
          id:"",
          items: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        //this.setState({ value: event.target.value });
        //console.log(e.target.value)
        this.setState({
            selected:e.target.value
        })
        this.props.onChange(e.target.value);
    };
   
    componentDidMount(){
        let i = this.props.values;
        this.setState({
            items:i.split(","),
            id:this.props.id
        })
    }
    render(){
        const {selected, items, id} = this.state;
        return (
            <label className="simpleSelect">
                <span>{this.props.title}</span>
                <select onChange={this.handleChange} id={id}>
                    {
                        items.map(item=>(
                            (this.props.per === item 
                                ? (<option value={item} selected>{item}</option>)
                                : (<option value={item}>{item}</option>) 
                             )
                        ))
                    }
                </select>
            </label>
        )
    }
}



class Datagrid  extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          numAtATime:10,
          total:"",
          startAt:0,
          items: []
        };
        this.handleNumberOfItems = this.handleNumberOfItems.bind(this)
      }
    componentDidMount() {
        fetch(`/api/actors/${this.state.numAtATime}/${this.state.startAt}`)
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
    componentDidUpdate(){
        fetch(`/api/actors/${this.state.numAtATime}/${this.state.startAt}`)
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
    handleNumberOfItems(numAtATime) {
        console.log("handling it", numAtATime)
        this.setState({
            numAtATime:numAtATime,
            isLoaded:false
        });
        
    }
    render() {
        const { error, isLoaded, items, startAt, numAtATime } = this.state;
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
                                <div className="controls">
                                   <div className="numAtATime">
                                       <SimpleSelect 
                                       id="numAtATime" 
                                       per={numAtATime}
                                       title="Number At A Time:" 
                                       onChange={this.handleNumberOfItems}
                                       values="10,20,30,100" />
                                    </div>
                                </div>
                                <div className="cardholder">
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
                                <div>pagination</div>
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