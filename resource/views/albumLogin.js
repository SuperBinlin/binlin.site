/**
 * @date: 2017/07/19
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

'use strict';
import '../css/albumlogin.css';
import '../css/react-notification-system.css';
import DocumentTitle from'react-document-title';
import {Helmet} from "react-helmet";
import API_Login from "../service/login.service.js"
import NotificationSystem from 'react-notification-system';

class Login extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      isLoginAction:true,
      confirm:'获取验证码',
      userRegisterInfo:{
        userName:'',
        password:'',
        confirmPassword:'',
        userPhone:''
      }
    };
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  /**
   * {
   *   title:'Notification title',
   *   message: 'Notification message',
   *   level: 'success'
   * }
   */
  notify(obj){
    this._notificationSystem.addNotification(obj);
  }

  /**
   * 前往注册页
   * @return {[type]} [description]
   */
  toRegister(){
    this.setState({isLoginAction:false})
  }

  /**
   * 返回登录页
   * @return {[type]} [description]
   */
  backLogin(){
    this.setState({isLoginAction:true})
  }

  /**
   * 获取登录
   * @return {[type]} [description]
   */
  getConfirmcode(time){
    let phoneObj = {};
    let runtimes = time;
    this.runtime(runtimes)
    phoneObj = {
      phone:this.refs.phone.value
    }
    
    API_Login.getConfirm(phoneObj, (err, res) => {
      if(err){
        console.log("验证码有误");
        return;
      }
      console.log(res)
    })
  }

  /**
   * 计时器 递归函数 若计时结束则跳出
   */
  runtime(time){

    if(time == 0){
      this.setState({'confirm':'计时结束'})
      clearTimeout(confirmTimer);
      return;
    }
    
    let confirmTimer = setTimeout(() => {
      console.log(time,'in time')
      time--;
      this.setState({'confirm':time})
      this.runtime(time)
    }, 1000)
    
  }
  /**
   * 注册
   * @return {[type]} [description]
   */
  register(){
    this.notify({
      title:'test style',
      message: 'Notification message',
      level: 'error',
      autoDismiss:'60'
    })
  }

  render(){
    let {isLoginAction, confirm} = this.state;
    let login = classNames({
      "login-form":true,
      "active":isLoginAction
    })
    let register = classNames({
      "register-form":true,
      "initpos":true,
      "active":!isLoginAction
    })

    return (
      <DocumentTitle title='Login'>
        <div>
          <div className="login-wp">
            <h3 className="login-title">Binlin Album</h3>
            <ul className={login}>
              <li>
                <i className="icon-fz ion-ios-person-outline"></i>
                <div className="login-input-wp">
                  <input type="text" className="login-input" placeholder="请输入用户名"/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input type="password" className="login-input" placeholder="请输入密码"/>
                </div>
              </li>
              <li className="noline">
                <p className="half-wp col-left"></p>
                <p className="half-wp col-right fpw">忘记密码</p>
              </li>
              <li className="signin noline">
                <a className="signin-btn">登录</a>
              </li>
              <li className="noline register" onClick={()=>{this.toRegister()}}>
                <a>没有账号？ <span>立即注册</span></a>
              </li>
            </ul>
            <ul className={register}>
              <li>
                <i className="icon-fz ion-ios-person-outline"></i>
                <div className="login-input-wp">
                  <input ref="username" type="text" className="login-input" placeholder="请输入你的用户名" />
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="password" type="password" className="login-input" placeholder="请输入密码"/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="confirmpassword" type="password" className="login-input" placeholder="请确认密码" onBlur={()=>this.confirmPassword()}/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-iphone"></i>
                <div className="login-input-wp">
                  <input ref="phone" type="number" className="login-input phone-input" placeholder="请输入手机号码" />
                  <a className="confire-input" onClick={()=>{this.getConfirmcode(5)}}>{confirm}</a>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-chatbox-working"></i>
                <div className="login-input-wp">
                  <input ref="confirm-code" type="text" className="login-input" placeholder="请输入验证码"/>
                </div>
              </li>
              <li className="signin noline">
                <a className="signin-btn" onClick={()=>{this.register()}}>注册</a>
              </li>
              <li className="noline">
                <p className="half-wp col-left"></p>
                <p className="half-wp col-right fpw" onClick={()=>{this.backLogin()}}>已有账号？返回登录页</p>
              </li>
            </ul>
          </div>
          <NotificationSystem ref="notificationSystem" style={false}/>
        </div>
      </DocumentTitle>
    )
  }
}

export default Login;