/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/upload.css';
import DocumentTitle from'react-document-title';
import util from '../utils/utils.js';
import Photo from '../components/photo.js';
import Label from '../components/label.js';
import API_Location from '../service/location.service.js';
import API_Upload from '../service/upload.service.js';
import WX from '../service/wx.service.js';

/**
 * https://github.com/igorprado/react-notification-system
 */
import NotificationSystem from 'react-notification-system';

class Wechatupload extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      filesArr: [],                     // file对象存储 最终传到后台
      fileInfo:{                        // 存储file信息
        number:0,                       // 照片数
        size:0                          // 照片总大小
      },
      imgBase:[],                       // img base64存储 用于预览
      labeList:[],                      // 标签列表展示数据
      beSelectCity:'',                  // 被选中的标签 
      hiddenId:'',                      // label所对应的id
      userInfo:{},
      serveIdArr:[],                    // 微信服务器端ID
      deb:'tttttt'
    }

    this._notificationSystem = null;
    //this._selectCity = this._selectCity.bind(this)
  }


  componentWillMount() {    
    /**
     * 获取userInfo
     */
    let userInfo = sessionStorage.getItem('userinfo.binlin.site');

    this.setState({
      userInfo: JSON.parse(userInfo)
    });
  }

  componentDidMount() {

    this._notificationSystem = this.refs.notificationSystem;

    /**
     * 获取label标签
     * @param  {[type]} (err,res [description]
     * @return {[type]}          [description]
     */
    console.log(this.state.userInfo)
    API_Location.getLocation({openId:this.state.userInfo.openid}, (err,res) => {
      if(err){
        this.notify({
          title:'Tip',
          message:err,
          level:'error'
        })
        return;
      }
      if(res){
        this.setState({labeList: res.location})
        this.setState({hiddenId: res._id})
      }
    })
  }

  /**
   * {
   *   title:'Notification title',
   *   message: 'Notification message',
   *   level: 'success'
   * }
   */
  notify(obj){
    this._notificationSystem.addNotification(obj);
  }

  chooseImg(e){                        // 上传图片
    let et = e.target.files;
    this.resetState(et);
  }

  /**
   * 点击开始上传时 有2步与后台交互：1、见图片以及选中的label传给后台 2、将现有的label增加到后台
   * @return {[type]} [description]
   */
  uploadImg(){

    // STEP ONE
    let uploadFileFormData = new FormData(),
        uploadPermission = true;

    uploadFileFormData.append('openId',this.state.userInfo.openid);

    /**
     * label 非空判断
     * @type {[type]}
     */
    this.state.beSelectCity == '' ? 
    this.notify({
      title:'Tip',
      message:'请选择一个标签',
      level:'error',
      onAdd:()=>{
        uploadPermission =false;
      }
    })
    : uploadFileFormData.append('city',this.state.beSelectCity);

    this.state.filesArr.length == 0 ? 
    this.notify({
      title:'Tip',
      message:'请至少选择一张图片',
      level:'error',
      onAdd:()=>{
        uploadPermission =false;
      }
    })
    : _.map(this.state.filesArr, (file)=>{                     //上传多文件时 
        uploadFileFormData.append('file',file)
      });

    uploadPermission ?
    
    (function(_this){
      //STEP TWO
      let labelOpt = {};
      labelOpt.location = _this.state.labeList;
      labelOpt.openId = _this.state.userInfo.openid;

      if(_this.state.hiddenId !== '') {
        labelOpt.id = _this.state.hiddenId;
      }
      
      API_Location.setLocation (labelOpt, (err, res)=>{
        console.log(res)
      })
      //STEP ONE
      API_Upload.uploadtoqiniu(uploadFileFormData, (err, res)=>{
        if(err){
          console.error(err);
          _this.notify({
            title:'Tip',
            message:'上传失败 '+ err.msg,
            level:'error'
          })
          return;
        }
        console.log(res)
        _this.notify({
          title:'Tip',
          message:res.msg,
          level:'info'
        })
        _this.initData();
      }) 

    }(this))
    : '';

  }

  initData(){
    this.setState({
      imgBase:[],
      filesArr: [],                    
      fileInfo:{                       
        number:0,                      
        size:0                         
      },
    })
  }

 /**
  * [resetState description]
  * @param  {[type]} et [上传的文件]
  * @return {[type]}    [description]
  * 将上传文件暂存进filesArr,等待调用uploadImg上传至服务器
  */
  resetState(et){                                           // 重写filesArr
    let fileInfo = {
      number:0,                       
      size:this.state.fileInfo.size
    }

    this.setState({filesArr: et},()=>{                      // 添加预览
      fileInfo.number = this.state.filesArr.length;
      _.map(et, (file) => {
        fileInfo.size = fileInfo.size+ file.size/1000000;   // 转出单位为M
        this.file2canvas(file);
      })
      this.setState({fileInfo:fileInfo})
    });
  }

  /**
   * TODO 性能后期可优化
   */
  file2canvas(files){
    util.readBlobAsDataURL(files, (dataurl)=>{
      let storeImg = this.state.imgBase;                    // 获取图片暂存
      storeImg.push(dataurl);                               // push 新图片
      this.setState({imgBase:storeImg})                     // 重写入states中
    })
  }

  /**
   * [_selectCity description]
   * @param  {[type]} i [城市索引]
   * @return {[type]}   [description]
   */
  _selectCity = (i) => {
    let labeList = this.state.labeList;
    let beSelectCity;
    _.map(labeList, (list, index)=>{
      if(i == index) {
        list.actived = true;
        beSelectCity = list.city;
      } else {
        list.actived = false;
      }
    });

    this.setState({
      labeList:labeList,                                    // setState触发render渲染
      beSelectCity:beSelectCity
    })                                   
  }

  /**
   * 添加标签，获取添加的城市，将添加的城市更行只state.labeList中
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  _addCity = (e) => {
    let labeList = this.state.labeList; 
    let label = e.target.value;
    label == "" ? '' :
    labeList.push({'city':e.target.value})
    this.setState({
      labeList:labeList
    })
  }

  /**
   * 选择图片获取localIds
   * @return {[type]} [description]
   */
  chooseImgWechat(){
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        this.setState({imgBase:localIds})
      }
    });
  }

  addImg(){     
    let currentImg = this.state.imgBase;
    let existAlbumLength = 9 - currentImg.length;
    wx.chooseImage({
      count: existAlbumLength, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        let finalImgBase = currentImg.concat(localIds);
        this.setState({imgBase:finalImgBase});
      }
    });
  }

  uploadToWx(localIds){
    return new Promise(function(resolve, reject){
      wx.uploadImage({
        localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: (res) => {
          resolve(res.serverId);
        }
      })
    })
  }

  uploadImgToWechat(){
    async function getServeArr(_this, city){
      let labelOpt = {};
      labelOpt.location = _this.state.labeList;
      labelOpt.openId = _this.state.userInfo.openid;

      if(_this.state.hiddenId !== '') {
        labelOpt.id = _this.state.hiddenId;
      }
      
      API_Location.setLocation (labelOpt, (err, res)=>{
        console.log(res)
      })


      let token = sessionStorage.getItem('wechatToken.binlin.site'),
        serveIdArr = [], serverId;

      for(var localIds of _this.state.imgBase) {
        serverId = await _this.uploadToWx(localIds);
        serveIdArr.push(serverId)
      }

      console.log(serveIdArr)
      _this.setState({serveIdArr});


      let option = {
        'token':token,
        'mediaArr':serveIdArr,
        'openId':_this.state.userInfo.openid,
        'city':city,
      }
      /**
       * 将获取到的serveId传回后端 在后端通过serveId直接传到七牛
       */
      WX.uploadImageFromWechatToQiniu(option, (err, res)=>{
        _this.initData();
        let deb = JSON.stringify(res);
        if(err) {
          console.log(err);
          _this.notify({
            title:'Tip',
            message:'上传失败',
            level:'error'
          })
          return;
        }
        _this.setState({deb:deb});
        _this.notify({
          title:'Tip',
          message:res.msg,
          level:'info'
        })

        _this.initData();
      })


    }

    let uploadPermission = true, city;

    this.state.beSelectCity == '' ? 
    this.notify({
      title:'Tip',
      message:'请选择一个标签',
      level:'error',
      onAdd:()=>{
        uploadPermission =false;
      }
    })
    : city = this.state.beSelectCity;

    this.state.imgBase.length == 0 ?
    this.notify({
      title:'Tip',
      message:'请至少选择一张照片',
      level:'error',
      onAdd:()=>{
        uploadPermission =false;
      }
    })
    : '';

    uploadPermission ? getServeArr(this, city) : '';   
  }

  render(){
    let {deb, imgBase, serveIdArr, fileInfo, labeList, beSelectCity, hiddenId} = this.state;
    /**
     * 引入classnames库 帮助控制多个className
     * @type {[type]}
     */
    let uploadWp = classNames({
      'queueList': true,
      'placeholder-hide': this.state.imgBase.length != 0             // 无图片时展示上传图片按钮
    });

    let showWp = classNames({
      'queueList': true,
      'filled': true,
      'placeholder-hide': this.state.imgBase.length == 0             // 有图片时 展示图片预览
    });
    
    return (
      <div className="container-fluid">
        <Label labelList={labeList} _selectCity={this._selectCity} _addCity={this._addCity}></Label>
        <input type="hidden" value={hiddenId} />
        <div className="wu-example" id="uploader">
          <div className={uploadWp}>
            <div className="placeholder">
              <div className="webuploader-container">
                <div className="webuploader-pick">
                  点击选择图片
                </div>
                  <div className="file-wp">
                    <label className="file-label" onClick={ (e)=>this.chooseImgWechat() }></label>
                  </div>
              </div>
              <div className="filelist">

              </div>
            </div>

          </div>

          <div className={showWp}>
            <ul className="filelist">
              {
                imgBase.map(function(obj, index) {
                  return <Photo key={index} src={obj}></Photo>
                })
              }
            </ul>
          </div>

          <div className="statusBar">
            <div className="info">选中{imgBase.length}张图片{deb}</div>
            <div className="btns">
              <div className="webuploader-container">
                <div className="webuploader-pick fl" onClick={ (e)=>this.addImg() }>继续添加</div>
                <div className="uploadBtn state-ready fl" onClick={ (e)=>this.uploadImgToWechat() }>开始上传</div>
              </div>
            </div>
          </div>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
};

export default Wechatupload;