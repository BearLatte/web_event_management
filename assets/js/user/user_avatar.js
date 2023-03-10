/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 18:24:21
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-28 19:11:03
 * @FilePath: /web_event_management/assets/js/user/user_avatar.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */

$(function () {
    // var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件，从事件传参中可以拿到用户当前选择的图片
    $('#file').on('change', function (e) {
        // 获取选择的文件
        var fileList = e.target.files
        if(fileList.length === 0) return layui.layer.msg('请选择图片!')
        
        // 1. 拿到用户选择的文件
        var file = fileList[0]

        // 2. 将文件转化为 URL 路径
        var newImgURL = URL.createObjectURL(file)

        // 3. 重新初始化 cropper 的裁剪区
        $image
        .cropper('destroy')     // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options)       // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        // 1. 拿到用户裁剪之后的头像
        var base64_data = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        .toDataURL('image/png')

        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: base64_data },
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 用上层的获取用户信息重新加载头像
                window.parent.getUserInfo()
            }
        })
    })
})