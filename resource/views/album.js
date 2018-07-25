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
import NotificationSystem from 'react-notification-system';
import util from '../utils/utils.js';

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
      othersCollection: [],
      masonryOptions:{
        transitionDuration: 500
      },
      wechatCallbackCode:'',
      userInfo:{}
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount(){
    
    let code = this.props.location.query.code;

    let wxUrl = encodeURIComponent(location.href.split('#')[0]);

    this.setState({wechatCallbackCode:code}, ()=>{
      let userinfoSession = this.getUserInfoSession();
      if(userinfoSession){

        let userinfoSessionObj = JSON.parse(userinfoSession);
        this.setState({userInfo:userinfoSessionObj});
        this.shareToFn(userinfoSessionObj.openid);
        this.getImg({openId: userinfoSessionObj.openid});
        
      } else {

        this.getOpenId(code, (openId) => {
          this.shareToFn(openId);
          this.getImg({openId:openId})
        });

      }


      WX.wxSign(wxUrl, (err, res)=>{
        if(err){
          console.log(err);
          return;
        }

        sessionStorage.setItem('wechatToken.binlin.site', res.token);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.config.appId, // 必填，公众号的唯一标识
          timestamp: res.config.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.config.nonceStr, // 必填，生成签名的随机串
          signature: res.config.signature,// 必填，签名，见附录1
          jsApiList: ['chooseImage','uploadImage','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      })
    });
  }

  /**
   * 分享链接点击进来后 从url上获取相册ID 然后获取点击人的openId 进行关联
   * @param  {[type]} openId [description]
   * @return {[type]}        [description]
   */
  shareToFn(openId){
    let id = this.props.location.query.id;
    /**
     * true说明是从分享接口进入
     */
    if(id){
      let idSplit = id.split('@@');
      let shareAlbumId = idSplit[0];
      let shareUserOpenId = idSplit[1];

      /**
       * 自己点链接不添加shareTo
       * @param  {[type]} openId !             [description]
       * @return {[type]}        [description]
       */
      if(openId != shareUserOpenId) {

        API_Upload.shareto({
          "openId": openId,
          "albumId":shareAlbumId
        }, function(err, res){
          if(err){
            console.log(err);
            return;
          }

          this.notify({
            title:'Tip',
            message:'分享成功',
            level:'success'
          })
        })

      }
    }
  }

  /**
   * 已获取openid的情况下 直接从sessionStorage中获取
   * @return {[type]} [description]
   */
  getUserInfoSession() {
    let userinfo = sessionStorage.getItem('userinfo.binlin.site');
    return userinfo;
  }

  notify(obj){
    this._notificationSystem.addNotification(obj);
  }

  /**
   * 通过code获取openId和token
   */
  getOpenId(code, callback) {
    WX.getOpenidByCode({'code':code}, (err, res) => {
      let resParse = JSON.parse(res)
      let token = resParse.access_token;
      let openId = resParse.openid;

      callback(openId)
      this.getUserinfoByToken(token, openId)
    })
  }

  /**
   * 通过token 获取用户信息 
   */
  getUserinfoByToken(token, openid) {
    WX.getUserinfoByToken({'access_token':token, 'openid':openid}, (err, res) => {
      if(err){
        return;
      }
      this.setState({userInfo: res})
      WX.saveWxUser(res, (res)=>{
        console.log('注册成功');
      })

      sessionStorage.setItem('userinfo.binlin.site', JSON.stringify(res));
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

  /**
   * 获取图片
   */
  getImg(option){
    API_Upload.getimg(option, (err, res) => {
      if(err) {
        console.log(err)
        return;
      }

      this.setState({photoCollection: res.selfalbum});
      this.setState({othersCollection: res.othersShare});

      this.dealwithDate(res);
    })

  }

  dealwithDate(res){
    let alldateList = [];

    _.map(res.othersShare, (album) => {
      let dateothersArray = util.timestampToTime(album.edittime[0]);
      album.createTime = dateothersArray;
      alldateList.push(dateothersArray)
    });

    _.map(res.selfalbum, (selfalbum) => {
      let dateselfArray = util.timestampToTime(selfalbum.edittime[0]);
      selfalbum.createTime = dateselfArray;
      alldateList.push(dateselfArray)
    });

    alldateList = _.uniq(alldateList).sort(util.compare);

    let optYear = _.cloneDeep(alldateList);
    let storeYearArr = []
    _.map(optYear, (date)=>{
      date = date.toString().substring(0,date.toString().length-4);
      storeYearArr.push(date)
    });

    /**
     * 获取所有年份
     * @type {[type]}
     */
    storeYearArr = _.uniq(storeYearArr).sort(util.compare);
    
    console.log(res.othersShare, res.selfalbum)

    /**
     * 最终形态
     * [
     *   {
     *     '2018':[{
     *       'MonthDate':'7月1日',
     *       'album':{}
     *     }]
     *   }
     * ]
     */
    let constructorArr = [];

    /**
     * 构造数据
     */
    _.map(storeYearArr, (year)=>{
      let constructorObj = {};
      constructorObj['year'] = year;
      constructorObj['data'] = [];
      constructorArr.push(constructorObj)
    })

    console.log(constructorArr)

    /**
     * 遍历所有日期，插入到对应年份
     */
    _.map(alldateList, (date)=>{
      let year = date.toString().substring(0,date.toString().length-4);

      if(_.indexOf(storeYearArr, year) > -1){
        _.map(constructorArr, (obj)=>{
          if(obj.year == year){
            let ctObj = {};
            ctObj['date'] = date;
            ctObj['othersShare'] = [];
            ctObj['selfalbum'] = []
            obj.data.push(ctObj);
          }
        })
      }
    });

    _.map(res.othersShare, (othersShare) => {
      let year = othersShare.createTime.toString().substring(0,othersShare.createTime.toString().length-4);
      _.map(constructorArr, (obj) => {
        if(obj.year == year) {
          _.map(obj.data, (dateArr)=>{
            if(dateArr.date == othersShare.createTime){
              dateArr.othersShare.push(othersShare);
            }
          })
        }
      })
    });

    _.map(res.selfalbum, (selfalbum) => {
      let year = selfalbum.createTime.toString().substring(0,selfalbum.createTime.toString().length-4);
      _.map(constructorArr, (obj) => {
        if(obj.year == year) {
          _.map(obj.data, (dateArr)=>{
            if(dateArr.date == selfalbum.createTime){
              dateArr.selfalbum.push(selfalbum);
            }
          })
        }
      })
    });

    console.log(constructorArr);

    this.setState({constructorArr:constructorArr})
  }

  render(){
    let { photoCollection, othersCollection, masonryOptions, userInfo, constructorArr } = this.state;
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
            <Link to='photo' query={{city: element.city,_id:element._id}}>
              <span className="view-more">view more</span>
            </Link>
          </div>
        </div>
       );
    });

    let otherElements = othersCollection.map((element, index) => {
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
          <img src={element.belongTo[0].headimgurl} className="share-headimg" />
          <div className="shadow">
            <p className="current-city">{element.city}</p>
            <Link to='photo' query={{city: element.city,_id:element._id}}>
              <span className="view-more">view more</span>
            </Link>
          </div>
        </div>
       );
    });

    return (
      <DocumentTitle title='大冰梨相册'>
        <div>
          <Navicon style={naviconStyle} headimgurl={userInfo.headimgurl}>
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
                  <span className="name">{userInfo.nickname}</span>
                  <span className="text">Photography</span>
                </div>
              </header>

              {
                constructorArr.map((constructorItem, index) => {
                  let currentDate = new Date;
                  let currentyear = currentDate.getFullYear(); 
                  if(constructorItem.year == currentyear){
                    constructorItem.year = '';
                  }
                  return <div>
                    <p className="year-theme">{constructorItem.year}</p>
                      {
                        constructorItem.data.map((dateArr, index) => {
                          let currentMonth = dateArr.date.toString().substring(4,6);
                          let currentDate = dateArr.date.toString().substring(6,8);
                          console.log(currentMonth, currentDate)
                          return <div>
                            <div className="month-year">
                              <span className="current-date">{currentDate}</span><span className="current-month"> {currentMonth}月</span>
                            </div>
                            <Masonry
                                className={'my-gallery-class row'} // default ''
                                elementType={'div'} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            >
                              {
                                dateArr.othersShare.map((othersShare, index) => {

                                  let maxPhotoLength = othersShare.img.length || 0;
                                  let num = 1;

                                  return <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                            <img src={othersShare.img[num].src} />
                                            <img src={othersShare.belongTo[0].headimgurl} className="share-headimg" />
                                            <div className="shadow">
                                              <p className="current-city">{othersShare.city}</p>
                                              <Link to='photo' query={{city: othersShare.city,_id:othersShare._id}}>
                                                <span className="view-more">view more</span>
                                              </Link>
                                            </div>
                                        </div>
                                })
                              }
                              {
                                dateArr.selfalbum.map((selfalbum, index) => {

                                  let maxPhotoLength = selfalbum.img.length || 0;
                                  let num = 1;

                                  return <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                            <img src={selfalbum.img[num].src} />
                                            <img src={selfalbum.belongTo[0].headimgurl} className="share-headimg" />
                                            <div className="shadow">
                                              <p className="current-city">{selfalbum.city}</p>
                                              <Link to='photo' query={{city: selfalbum.city,_id:selfalbum._id}}>
                                                <span className="view-more">view more</span>
                                              </Link>
                                            </div>
                                        </div>
                                })
                              }
                            </Masonry>
                          </div>
                        })
                      }
                  </div>
                })
              }

              <Masonry
                  className={'my-gallery-class row'} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                  {otherElements}
              </Masonry>

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
          <NotificationSystem ref="notificationSystem" style={false} />
        </div>
      </DocumentTitle>
    );
  }
};

export default Album;