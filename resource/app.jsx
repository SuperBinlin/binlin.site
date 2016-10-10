/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:38
 */
'use strict';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render(){
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        );
    }
});