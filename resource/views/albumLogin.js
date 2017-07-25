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
import util from '../utils/utils.js';

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
      },
      isAllowSending:false,        // 记录是否允许发送
      isSending:false              // 记录是否在发送过程中
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
   * 获取登录验证码
   * @return {[type]} [description]
   */
  getConfirmcode(time){
    let {isAllowSending, isSending} = this.state;
    if(!isAllowSending) {
      this.notify({
        message:'请输入正确的手机号',
        level:'warning',
        autoDismiss:'2'
      })
      return;
    }

    if(isSending){
      this.notify({
        message:'请耐心等待^.^',
        level:'warning',
        autoDismiss:'2'
      })
      return;
    }
    let phoneObj = {};
    let runtimes = time;
    this.runtime(runtimes)
    phoneObj = {
      phone:this.refs.phone.value
    }
    
    API_Login.getConfirm(phoneObj, (err, res) => {
      if(err){
        this.notify({
          message: '验证码发送失败，请重试',
          level: 'error'
        })
        return;
      }
      this.setState({isSending:true})
      this.notify({
        message: '验证码发送成功，请查收',
        level:'success'
      })
    })
  }

  /**
   * 计时器 验证码下次可发计时 递归函数 若计时结束则跳出
   */
  runtime(time){

    if(time == 0){
      this.setState({'confirm':'重新发送'})
      clearTimeout(confirmTimer);
      this.setState({isSending:false})
      return;
    }
    
    let confirmTimer = setTimeout(() => {
      time--;
      this.setState({'confirm':time+'秒后重新发送'})
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

  /**
   * 验证两次密码是否一致   
   * @return {[type]} [description]
   */
  confirmPassword(){
    let firstPassword = this.refs.firstPassword.value;
    let secondPassword = this.refs.secondPassword.value;

    secondPassword == '' ? '' : (function(_this){
      firstPassword == secondPassword ? '' : _this.notify({
        message: '两次输入的密码不一致',
        level: 'warning',
        autoDismiss:'2'
      })
    }(this))
  }
  /**
   * 检查手机号格式
   * @return {[type]} [description]
   */
  checkMobile(){
    let mobilePhone = this.refs.phone.value;
    util.checkMobile(mobilePhone) ? '' : this.notify({
      message: '请输入正确的手机号',
      level: 'warning',
      autoDismiss:'2'
    })
  }
  /**
   * 输入实时监控 若正确则立即 放开获取验证码
   * @return {[type]} [description]
   */
  watchPhone(e){
    let mobilePhone = e.target.value;
    util.checkMobile(mobilePhone) ? this.setState({
      isAllowSending:true
    }) : this.setState({
      isAllowSending:false
    });
  }

  render(){
    let {isLoginAction, confirm, isAllowSending} = this.state;

    let login = classNames({
      "login-form":true,
      "active":isLoginAction
    })

    let register = classNames({
      "register-form":true,
      "initpos":true,
      "active":!isLoginAction
    })

    let getConfirmCode = classNames({
      "confirm-input":true,
      "confirm-active":!isAllowSending
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
                  <input ref="firstPassword" type="password" className="login-input" placeholder="请输入密码"/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="secondPassword" type="password" className="login-input" placeholder="请确认密码" onBlur={()=>this.confirmPassword()}/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-iphone"></i>
                <div className="login-input-wp">
                  <input ref="phone" type="number" className="login-input phone-input" placeholder="请输入手机号码" onInput={(e)=>this.watchPhone(e)}  onBlur={()=>this.checkMobile()} />
                  <a className={getConfirmCode} onClick={()=>{this.getConfirmcode(60)}}>{confirm}</a>
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