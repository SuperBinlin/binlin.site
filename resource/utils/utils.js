/**
 * @date: 2017/05/01
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

export default {
	readBlobAsDataURL(blob, callback) {                       //file对象转换成canvas
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);};
    a.readAsDataURL(blob);
	}
}