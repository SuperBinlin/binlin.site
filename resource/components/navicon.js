/**
 * @date: 2017/07/14
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site
 */

'use strict';
import '../css/navicon.css';
import {Helmet} from "react-helmet";

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

  hideMenu(){
    this.setState({
      navIsopen:false
    })
  }

  render(){
    /**
     * navIsopen 控制 是否展示隐藏menu
     */
    let {navIsopen} = this.state;
    let nav = classNames({
      'nav-mobile': true,
      'nav-mobile--right':!navIsopen,
      'nav-mobile--open': navIsopen             // 无图片时展示上传图片按钮
    });

    let bodyCtrl = classNames({
      'menu-wrap':true,
      'show-menu':navIsopen
    })

    return (
      <div>
        <div className="navicon" style={this.props.style}>
          <button className="nav-button__open js-nav-mobile-open" onClick={()=>this.showMenu()}>
            <span className="nav-button__line"></span>
            <span className="nav-button__line"></span>
            <span className="nav-button__line"></span>
          </button>
          <nav className={nav}>
            <span className="nav-mobile__logo">
              BINLIN ALBUM
            </span>
            <ul className="nav-mobile__list">
              <li className="nav-mobile__list-item hide-sm">
                <a className="sign-button button-small">
                  登 录
                </a>
              </li>
              <br/>
              <br/>
              <li className="nav-mobile__list-item hide-md">
                <a className="nav-mobile__link-primary">注册</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={bodyCtrl} onClick={()=>this.hideMenu()}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nacicon;