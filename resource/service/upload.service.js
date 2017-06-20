/**
 * @date: 2017/06/20
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

import * as API from './api/api'

export default {
  upload (formdata,callback) {
    fetch('/api/upload', {
      method: 'POST',
      body: formdata
    }).then((data)=>{
      callback(null,data)
    }).catch((err)=>{
      callback(err)
    })
  }
}