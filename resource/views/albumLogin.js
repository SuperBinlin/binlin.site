/**
 * @date: 2017/07/19
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

'use strict';
import '../css/albumlogin.css';
import DocumentTitle from'react-document-title';
import {Helmet} from "react-helmet";

class Login extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render(){
    return (
      <DocumentTitle title='Login'>
        <div>
          <div className="login-wp">
            <h3 className="login-title">Binlin Album</h3>
            <ul className="login-form">
              <li>
                <i className="icon-fz ion-ios-person-outline"></i>
                <div className="login-input-wp">
                  <input type="text" className="login-input" placeholder="Account"/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input type="password" className="login-input" placeholder="Password"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default Login;