/**
 * @date: 2017/05/01
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

export default {
	readBlobAsDataURL(blob, callback) {                       //file对象转换成canvas
		var fileType = blob.type;
    var fileReader = new FileReader();
    fileReader.readAsDataURL(blob);  
    fileReader.onload = function(e) {
    	var result = e.target.result;													//返回的没压缩过的base64
    	var image = new Image();
    	image.src = result;

    	image.onload = function(){
    		var cvs = document.createElement('canvas');  
        var scale = this.width / this.height;               //计算宽高比
        cvs.width = 200;
        cvs.height = cvs.width / scale;

        var ctx = cvs.getContext('2d');
        ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
        var newImageData = cvs.toDataURL(fileType, 0.8);    //重新生成图片
        // var imgBase = newImageData.replace("data:"+fileType+";base64,",'');
        callback(newImageData)
    	}
    };
	}
}