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
import '../css/introjs.css';
import '../css/introjs-nassim.css';
import { Steps, Hints } from 'intro.js-react';
import { browserHistory } from 'react-router'

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
      userInfo:{},
      constructorArr:[],
      steps: [
        // {
        //   element: '.nav-button__open',
        //   intro: '点此展开菜单',
        // },
        // {
        //   element: '.text',
        //   intro: 'World step',
        // },
      ],
      stepsEnabled: false,
      initialStep: 0,
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    // this.toggleSteps();

    let wxUrl = location.href.split('#')[0];

    sessionStorage.setItem('wxRealUrl', wxUrl);
    WX.wxSign({wxUrl:wxUrl}, (err, res)=>{
      if(err){
        console.log(err);
        return;
      }

      sessionStorage.setItem('wechatToken.binlin.site', res.token);
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.config.appId, // 必填，公众号的唯一标识
        timestamp: res.config.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.config.nonceStr, // 必填，生成签名的随机串
        signature: res.config.signature,// 必填，签名，见附录1
        jsApiList: ['chooseImage','uploadImage','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      wx.ready(() => {

        wx.onMenuShareAppMessage({
          title: 'test！！！', // 分享标题
          desc: '大冰梨相册冰住我的瞬间', // 分享描述
          //link: 'http://binlin.site/shareLink?id='+idCollect, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link:'http://binlin.natapp1.cc',
          imgUrl: 'http://album.binlin.site/homepage.png', // 分享图标
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

      wx.error(function(res){
          alert(JSON.stringify(res))// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    })
  }

  componentWillMount(){
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    const _not_first_invite = sessionStorage.getItem('album_not_first_invite');
    if ( !_not_first_invite && isiOS) {
      sessionStorage.setItem('album_not_first_invite', '1');
      window.location.reload();
    } else {
      let code = this.props.location.query.code;

      this.setState({wechatCallbackCode:code}, ()=>{
        let userinfoSession = this.getUserInfoSession();
        if(userinfoSession){

          let userinfoSessionObj = JSON.parse(userinfoSession);
          this.setState({userInfo:userinfoSessionObj});
          this.shareToFn(userinfoSessionObj.openid).then(()=>{
            this.getImg({openId: userinfoSessionObj.openid});
          });

        } else {

          this.getOpenId(code, (openId) => {
            this.shareToFn(openId).then(()=>{
              this.getImg({openId:openId})
            });
          });

        }

      });
    }
  }

  componentWillUnmount(){
    sessionStorage.removeItem('album_not_first_invite');
  }

  /**
   * 分享链接点击进来后 从url上获取相册ID 然后获取点击人的openId 进行关联
   * @param  {[type]} openId [description]
   * @return {[type]}        [description]
   */
  shareToFn(openId){
    return new Promise((resolve, reject) => {
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
            // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa266785ae98ca648&redirect_uri=http://natapp.binlin.site/album&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
            resolve()
            // this.notify({
            //   title:'Tip',
            //   message:'分享成功',
            //   level:'success'
            // })
          })
        } else {
          resolve()
        }
      } else {
        resolve();
      }
    })
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
        console.log(err);
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
      console.log(date)
      date = date.toString().substring(0,date.toString().length-4);
      console.log(date)
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

  onExit() {
    this.setState({ stepsEnabled: false });
  }

  toggleSteps() {
    this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
  }

  _uploadImg() {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        // let req = {
        //   pathname: "/wechatupload",
        //   query: {
        //     data: 'aa'
        //   }
        // };
        console.log(localIds)
        let localIdsStr = localIds.join('-');
        let path = `/wechatupload?localid=${localIdsStr}`;
        browserHistory.push(path)
        // this.setState({imgBase:localIds})
      },
      fail: (err) => {

      }
    });
  }

  render(){
    let { photoCollection, othersCollection, masonryOptions, userInfo, constructorArr, steps, stepsEnabled, initialStep } = this.state;
    /**
     * navicon component style
     * @type {Object}
     */
    const naviconStyle= {
      position:'absolute',
      top:'20px',
      right:'4px'
    }

    return (
      <DocumentTitle title='大冰梨相册'>
        <div>
          <Steps
            enabled={stepsEnabled}
            steps={steps}
            initialStep={initialStep}
            onExit={()=>{this.onExit}}
          />
          <Navicon style={naviconStyle} headimgurl={userInfo.headimgurl} _uploadImg={this._uploadImg}>
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
                  console.log(constructorArr)
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
                                  let num = this.randomNum(0, maxPhotoLength);

                                  return <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                            <Link to='photo' query={{city: othersShare.city,_id:othersShare._id}}>
                                              <img src={othersShare.img[num].src} />
                                              <img src={othersShare.belongTo[0].headimgurl} className="share-headimg" />
                                              <div className="shadow">
                                                <p className="current-city">{othersShare.city}</p>
                                                  <span className="view-more">view more</span>
                                              </div>
                                            </Link>
                                        </div>
                                })
                              }
                              </Masonry>
                              <Masonry
                                className={'my-gallery-class row'} // default ''
                                elementType={'div'} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              >
                              {
                                dateArr.selfalbum.map((selfalbum, index) => {

                                  let maxPhotoLength = selfalbum.img.length || 0;
                                  let num = this.randomNum(0, maxPhotoLength);

                                  return <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                            <Link to='photo' query={{city: encodeURIComponent(selfalbum.city),_id:selfalbum._id}}>
                                              <img src={selfalbum.img[num].src} />
                                              <div className="shadow">
                                                <p className="current-city">{selfalbum.city}</p>
                                                  <span className="view-more">view more</span>
                                              </div>
                                            </Link>
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

            </div>
          </Navicon>
          <NotificationSystem ref="notificationSystem" style={false} />
        </div>
      </DocumentTitle>
    );
  }
};

export default Album;
