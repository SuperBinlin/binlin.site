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
/**
 * https://github.com/hotoo/pinyin
 */
//import pinyin from "pinyin";

/**
 * https://github.com/minhtranite/react-photoswipe
 */
import {PhotoSwipe} from 'react-photoswipe';

class Photoshow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      photoCollection: [
        {img:[]}
      ],
      masonryOptions:{
        transitionDuration: 500
      },
      isphotoSwipeOpen:false,
      photoSwipe: {
        items:[],
        options:{}
      },
      currentCity:"--",
      userInfo:{}
    }
  }

  componentWillMount(){
    

  }

  componentDidMount() {

    /**
     * 获取userInfo
     */
    let userInfo = sessionStorage.getItem('userinfo.binlin.site');

    let city = this.props.location.query.city;
    let _id = this.props.location.query._id;
    
    this.setState({
      userInfo: JSON.parse(userInfo)
    }, function(){
      /**
     * idCollect为分享放到分享链接上的参数 _id为相册id openId为分享相册的用户id
     * @type {[type]}
     */
      let openId = this.state.userInfo.openid;
      let idCollect = _id + '@@' + openId;

      API_Upload.getimgbyalbumid({'albumId':_id}, (err, res) => {
        if(err) {
          console.log(err)
          return;
        }
        this.setState({
          photoCollection: res,
          photoSwipe:{
            items:res[0].img,
            options:{}
          },
          currentCity:res[0].pinyin
        });

        let maxPhotoLength = res[0].img.length || 0;
        let num = this.randomNum(0,maxPhotoLength);

        let wxUrl = encodeURIComponent(location.href.split('#')[0]);
        WX.wxSign(wxUrl, (err, ress)=>{
          if(err){
            console.log(err);
            return;
          }

          sessionStorage.setItem('wechatToken.binlin.site', ress.token);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: ress.config.appId, // 必填，公众号的唯一标识
            timestamp: ress.config.timestamp, // 必填，生成签名的时间戳
            nonceStr: ress.config.nonceStr, // 必填，生成签名的随机串
            signature: ress.config.signature,// 必填，签名，见附录1
            jsApiList: ['chooseImage','uploadImage','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })

          wx.ready(() => {

            wx.onMenuShareAppMessage({
              title: res[0].city, // 分享标题
              desc: '大冰梨相册冰住我的瞬间', // 分享描述
              link: 'http://binlin.site/shareLink?id='+idCollect, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: res[0].img[num].src, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { 
                  console.log("分享成功")
              },
              cancel: function () { 
                  console.log("分享失败")
              }
            });

            wx.onMenuShareTimeline({
              title: '我的相册-'+res[0].city, // 分享标题
              link: 'http://binlin.site/shareLink?id='+idCollect,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: res[0].img[num].src, // 分享图标
              success: function () {
                console.log('done')
              }
            });

          })
        })

      });

    });

  }

  closePhotoswipe = () => {
    this.setState({isphotoSwipeOpen:false})
  }

  showPhotoswipe = (i) => {
    console.log(i)
    this.setState({
      isphotoSwipeOpen: true
    });
    this.setState({photoSwipe:Object.assign({}, this.state.photoSwipe,{
      options:{
          index:i,
          shareButtons: [
            {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
          ],
          bgOpacity:0.8,
          showHideOpacity:true,
          preload:[2,2]
        }
      })
    })
  }

  /**
   * 获取范围内随机数
   */
  randomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.floor(Rand * Range); //舍去
    return num;
  }

  render(){
    let {photoCollection, masonryOptions, photoSwipe, isphotoSwipeOpen, currentCity} = this.state;
    let childElements = photoCollection[0].img.map((element, index) => {
     return (
        <div className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index} onClick={()=>{this.showPhotoswipe(index)}}>
          <div className="img-wp">
            <img src={element.src} />
          </div>
        </div>
      );
    });

    return (
      <DocumentTitle title={currentCity}>
        <div className="container">
          <div className="bg-ooo"></div>
          <header>
            <div className="title">
              <a className="link-wp">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </a>
              <span className="name">{currentCity}</span>
              <span className="text">Photography</span>
            </div>
          </header>
          <Masonry
              className={'my-gallery-class row'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
          >
              {childElements}
          </Masonry>

          <PhotoSwipe isOpen={isphotoSwipeOpen} items={photoSwipe.items} options={photoSwipe.options} onClose={this.closePhotoswipe}/>
        </div>
      </DocumentTitle>
    );
  }
};

export default Photoshow;

