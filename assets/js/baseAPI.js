/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 01:39:59
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 01:45:47
 * @FilePath: /web_event_management/assets/js/baseApi.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */

// 注意：每次调用每次调用 $.get() 或 $.post() 或 $.ajax 的时候
// 会先调用 ajaxPrefilter() 这个函数
// 在这个函数中，可以拿到配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的 ajax 请求之前，统一拼接 baseURL
    options.url = 'http://www.liulongbin.top:3007' + options.url
})