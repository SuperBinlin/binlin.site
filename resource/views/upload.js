/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/upload.css';
import util from '../utils/utils.js';
import Photo from '../components/photo.js'

class Upload extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      filesArr: [],                     // file对象存储 最终传到后台
      fileInfo:{                        // 存储file信息
        number:0,                       // 照片数
        size:0                          // 照片总大小
      },
      imgBase:[]                        // img base64存储 用于预览
    }
  }

  chooseImg(e){                        // 上传图片
    let et = e.target.files;
    this.resetState(et);
  }

  addImg(e){                           // 继续添加
    let et = e.target.files;
    this.resetState(et);

    let storeFiles = _.union(this.state.filesArr,et);  // 合并state与新添加的file对象
    console.log(storeFiles);
    this.setState({filesArr: storeFiles});
  }

  uploadImg(){
    let uploadFileFormData = new FormData();
    _.map(this.state.filesArr, (file)=>{                          //上传多文件时 
        console.info(file)
        uploadFileFormData.append('file',file)
      })

      //uploadFileFormData.append('username','test123321')

      fetch('/api/upload', {
        method: 'POST',
        body: uploadFileFormData
      }).then((data)=>{
        console.log(data)
      }).catch((err)=>{
        console.warn(err)
      })
  }

  resetState(et){                                           // 重写filesArr
    let fileInfo = {
      number:0,                       
      size:this.state.fileInfo.size
    }

    this.setState({filesArr: et},()=>{                      // 添加预览
      fileInfo.number = this.state.filesArr.length;
      _.map(et, (file) => {
        fileInfo.size = fileInfo.size+ file.size/1000000;  // 转出单位为M
        this.file2canvas(file);
      })
      this.setState({fileInfo:fileInfo})
    });
  }

  file2canvas(files){
    util.readBlobAsDataURL(files, (dataurl)=>{
      let storeImg = this.state.imgBase;                    // 获取图片暂存
      storeImg.push(dataurl);                               // push 新图片
      this.setState({imgBase:storeImg})                     // 重写入states中
    })
  }

  render(){
    let {imgBase, fileInfo} = this.state;

    /**
     * 引入classnames库 帮助控制多个className
     * @type {[type]}
     */
    var uploadWp = classNames({
      queueList: true,
      'placeholder-hide': this.state.filesArr.length != 0             // 无图片时展示上传图片按钮
    });

    var showWp = classNames({
      queueList: true,
      filled: true,
      'placeholder-hide': this.state.filesArr.length == 0             // 有图片时 展示图片预览
    });
    
    return (
      <div>
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
      </div>
    );
  }
};

export default Upload;

