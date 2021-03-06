/**
 * @date: 2017/06/20
 * @author: zhangbin
 * @e-mail: superbinlin@163.com
 * @see: http://binlin.site:8889/#/resume
 */

import * as API from './api/api';
/**
 * 在此不引用 移动端会报fetch 
 */
import 'whatwg-fetch';

export default {
  getLocation (data, callback) {
    fetch(API.GETLOCATION, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'openId':data.openId
      },
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(arr){
          callback(null, arr[0])
        })
      }else{
        callback({
          'msg':'返回错误'
        })
      }
    }).catch((err)=>{
      callback({
        'mes': err
      })
    });
  },

  setLocation (data, callback) {
    fetch(API.SETLOCATION, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'openId':data.openId
      },
      method:'POST',
      body:JSON.stringify(data)
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(res){
          callback(null, res)
        })
      }else{
        callback({
          'msg':'返回错误'
        })
      }
    }).catch((err)=>{
      callback({
        'mes': err
      })
    });
  }
}