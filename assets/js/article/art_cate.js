/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-28 19:54:15
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-29 15:47:29
 * @FilePath: /web_event_management/assets/js/article/art_cate.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {
    var layer = layui.layer
    var form = layui.form
    // 先初始化数据
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        var layer = layui.layer
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var html = template('tpl-table', res)
                $('tbody').html(html)
            }
        })
    }

    //  添加分类按钮的事件监听
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        // 阻止默认提交事件
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理的形式，为编辑按钮添加绑定事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')

        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.message !== 0) return layer.msg(res.message)
                layer.close(indexEdit)
                layer.msg(res.message)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')

        // 提示用户是否要删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    layer.close(index)
                    initArtCateList()
                }
            })
          })
    })
})