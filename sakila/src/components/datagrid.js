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
        let count =0;
        return (
            <label className="simpleSelect">
                <span>{this.props.title}</span>
                <select onChange={this.handleChange} id={id}>
                    {
                        items.map(item=>(
                                (this.props.per === item 
                                    ? (<option value={item} selected key={count++}>{item}</option>)
                                    : (<option value={item}  key={count++}>{item}</option>) 
                                )
                            
                            )
                        )
                    }
                </select>
            </label>
        )
    }
}

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            editing:false,
            item: this.props.item
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }
    handleEditButton(e){
        this.setState({ editing: true })
    }
    handleDoneButton(e) {
      console.log("done");
      this.setState({ editing: false })
    }
    handleSubmit(event){
        const data = Object.fromEntries(new FormData(event.target).entries());
        console.log("submitting", data);
        fetch(`/api/actors/update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
        })
        .then(res => res.json())
        .then((result)=>{
            console.log('result', result)
            this.setState({ 
                editing: false,
                item:{
                    imgname:data.imgname,
                    actor_id:data.actor_id,
                    first_name:data.first_name,
                    last_name:data.last_name,
                    address:data.address,
                    city:data.city,
                    district:data.district,
                    country:data.country,
                    phone:data.phone,
                    street:data.street,
                    intro:data.intro
                }
             })
        })

        
        event.preventDefault();
    }
    render(){
        const { item } = this.state;
        if(this.state.editing === false){
            return(
                <div className="card">
                    <div className="controls">
                        <button onClick={this.handleEditButton}>edit</button>
                    </div>
                    <div className="holder">
                        <a href={`/actors/byId/${item.actor_id}`}>
                            <h3>{item.first_name.toLowerCase()} {item.last_name.toLowerCase()}</h3>
                        </a>
                        <div className="info">
                            { item.imgname
                                ? <div className='photo'><div className="photoholder"><img src={`http://localhost:3001/images/profiles/${item.imgname}`} alt={`Headshot for ${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`}/></div></div>
                                : <div className='photo nophoto'></div>
                            }
                            <div className="address">
                                {item.intro
                                    ? <div className="intro">{item.intro}</div>
                                    : <div className="intro notext"></div>

                                }
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
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.editing === "error"){
            return(
                <h3>Error Updating</h3>
            )
        }
        else{
            return(
                <div className="card editing">
                    <form id={`edit_${item.actor_id}`} onSubmit={this.handleSubmit}>
                        <input type="hidden" value={item.actor_id} name="actor_id" />
                        <input type="hidden" value={item.first_name} name="first_name" />
                        <input type="hidden" value={item.last_name} name="last_name" />
                        <input type="hidden" value={item.imgname} name="imgname" />
                        <div className="holder">
                            <h3>Editing {item.first_name.toLowerCase()} {item.last_name.toLowerCase()}</h3>
                            <div className="info">
                                { item.imgname
                                    ? <div className='photo'><div className="photoholder"><img src={`http://localhost:3001/images/profiles/${item.imgname}`} alt={`Headshot for ${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`}/></div></div>
                                    : <div className='photo nophoto'></div>
                                }
                                <div className="address">
                                    <div className="intro"><label>Edit Intro<textarea name="intro">{item.intro}</textarea></label></div>
                                    <h4>Address</h4>
                                    <label><span>Street</span><input type="text" defaultValue={item.address} name="address"/></label>
                                    <label><span>City</span><input type="text" defaultValue={item.city} name="city"/></label>
                                    <label><span>District/state</span><input type="text" defaultValue={item.district} name="district"/></label>
                                    <label><span>Postal Code</span><input type="text" defaultValue={item.postal_code} name="postal_code"/></label>
                                    <label><span>Country</span><input type="text" defaultValue={item.country} name="country"/></label>
                                    <label><span>Phone</span><input type="text" defaultValue={item.phone} name="phone"/></label>    
                                    <input type="submit" value="Done"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

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
          sortBy:"alpha",
          sortDirection:"asc",
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
        if(this.state.isLoaded === false){
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
                                        <Card item={item}  key={item.actor_id} />
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