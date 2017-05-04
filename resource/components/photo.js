/**
 * @date: 2017/05/03
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

'use strict';

class Photo extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
  	return(
  		<li>
	      <p className="imgWrap">
	        <img src={this.props.src} />
	      </p>
	    </li>
  	)
  }
}

export default Photo;