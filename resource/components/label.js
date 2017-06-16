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
      labellist:props.labelList,                              //将label数据给state，state改变时，将重新render↓
      fillcity:false                                          //false 不显示
    }

  }

  componentWillReceiveProps(nextProps) {                      //props改变时触发，当props改变时，给state重新赋值↑
    this.setState({labellist: nextProps.labelList});
  }

  addLabel = ()=>{
    this.setState({'fillcity':true});
    // setTimeout(()=>{
    //    this.refs.getcity.focus();
    //  },100)
  }

  addCityFocus(instance){
    if(instance){
      instance.focus();
    }
  }

  /**
   * 添加城市，成功后关闭添加框，调用父组件方法后，将e.target.value置为空以便下次使用
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  _addCity = (e) => {
    this.props._addCity(e);
    e.target.value = '';
    this.setState({'fillcity':false});
  }

  render() {
    let {labellist, fillcity} = this.state;
    // let iscityshow = classNames('ivu-tag','ivu-tag-closable',{
    //   'fillcity':!fillcity
    // })
  	return(
  		<div className="example-case">
  			<div>
          {
            labellist.map((obj, index) => {
              let label = classNames('ivu-tag','ivu-tag-closable',{     //因为是遍历，所以在render时设置classNames
                'label-actived':obj.actived
              })
              return  <div className={label} key={index} onClick={()=>{this.props._selectCity(index)}}>
                        <span className="ivu-tag-text">{obj.city}</span>
                      </div>
            })
          }

          {
            fillcity ? 
              <div className="ivu-tag ivu-tag-closable">
                <input ref={this.addCityFocus} className="fill-city" type="text" onBlur={this._addCity}/>
              </div>
              : null
          }

          <button type="button" className="ivu-btn ivu-btn-dashed ivu-btn-small" onClick={this.addLabel}>
            <i className="fz ion-ios-plus-empty"> </i>
            <span>添加标签</span>
          </button>
          
  			</div>
  		</div>
  	)
  }
}

export default Label;