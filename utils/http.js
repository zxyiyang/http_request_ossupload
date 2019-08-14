import {
    config
  } from '../config.js'
  
  const tips = {
    1: '抱歉，出现了一个错误',
    1007: 'url路径错误',
    1005: '不正确的开发者key',
    3000: '该期内容不存在'
  }
  
  class HTTP {
    request({url, data={}, method='GET'}){
      return new Promise((resolve, reject)=>{
        this._request(url, resolve, reject, data, method)
      })
    }
  
    _request(url, resolve, reject, data={}, method='GET') {
        wx.showLoading({title:"loading data...",mask:true})
      wx.request({
        url: config.api_base_url + url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'userid': config.appkey
        },
        success: (res) => {
          const code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res.data)
          } else {
            reject()
            const errorCode = res.data.error_code
            this._showError(errorCode)
          }
        },
        fail: (err) => {
          reject()
          this._showError(1)
        },
        complete:(com)=>{
            wx.hideLoading()
        }
      })
    }
  
    _showError(errorCode) {
      if (!errorCode) {
        errorCode = 1
      }
      const tip = tips[errorCode]
      wx.showToast({
        title: tip ? tip : tips[1],
        icon: 'none',
        duration: 2000
      })
    }
  }
  
  export {
    HTTP
  }