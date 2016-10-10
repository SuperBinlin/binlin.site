/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:30
 */
'use strict';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import App from "../app.jsx";
import Notfound from "../views/404.js";
import Resume from "../views/resume.js"


export default React.createClass({
    render(){
        return (
            <Router>
                <Route path="/" component={App}>
                    <Route path="resume" component={Resume}/>
                    <Route path="*" component={Notfound}/>
                </Route>
            </Router>
        );
    }
});