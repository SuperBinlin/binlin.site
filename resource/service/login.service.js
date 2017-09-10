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
  confirmname (data,callback) {
    return new Promise((resolve,reject) => {
      fetch(API.CONFIRMNAME, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(data)
      }).then((res) => {
        if (res.ok){
          res.json().then(function(res){
            resolve(res.msg)
          })
        }else{
          reject({
            'msg':'请检查网络'
          })
        }
      }).catch((err)=>{
        reject({
          'mes': err
        })
      })
    })
  },
  getConfirm (data, callback) {
    fetch(API.GETCONFIRMCODE, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(data)
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(res){
          callback(null, res)
        })
      }else{
        callback({
          'msg':'请检查网络'
        })
      }
    }).catch((err)=>{
      callback({
        'mes': err
      })
    });
  },
  login (loginInfo, callback) {
    fetch(API.LOGIN, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(loginInfo)
    }).then((res) => {
      if (res.ok){
        res.json().then(function(res){
          callback(null, res)
        })
      }else{
        callback({
          'msg':'请检查网络'
        })
      }
    })
  },
  register (data, callback) {
    fetch(API.REGISTER, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(data)
    }).then((res)=>{
      if (res.ok){
        res.json().then(function(res){
          callback(null, res)
        })
      }else{
        callback({
          'msg':'请检查网络'
        })
      }
    }).catch((err)=>{
      callback({
        'mes': err
      })
    });
  }
}