import React, { Component } from 'react';


class Home  extends Component{
    componentDidMount() {
        document.title = `Home | Sakila React Project`  ;
        document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <div className="home">
                <section className="banner">
                    <div className="container">
                        <h1><span>React JS</span></h1>
                        <h2><span>Starter Project</span></h2>
                    </div>
                </section>
                <section className="intro" id="intro">
                    <div className="container">
                        <h2>Purposes</h2>
                        <p>This is a starter project. We are trying to learn more about react.</p>
                    </div>
                </section>
            </div>
        )
    }

}

export{
    Home
}