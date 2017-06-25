/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/upload.css';
import util from '../utils/utils.js';
import Photo from '../components/photo.js';
import Label from '../components/label.js';
import API_Location from '../service/location.service.js';
import API_Upload from '../service/upload.service.js';
/**
 * https://github.com/igorprado/react-notification-system
 */
import NotificationSystem from 'react-notification-system';

class Upload extends React.Component{

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
      hiddenId:''                       // label所对应的id
    }

    this._notificationSystem = null;
    //this._selectCity = this._selectCity.bind(this)
  }


  componentWillMount() {
    /**
     * 获取label标签
     * @param  {[type]} (err,res [description]
     * @return {[type]}          [description]
     */
    API_Location.getLocation((err,res) => {
      if(err){
        console.info(err);
        return;
      }
      if(res){
        this.setState({labeList: res.location})
        this.setState({hiddenId: res._id})
      }
    })
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
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
    console.log(et)
    this.resetState(et);
  }

  addImg(e){                           // 继续添加
    let et = e.target.files;
    this.resetState(et);
    let storeFiles = _.union(this.state.filesArr,et);  // 合并state与新添加的file对象
    console.log(storeFiles);
    this.setState({filesArr: storeFiles});
  }

  /**
   * 点击开始上传时 有2步与后台交互：1、见图片以及选中的label传给后台 2、将现有的label增加到后台
   * @return {[type]} [description]
   */
  uploadImg(){

    // STEP ONE
    let uploadFileFormData = new FormData(),
        uploadPermission = true;


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
    : _.map(this.state.filesArr, (file)=>{                          //上传多文件时 
        uploadFileFormData.append('file',file)
      });

    uploadPermission ?
    //STEP ONE
    (function(_this){
      API_Upload.upload(uploadFileFormData, (err, res)=>{
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
      }) 
      //STEP TWO
      let labelOpt = {};
      labelOpt.location = _this.state.labeList;
      if(_this.state.hiddenId !== '') {
        labelOpt.id = _this.state.hiddenId;
      }
      
      API_Location.setLocation (labelOpt, (err, res)=>{
        console.log(res)
        _this.initData();
      })

    }(this))
    : '';

  }

  initData(){
    this.setState({
      imgBase:[],
      beSelectCity:'',
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

  render(){
    let {imgBase, fileInfo, labeList, beSelectCity, hiddenId} = this.state;

    /**
     * 引入classnames库 帮助控制多个className
     * @type {[type]}
     */
    let uploadWp = classNames({
      'queueList': true,
      'placeholder-hide': this.state.filesArr.length != 0             // 无图片时展示上传图片按钮
    });

    let showWp = classNames({
      'queueList': true,
      'filled': true,
      'placeholder-hide': this.state.filesArr.length == 0             // 有图片时 展示图片预览
    });
    
    return (
      <div>
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
                    <label className="file-label">
                      <input type="file" className="webuploader-element-invisible" multiple="multiple" accept="image/jpg,image/jpeg,image/png" onChange={ (e)=>this.chooseImg(e) } />
                    </label>
                  </div>
              </div>
              <div className="filelist">

              </div>
            </div>

          </div>

          <div className={showWp}>
            <ul className="filelist">
              {
                imgBase.map(function(obj, index){
                  return <Photo key={index} src={obj}></Photo>
                })
              }
            </ul>
          </div>

          <div className="statusBar">
            <div className="info">选中{fileInfo.number}张图片,共{fileInfo.size.toFixed(2)}M</div>
            <div className="btns">
              <div className="webuploader-container">
                <div className="webuploader-pick fl">继续添加</div>
                <div className="file-wp-status">
                  <label className="file-labels">
                    <input type="file" className="webuploader-element-invisible" multiple="multiple" accept="image/jpg,image/jpeg,image/png" onChange={ (e)=>this.addImg(e) }/>
                  </label>
                </div>
                <div className="uploadBtn state-ready fl" onClick={ (e)=>this.uploadImg() }>开始上传</div>
              </div>
            </div>
          </div>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
};

export default Upload;

