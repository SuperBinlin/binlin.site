/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/upload.css';

class Upload extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      filesArr: []
    }
  }

  uploadImg(e){
    var uploadFileFormData = new FormData();
    this.setState({filesArr: e.target.files}, function () {
      _.map(this.state.filesArr, (file)=>{
        console.info(file)
        uploadFileFormData.append('file',file)
      })

      // fetch('/api/upload', {
      //   method: 'POST',
      //   body: uploadFileFormData
      // }).then((data)=>{
      //   console.log(data)
      // }).catch((err)=>{
      //   console.warn(err)
      // })
    });

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
                      <input type="file" className="webuploader-element-invisible" multiple="multiple" accept="image/jpg,image/jpeg,image/png" onChange={ (e)=>this.uploadImg(e) } />
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
                    <input type="file" className="webuploader-element-invisible" multiple="multiple" accept="image/jpg,image/jpeg,image/png" />
                  </label>
                </div>
                <div className="uploadBtn state-ready fl">开始上传</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Upload;

