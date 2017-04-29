/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:38
 */
'use strict';
import React,{ Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component{
    render(){
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        );
    }
};

export default App;