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
            </div>
          </Navicon>
          
        </div>
      </DocumentTitle>
    );
  }
};

export default Album;