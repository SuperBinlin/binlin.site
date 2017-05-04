/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:30
 */
'use strict';
import React,{ Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';


import App from "../app.jsx";
import Notfound from "../views/404.js";
import Resume from "../views/resume.js";
import Upload from "../views/upload.js";
import Album from "../views/album.js";


class Routes extends Component{
    render(){
        return (
            <Router>
                <Route path="/" component={App}>
                    <Route path="resume" component={Resume}/>
                    <Route path="upload" component={Upload}/>
                    <Route path="album" component={Album}/>
                    <Route path="*" component={Notfound}/>
                </Route>
            </Router>
        );
    }
};

export default Routes;