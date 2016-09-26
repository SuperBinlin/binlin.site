/**
 * Created by Binlin
 * Date: 2016/09/25
 * Time: 21:38
 */
'use strict';
import React from 'react';

export default React.createClass({
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-8">
                    {this.props.children}
                    SS
                </div>
            </div>
        );
    }
});