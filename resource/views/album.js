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
      }
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
  }

  randomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.floor(Rand * Range); //舍去
    return num;
  }

  share () {
    console.log(location.href)
    fetch('/api/getsign', {
      method: 'GET'
    }).then((res)=>{
      console.log(res)
        res.json().then(function(arr){
          arr.jsApiList = ['onMenuShareAppMessage','onMenuShareTimeline'];
          arr.debug = true;
          console.log(arr)
          wx.config(arr);
          wx.ready(function(){
            console.log('调用成功');
            wx.onMenuShareTimeline({
              title: 'Binlin相册', // 分享标题
              link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://www.warmwood.com/images/s1.jpg', // 分享图标
              success: function () { 
                  alert('成功')
              },
              cancel: function () { 
                  alert('失败')
              }
            });
          })
          wx.error(function(res){
              console.log('error:'+JSON.stringify(res));
          });

        })
    }).catch((err)=>{
      callback({
        'mes': err
      })
    });
  }

  share2(){
    wx.onMenuShareAppMessage({
      title: 'Binlin相册', // 分享标题
      desc: '嘿嘿嘿', // 分享描述
      link: location.href,
      imgUrl: 'http://www.warmwood.com/images/s1.jpg', // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      success: function () {
          // 用户确认分享后执行的回调函数
          alert("分享");
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
          alert("取消分享");
      }
    });
  }

  render(){
    let {photoCollection, masonryOptions} = this.state;
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
            <Link to='photo/' query={{city: element.city}}>
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
                <div className="title">
                  <a className="link-wp">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </a>
                  <span className="name">SuperBinlin</span>
                  <span className="text">Photography</span>
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
              <p style={{'color':'#fff'}} onClick={()=>this.share()}>分享1</p>
              <p style={{'color':'red'}} onClick={()=>this.share2()}>分享2</p>
            </div>
          </Navicon>
          
        </div>
      </DocumentTitle>
    );
  }
};

export default Album;