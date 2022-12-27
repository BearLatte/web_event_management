/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-27 22:34:52
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 01:38:16
 * @FilePath: /web_event_management/assets/js/login.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {
    // 点击 "去注册账号" 的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 ”去登录“ 的链接
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer

    // 开始自定校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空白字符'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则 return 一个消息提示
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致!'
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止表单的默认提交事件
        e.preventDefault()

        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
            repassword: $('#form-reg [name=repassword]').val()
        }

        // 发起 ajax 请求
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功，请登录!')
            // 模拟人的点击行为
            $('#link-login').click()
        })
    })

    // 登录表单的提交事件
    $('#form-login').submit(function (e) {
        // 阻止表单的默认提交事件
        e.preventDefault();

        // 发起 ajax 请求
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)

                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)

                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})