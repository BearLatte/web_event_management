/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 16:27:07
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 17:15:07
 * @FilePath: /web_event_management/assets/js/user_info.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {
    // 导入 layui 的 form
    var form = layui.form

    // 导入 layui 的 layer 弹出层
    var layer = layui.layer

    // 创建验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间!'
        }
    })

    // 执行获取用户基本信息函数
    getUserInfo()

    // 定义一个函数，用于获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                // 调用 form.val() 快速将用户信息填充到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        getUserInfo()
    })

    // 提交信息事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()

        // 发起 ajax 请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)

                // 调用父页面中的方法，重新渲染用户的头像和用户昵称
                window.parent.getUserInfo()
            }
        })
    })
})


