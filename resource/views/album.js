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
import { Link } from 'react-router';
import Navicon from '../components/navicon.js';

/**
 * 可以在组建中控制html头部 cooool!
 * https://github.com/nfl/react-helmet
 */
import {Helmet} from "react-helmet";

class Album extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      photoCollection: [],
      masonryOptions:{
        transitionDuration: 500
      },
      wechatCallbackCode:'',
      wxUrl:''
    }
  }

  componentWillMount(){
    API_Upload.getimg({}, (err, res) => {
      if(err) {
        console.log(err)
        return;
      }

      this.setState({photoCollection: res})
    })

    this.setState({'wxUrl':location.href.split('#')[0]});
    console.log(window.location.href);
    console.log(this.props.location.query.code);
    let wxUrl = encodeURIComponent(location.href.split('#')[0]);
    this.setState({wechatCallbackCode:this.props.location.query.code}, ()=>{
      WX.wxSign(wxUrl, (err, res)=>{
        if(err){
          console.log(err);
          return;
        }

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名，见附录1
          jsApiList: ['chooseImage','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        console.log(res)

        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title: '冰梨相册', // 分享标题
            desc: '第一次分享哦', // 分享描述
            link: 'http://binlin.site/album', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://album.binlin.site/0.042686455814229696.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                console.log("分享成功")
            },
            cancel: function () { 
                console.log("分享失败")
            }
          });
        })
      })
    });
  }

  randomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.floor(Rand * Range); //舍去
    return num;
  }

  // share () {
  //   console.log(location.href)
  //   fetch('/api/getsign', {
  //     method: 'GET'
  //   }).then((res)=>{
  //     console.log(res)
  //       res.json().then(function(arr){
  //         arr.jsApiList = ['onMenuShareAppMessage','onMenuShareTimeline','chooseImage'];
  //         arr.debug = true;
  //         console.log(arr)
  //         wx.config(arr);
  //         wx.ready(function(){
  //           console.log('调用成功');
  //         })
  //         wx.error(function(res){
  //             console.log('error:'+JSON.stringify(res));
  //         });

  //       })
  //   }).catch((err)=>{
  //     callback({
  //       'mes': err
  //     })
  //   });
  // }
  share(){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(localIds)
        }
      });
  }

  upl(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      }
    });
  }

  render(){
    let {photoCollection, masonryOptions, wxUrl} = this.state;
    /**
     * navicon component style
     * @type {Object}
     */
    const naviconStyle= {
      position:'absolute',
      top:'20px',
      right:'20px'
    }
    let childElements = photoCollection.map((element, index) => {
      /**
       * 随机展示当前相册的一张图片，需要知道当前相册的张数，然后获取随机数，展示随机照片
       * @type {String}
       */
      let maxPhotoLength = element.img.length || 0;
      let num = this.randomNum(0,maxPhotoLength);


      /**
       * 版本差异导致LINK带params的方式有所区别
       * example: <Link to="/property/:propId" params={{ propId: "123"}} ></Link>
       * <Link to={{pathname: '/photo/'+element.city}}>
       *  <span className="view-more">view more</span>
       * </Link>
       * 获取params:this.props.params.city
       * 获取query:this.props.location.query.city
       */
      return (
        <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
          <img src={element.img[num].src} />
          <div className="shadow">
            <p className="current-city">{element.city}</p>
            <Link to='photo' query={{city: element.city}}>
              <span className="view-more">view more</span>
            </Link>
          </div>
        </div>
       );
    });

    return (
      <DocumentTitle title='Album'>
        <div>
          <Navicon style={naviconStyle}>
            <div className="container body-bg">
              <Helmet>
                  <html className="body-bg"></html>
                  <body className="body-bg"></body>
              </Helmet>
              <header>
                <div className="title" onClick={() => this.share()}>
                  <a className="link-wp">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </a>
                  <span className="name">SuperBinlin</span>
                  <span className="text">Photography</span>
                  <span>{wxUrl}</span>
                </div>
              </header>
              <Masonry
                  className={'my-gallery-class row'} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                  {childElements}
              </Masonry>
            </div>
          </Navicon>
          
        </div>
      </DocumentTitle>
    );
  }
};

export default Album;