/**
 * @date: 2017/07/12
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */
'use strict';

import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-photoswipe/lib/photoswipe.css';
import '../css/ionicons.min.css';
import '../css/animate.css'
import '../lib/jquery.lettering.js';
import '../lib/jquery.fittext.js';
import '../lib/jquery.textillate.js';
import util from '../utils/utils.js'

class Resume extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){
    let animateArr = ["flash","bounce","shake","tada","swing","wobble","pulse","flip","flipInX","flipInY","fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight","fadeInUpBig","fadeInDownBig","fadeInLeftBig","fadeInRightBig","bounceIn","bounceInDown","bounceInUp","bounceInLeft","bouneInRight","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","rollIn"];
    let animateEle = animateArr[util.randomNumBoth(0,30)];
    $('.nav-link').textillate(
      { 
        in: { effect: animateEle } 
      }
    );
    $('.binlin-site-h1').textillate(
      { 
        in: { effect: animateEle } 
      }
    );
    $('.binlin-site-h4').textillate(
      { 
        in: { effect: animateEle } 
      }
    );
    $('.footer-copy').textillate(
      { 
        in: { effect: animateEle } 
      }
    );
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="cover-wp">
            
          </div>
          <div className="wrap-wp">
            <nav className="nav nav-split">
              <div className="nav-links">
                <a className="nav-link nav-link-work active">HOME</a>
                <a className="nav-link nav-link-work" href="http://www.jianshu.com/u/b096d6016afc" target="_blank">BLOG</a>
                <a className="nav-link nav-link-journal" href="https://github.com/SuperBinlin" target="_blank">GITHUB</a>
                <a className="nav-link nav-link-journal" href="http://binlin.site/#/album" target="_blank">ALBUM</a>
                <a className="nav-link nav-link-studio" href="http://binlin.site/#/resume" target="_blank">ABOUT ME</a>
              </div>
            </nav>
            <div className="binlin-site">
              <h1 className="binlin-site-h1">
                A front-end engineer's website.
              </h1>
              <h4 className="binlin-site-h4">
                ShangHai • China
              </h4>
            </div>
            <footer className="footer footer-split">
              <p className="footer-copy">© 2017 binlin.site.</p>
            </footer>
          </div>
        </div>
      </div>
    )}
};

export default Resume;
