import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./partials/header/index";
import Footer from "./partials/footer/index";
import {Datagrid} from "./components/datagrid"; 
import reportWebVitals from './reportWebVitals';
import {Switch, BrowserRouter, Router, Route,} from "react-router-dom";
import {AboutUs} from './content/about'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <Header/>
      <main>
          <Switch>
            <Route exact path="/about">
              <AboutUs/>
            </Route>
            <Route path="/">
              <section>
                <div className="container">
                  <h1>Sakila Actors</h1>
                  <p>Loaded from the default MySql Database</p>
                  <p>This should be rewritten for more generic item handling.</p>
                </div>
              </section>
              <Datagrid endpoint="/api/actors"></Datagrid>
            </Route>
          </Switch>
      </main>
      <Footer>
        <h3>disclaimer</h3>
        <p>this is some text. i swear.</p>
      </Footer>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
