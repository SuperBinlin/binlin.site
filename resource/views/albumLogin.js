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
      isSending:false,             // 记录是否在发送过程中
      confirmTimer:undefined       
    };
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    let isreg = this.props.params.isreg == 'register';
    isreg ? this.toRegister() : this.backLogin()
  }

  /**
   * 注意：这里路由不同，但使用的是同一套模板，所以路由改变即组件的props改变时，会进入componentWillReceiveProps生命周期，nextProps获取改变后的props
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps){
    let isreg = nextProps.params.isreg == 'register';
    isreg ? this.toRegister() : this.backLogin()
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
      clearTimeout(this.confirmTimer);
      this.setState({isSending:false})
      return;
    }
    
    this.confirmTimer = setTimeout(() => {
      time--;
      this.setState({'confirm':time+'秒后重新发送'})
      this.runtime(time)
    }, 1000)
    
  }

  /**
   * user验证区分事件来源
   * @param  {[type]} flag [description]
   * @return {[type]}      [description]
   */
  async confirmUsername(flag){
    let isConfirm,
        username = this.refs.username.value;
    if(username == '') {
      this.notify({
        message: '用户名不能为空噢😆',
        level: 'warning',
        autoDismiss:'2'
      })
      isConfirm = false;
    } else {
      // API_Login.confirmname({
      //   "username":username
      // },(err, res) => {
      //   if(err){
      //     this.notify({
      //       message: err.msg,
      //       level: 'error',
      //       autoDismiss:'2'
      //     })
      //     return
      //   }

      //   if(res.msg == 'valid' && flag) {
      //     isConfirm = true;
      //     this.notify({
      //       message: '这个用户名可以用哦😄',
      //       level: 'success',
      //       autoDismiss:'2'
      //     })
      //   } else {

      //     isConfirm = false;
      //     this.notify({
      //       message: '用户名已存在😞',
      //       level: 'warning',
      //       autoDismiss:'2'
      //     })
      //   }

      //   console.log(isConfirm)
      //   return isConfirm
      // })
      
      try {
        let msg = await API_Login.confirmname({"username":username});
        if(msg == 'valid' && flag) {
          isConfirm = true;
          this.notify({
            message: '这个用户名可以用哦😄',
            level: 'success',
            autoDismiss:'2'
          })
        } else if(msg == 'invalid'){
          isConfirm = false;
          this.notify({
            message: '用户名已存在😞',
            level: 'warning',
            autoDismiss:'2'
          })
        } else if (msg == 'valid') {
          isConfirm = true;
        }
      } catch(err) {
        isConfirm = false;
      }
      console.log(isConfirm,'----')
      return isConfirm;
    };
    
  }

  /**
   * 验证两次密码是否一致 第一次输入密码和第二次输入密码失去焦点时的公用方法
   * @flag 区别事件来源 输入框blur触发or注册按钮触发
   * @return {[type]} [description]
   */
  confirmPassword(flag){
    /**
     * isConfirm 注册时调用此方法 标注2次密码是否一致
     */
    let isConfirm,
        firstPassword = this.refs.firstPassword.value,
        secondPassword = this.refs.secondPassword.value;

    if (firstPassword == '') {
      this.notify({
        message: '密码不能为空噢😳',
        level: 'warning',
        autoDismiss:'2'
      });
      isConfirm = false
      return;
    }
    /**
     * flag 标记不是首次输入密码时触发，即要输完确认密码和提交注册时，触发比对两次密码是否一致
     * @param  {[type]} _this) {                 firstPassword [description]
     * @return {[type]}        [description]
     */
    //TODO bug
    flag ? (function(_this) {
      console.log(firstPassword == secondPassword)
      firstPassword == secondPassword ? isConfirm = true : (function(){
        _this.notify({
          message: '两次输入的密码不一致😯',
          level: 'warning',
          autoDismiss:'2'
        })
        isConfirm = false;
      })();
    }(this)) : isConfirm = true;
    return isConfirm;
  }
  /**
   * 检查手机号格式
   * @return {[type]} [description]
   */
  checkMobile(){
    let isConfirm = false,
        mobilePhone = this.refs.phone.value;
    util.checkMobile(mobilePhone) ? isConfirm = true : this.notify({
      message: '请输入正确的手机号😊',
      level: 'warning',
      autoDismiss:'2'
    })
    return isConfirm;
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

  /**
   * 登录
   */
  login(){
    let logininfo = {
      username:this.refs.usernameLogin.value,
      password:this.refs.passwordLogin.value
    }
    API_Login.login(logininfo, (err, res)=>{
      if(err) {
        let msg = err.msg;
        this.notify({
          message:msg,
          level:'error',
          autoDismiss:'2'
        })
      }

      if(res.status){
        this.notify({
          message:res.msg,
          level:'success',
          autoDismiss:'2'
        }) 
      } else {
        this.notify({
          message:res.msg,
          level:'error',
          autoDismiss:'2'
        })
      } 
      
    })
  }

  /**
   * 注册
   * @return {[type]} [description]
   */
  register(){
    let cpUsername,cpPassword,cpMobilephone;
    /**
     * 调取async函数时 返回值以promise形式获得
     */
    this.confirmUsername().then(val => {
      cpUsername = val
      cpPassword = this.confirmPassword(true),
      cpMobilephone = this.checkMobile()
      console.log(cpUsername)
      if(!cpUsername || !cpPassword || !cpMobilephone){
        return;
      }

      let userInfo = {
        username:this.refs.username.value,
        password:this.refs.firstPassword.value,
        phone:this.refs.phone.value,
        code:this.refs.code.value,
        registerDate:new Date()
      }
      console.log(userInfo)
      API_Login.register(userInfo, (err, res)=>{
        console.log(err,res)
        if(err){
          let msg = err.msg;
          this.notify({
            message:msg,
            level:'error',
            autoDismiss:'2'
          })
        }

        this.notify({
          message:res.msg,
          level:'success',
          autoDismiss:'2'
        })
        this.initRegister();
      })
    });
  }

  /**
   * 注册成功后初始化数据
   */
  initRegister(){
    this.refs.username.value = '';
    this.refs.firstPassword.value = '';
    this.refs.secondPassword.value = '';
    this.refs.phone.value = '';
    this.refs.code.value = '';
    this.setState({'confirm':'发送验证码'})
    clearTimeout(this.confirmTimer);
    this.setState({isSending:false})
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
                  <input ref="usernameLogin" type="text" className="login-input" placeholder="请输入用户名"/>
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="passwordLogin" type="password" className="login-input" placeholder="请输入密码"/>
                </div>
              </li>
              <li className="noline">
                <p className="half-wp col-left"></p>
                <p className="half-wp col-right fpw">忘记密码</p>
              </li>
              <li className="signin noline">
                <a className="signin-btn" onClick={()=>this.login()}>登录</a>
              </li>
              <li className="noline register" onClick={()=>{this.toRegister()}}>
                <a>没有账号？ <span>立即注册</span></a>
              </li>
            </ul>
            <ul className={register}>
              <li>
                <i className="icon-fz ion-ios-person-outline"></i>
                <div className="login-input-wp">
                  <input ref="username" type="text" className="login-input" placeholder="请输入你的用户名" onBlur={()=>this.confirmUsername(true)} />
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="firstPassword" type="password" className="login-input" placeholder="请输入密码" onBlur={()=>this.confirmPassword()} />
                </div>
              </li>
              <li>
                <i className="icon-fz ion-ios-locked-outline"></i>
                <div className="login-input-wp">
                  <input ref="secondPassword" type="password" className="login-input" placeholder="请确认密码" onBlur={()=>this.confirmPassword(true)}/>
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
                  <input ref="code" type="text" className="login-input" placeholder="请输入验证码"/>
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
          <NotificationSystem ref="notificationSystem" style={false} />
        </div>
      </DocumentTitle>
    )
  }
}

export default Login;