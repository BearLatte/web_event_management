/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 01:39:59
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 15:11:10
 * @FilePath: /web_event_management/assets/js/baseApi.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */

// 注意：每次调用每次调用 $.get() 或 $.post() 或 $.ajax 的时候
// 会先调用 ajaxPrefilter() 这个函数
// 在这个函数中，可以拿到配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 ajax 请求之前，统一拼接 baseURL
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的，设置 headers 请求对象
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂在 complete 回调函数
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = function (res) {
        // 在 complete 回调函数用可以使用 responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})