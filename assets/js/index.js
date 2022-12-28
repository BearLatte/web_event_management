/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 13:51:35
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 15:09:12
 * @FilePath: /web_event_management/assets/js/index.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {
    // 调用 getUserInfo() 函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页
            location.href = '/login.html'

            layer.close(index);
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            // 调用 renderAvatar() 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像函数
function renderAvatar(user) {
    // 1. 获取用户名称
    var name = user.nickname || user.username
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}