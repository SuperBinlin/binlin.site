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
  wxSign (url, callback) {
    fetch(API.wxSign+"?wxurl="+url, {
      method: 'GET'
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(arr){
          console.log(arr)
          callback(null, arr)
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

  getOpenidByCode(code, callback){
    fetch(API.getOpenidByCode, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(code)
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(res){
          console.log(res)
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