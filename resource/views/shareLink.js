/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/album.css';
import DocumentTitle from'react-document-title';
import Masonry from 'react-masonry-component';
import API_Upload from '../service/upload.service.js';
import WX from '../service/wx.service.js';

class ShareLink extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    let id = this.props.location.query.id;
    console.log(id)
    if(id){
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa266785ae98ca648&redirect_uri=http://binlin.natapp1.cc/album?id='+id+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    } else {
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa266785ae98ca648&redirect_uri=http://binlin.natapp1.cc/album&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    }

    // if(id){
    //   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa266785ae98ca648&redirect_uri=http://binlin.site/album?id='+id+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    // } else {
    //   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa266785ae98ca648&redirect_uri=http://binlin.site/album&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    // }


  }

  componentDidMount() {


  }

  render(){

    return (
      <p></p>
    );
  }
};

export default ShareLink;
