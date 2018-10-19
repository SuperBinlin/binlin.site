/**
 * @date: 2017/07/14
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site
 */

'use strict';
import '../css/navicon.css';
import { Link } from 'react-router';

class Nacicon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      navIsopen:false
    };
  }

  showMenu(){
    this.setState({
      navIsopen:true
    })
  }

  hideMenu(e){
    e.stopPropagation();
    this.setState({
      navIsopen:false
    })
  }

  uploadImg(){
    this.props._uploadImg();
  }

  render(){
    /**
     * navIsopen 控制 是否展示隐藏menu
     */
    let {navIsopen} = this.state;

    let nav = classNames({
      'nav-mobile': true,
      'nav-mobile--right':!navIsopen,
      'nav-mobile--open': navIsopen             
    });

    /**
     * 主体部分缩进控制
     */
    let bodyCtrl = classNames({
      'menu-wrap':true,
      'show-menu':navIsopen
    })

    /**
     * 侧边栏show时 给左边主体部分添加遮罩
     */
    let popupCtrl = classNames({
      popup:navIsopen
    })

    /**
     * 登录按钮显示与否
     */
    let loginBtnHide = classNames({
      "login-hide": !!this.props.headimgurl,
      "nav-mobile__list-item": true,
      "hide-sm": true
    })

    /**
     * 登录按钮显示与否
     */
    let loginBtnShow = classNames({
      "login-hide": !this.props.headimgurl,
      "nav-mobile__list-item": true,
      "hide-sm": true
    })

    /**
     * props style|headimgurl
     */
    return (
      <div>
        <div className="navicon" style={this.props.style}>

          <div className="quick-option">
            <i className="fa fa-list fa-2x fff" onClick={()=>this.showMenu()}></i>
            <i className="fa fa-camera-retro fa-2x fff" onClick={()=>this.uploadImg()}></i> 
          </div>

          <nav className={nav}>
            <span className="nav-mobile__logo">
              BINLIN ALBUM
            </span>
            <ul className="nav-mobile__list">
              <li>
                <img className="headimgurl" src={this.props.headimgurl} />
              </li>
              <br/>
              <br/>
              <li className={loginBtnShow}>
                <Link to='wechatupload'>
                  <a className="sign-button button-small">
                    上传照片
                  </a>
                </Link>
              </li>
              <li className={loginBtnHide}>
                <Link to='login'>
                  <a className="sign-button button-small">
                    登 录
                  </a>
                </Link>
              </li>
              <br/>
              <br/>
              <li className={loginBtnHide}>
                <Link to='login/register'>
                  <a className="nav-mobile__link-primary">注册</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={bodyCtrl} onClick={(e)=>this.hideMenu(e)}>
          <div className={popupCtrl}></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nacicon;