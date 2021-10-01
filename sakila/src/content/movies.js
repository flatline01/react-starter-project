import React, { Component } from 'react';


class Movies  extends Component{
    componentDidMount() {
        document.title = `Movies | Sakila React Project`  ;
        document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <div className="movies">
                <section className="intro" id="intro">
                    <div className="container">
                        <h1>Movies</h1>
                    </div>
                </section>
            </div>
        )
    }

}

export{
    Movies
}