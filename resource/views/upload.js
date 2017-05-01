/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/upload.css';
import util from '../utils/utils.js';

class Upload extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      filesArr: []
    }
  }

  chooseImg(e){
    let et = e.target.files;
    this.setState({filesArr: et},()=>{
      _.map(et, (file) => {
        this.file2canvas(file);
      })
    });
  }

  addImg(e){
    let storeFiles = _.union(this.state.filesArr,e.target.files);
    console.log(storeFiles);
    this.setState({filesArr: storeFiles});
  }

  uploadImg(){
    var uploadFileFormData = new FormData();
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

  file2canvas(files){
    util.readBlobAsDataURL(files, (dataurl)=>{
      console.log(dataurl)
    })
  }

  render(){
    return (
      <div>
        <div className="wu-example" id="uploader">
          <div className="queueList">
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

          <div className="statusBar">
            <div className="info">选中一张图片,共676.26k</div>
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

