/**
 * @date: 2017/06/20
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

import * as API from './api/api'

export default {
  upload (formdata,callback) {
    fetch(API.UPLOAD, {
      method: 'POST',
      body: formdata
    }).then((res) => {
      callback(null,res)
    }).catch((err) => {
      callback(err)
    })
  },

  getimg (callback){
    fetch(API.GETIMG, {
      method: 'GET',
    }).then((res) => {
      if (res.ok){
        res.json().then(function(arr){
          callback(null, arr)
        })
      }else{
        callback({
          'msg':'返回错误'
        })
      }
    }).catch((err) => {
      callback(err)
    })
  }
}