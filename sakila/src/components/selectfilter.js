import React, { Component } from 'react';

/* function Subselect(params) {
    let endpoint=params.endpoint
    let query=params.query
    let items=[];
    let loaded=false;
    fetch(`${endpoint}/${query}`)
        .then(res => res.json())
        .then((result) =>{
            items=result.result
        })

    return( 
        <label className="subselection">
            <span>Sub Filter</span>
            <select>
                <option>Select City</option>
                {
                    items.map(item => (

                        <option  key={item[city_id]} value={item[city]}>{item.city}</option>
                    ))
                }
            </select>
        </label>
    )
} */

class SelectFilter extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          subselect:[],
          subactive:false,
          substate:""
        };
    }
    componentDidMount() {
        if(this.props.endpoint){
            fetch(`${this.props.endpoint}/${this.props.query}`)
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
    sortBy = (params) => {
        let e = document.getElementById(this.props.id);
        let selected = e.options[e.selectedIndex].value;
        this.setState({
            subactive:true,
            substate:selected
        })
    }

    

    render() {
        const { error, isLoaded, items, subactive} = this.state;
        const optionkey = this.props.keyvalue.split(",")[0]
        const optionval = this.props.keyvalue.split(",")[1]
        let sub;
        if (error) {
            console.log(error)
            return <div className="error selectfilter">Error</div>
        } 
        else if (!isLoaded) {
            return <div className="loading selectfilter">Loading...</div>;
        } 
        else{
            if(subactive){
               sub = <SelectFilter title="City" keyvalue="city_id,city" endpoint="/api/cities" query={this.state.substate}/>
            }
            return (
                <div className="loaded selectfilter">
                    <label>
                        <span>{this.props.title}</span>
                        <select onChange={this.sortBy} key={this.props.id} id={this.props.id}>
                            <option>Select -- </option>
                            {
                                items.map(item => (
                                    <option  key={item[optionkey]} value={item[optionkey]}>{item[optionval]}</option>
                                ))
                            }
                        </select>
                      
                    </label>
                    {sub}
                </div>
            )
        }

    }



}

export {
    SelectFilter
}