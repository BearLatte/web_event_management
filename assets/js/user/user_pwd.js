/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 17:23:36
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 18:00:05
 * @FilePath: /web_event_management/assets/js/user/user_pwd.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {
    // 获取 layui 的 form 表单
    var form = layui.form

    // 导入 layui 的 layer 层
    var layer = layui.layer

    // 密码的表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('.layui-form [name=oldPwd]').val()) return '新旧密码不能相同!'
        },
        rePwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则 return 一个消息提示
            var pwd = $('.layui-form [name=newPwd]').val()
            if (pwd !== value) return '两次密码不一致!'
        }
    })

    // 监听提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})