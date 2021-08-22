import React, { Component } from 'react';


class SelectFilter  extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    componentDidMount() {
        if(this.props.endpoint){
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
        
    }
    sortBy = () => {
        let e = document.getElementById(this.props.id);
        let selected = e.options[e.selectedIndex].value;
        console.log(selected)
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const optionkey = this.props.keyvalue.split(",")[0]
        const optionval = this.props.keyvalue.split(",")[1]
        if (error) {
            console.log(error)
            return <div class="error selectfilter">Error</div>
        } 
        else if (!isLoaded) {
            return <div class="loading selectfilter">Loading...</div>;
        } 
        else{
            return (
                <div class="loaded selectfilter">
                    <label>
                        <span>{this.props.title}</span>
                        <select onChange={this.sortBy} id={this.props.id}>
                            <option>Select -- </option>
                            {
                                items.map(item => (
                                    <option value={item[optionkey]}>{item[optionval]}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
            )
        }

    }



}

export {
    SelectFilter
}