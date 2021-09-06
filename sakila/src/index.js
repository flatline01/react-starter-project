import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./partials/header/index";
import Footer from "./partials/footer/index";
import {Datagrid} from "./components/datagrid"; 
import reportWebVitals from './reportWebVitals';
import {Switch, BrowserRouter, Router, Route,} from "react-router-dom";
import {AboutUs} from './content/about'
import {ById} from "./content/byId"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <Header/>
      <main>
          <Switch>
            <Route exact path="/about">
              <AboutUs/>
            </Route>
            <Route path="/actors/byId/:id?" component={ById} />
            <Route path="/">
              <Datagrid endpoint="/api/actors">
                  <h1>Sakila Actors</h1>
                  <p>Loaded from the default MySql Database</p>
                  <p>This should be rewritten for more generic item handling.</p>
                  </Datagrid>
            </Route>
          </Switch>
      </main>
      <Footer>
        <h3>disclaimer</h3>
        <p>This is not production ready.</p>
      </Footer>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
