/**
 * @date: 2017/05/04
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

'use strict';
import '../css/label.css';

class Label extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
  	return(
  		<div className="example-case">
  			<div>
  				<div className="ivu-tag ivu-tag-closable">
  					<span className="ivu-tag-text">标签2 </span>
  				</div>
  				<button type="button" className="ivu-btn ivu-btn-dashed ivu-btn-small">
  					<i className="fz ion-ios-plus-empty"> </i>
  						<span>添加标签</span>
  				</button>
  			</div>
  		</div>
  	)
  }
}

export default Label;