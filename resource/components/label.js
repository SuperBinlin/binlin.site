/**
 * @date: 2017/05/04
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

'use strict';
import '../css/label.css';

class Label extends React.Component{
  static defaultProps = {
    labelList: []
  }

	constructor(props) {
    super(props);
    this.state = {
      labellist:props.labelList
    }

  }

  componentWillReceiveProps(nextProps) {                      //props改变时触发
    this.setState({labellist: nextProps.labelList});
  }

  render(){
    let labellist = this.state.labellist;
    console.log(labellist,'$#@!')
  	return(
  		<div className="example-case">
  			<div>
          {
            labellist.map((obj, index) => {
              console.log('run')
              let label = classNames('ivu-tag','ivu-tag-closable',{
                'label-actived':obj.actived
              })
              return  <div className={label} key={index} onClick={()=>{this.props.selectCity(index)}}>
                        <span className="ivu-tag-text">{obj.city}</span>
                      </div>
            })
          }
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