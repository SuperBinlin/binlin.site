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
	},
  checkMobile(s){  
    var length = s.length;
    if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s) )  
    {  
        return true;  
    }else{  
        return false;  
    }  
  },
  /**
   * 范围内取随机数
   * @param {[type]} Min [description]
   * @param {[type]} Max [description]
   */
  randomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  },  

  /**
   * 数组从小到大排序
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  compare(val1,val2){
    return val2 - val1;
  },

  /**
   * 时间戳转日期
   * @param  {[type]} timestamp [description]
   * @return {[type]}           [description]
   */
  timestampToTime(timestamp) {
    var date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear(),
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1),
    D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
    return parseInt(Y.toString()+M.toString()+D.toString());
  }
}