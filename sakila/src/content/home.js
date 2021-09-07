import React, { Component } from 'react';


class Home  extends Component{
    componentDidMount() {
        document.title = `Home | Sakila React Project`  ;
        document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <section>
                <div className="container">
                    <h1>Home</h1>
                </div>
            </section>
        )
    }

}

export{
    Home
}