/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:30
 */
'use strict';
import React,{ Component } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

//import App from "../app.jsx";
import Index from "../views/index.js";
import NotFound from "../views/404.js";
import Resume from "../views/resume.js";
import Login from "../views/albumLogin.js";
import Upload from "../views/upload.js";
import Wechatupload from "../views/wechatupload.js";
import Album from "../views/album.js";
import Photoshow from "../views/photoshow.js";


class Routes extends Component{
    render(){
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Index}></Route>
          <Route path="resume" component={Resume} />
          <Route path="login(/:isreg)" component={Login} />
          <Route path="upload" component={Upload} />
          <Route path="wechatupload" component={Wechatupload} />
          <Route path="album" component={Album}/>
          <Route path="photo" component={Photoshow} />
          <Route path="*" component={NotFound} />
        </Router>
      );
    }
};

export default Routes;