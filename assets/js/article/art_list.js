/*
 * @Author: Tim guoyong19890907@gmail.com
 * @Date: 2022-12-29 15:51:05
 * @LastEditors: Tim guoyong19890907@gmail.com
 * @LastEditTime: 2022-12-29 19:30:37
 * @FilePath: /web_event_management/assets/js/article/art_list.js
 * @Description: 
 * Copyright (c) 2022 by Tim email: guoyong19890907@gmail.com, All Rights Reserved.
 */
$(function () {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date(date)

        var year = dt.getFullYear()
        var month = padZero(dt.getMonth() + 1)
        var day = padZero(dt.getDate())

        var hour = padZero(dt.getHours())
        var minute = padZero(dt.getMinutes())
        var second = padZero(dt.getSeconds())

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,         // 页码值，默认请求第一页的数据
        pagesize: 10,        // 每页显示几条数据，默认每页显示两条
        cate_id: '',        // 文章分类的 Id
        state: ''           // 文章发布状态
    }

    initTable()
    initCate()

    // 获取文章列表数据的函数
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                // 使用模板引擎渲染页面的数据
                var html = template('tpl-table', res)
                $('tbody').html(html)

                // 渲染分页数据
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的函数
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通知 layui 重新渲染表单区域的 UI 结构
                form.render()
            }
        })
    }

    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        // 为查询参数对象对应的属性赋值
        q.cate_id = cate_id
        q.state = state


        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox',    // 分页容器的 id
            count: total,       // 总数据条数
            limit: q.pagesize,  // 每页像是几条数据
            curr: q.pagenum,    // 默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回到的方式有两种
            // 1. 点击页面的时候，会触发 jump 回调；
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，判断是通过那种方式触发的 jump 回调
                // 如果 first 的值为 true，证明是方式 2 触发的
                // 否则是方式 1 触发的

                // 将最新的页码值，赋值到查询对象中
                q.pagenum = obj.curr
                // 把最新的条目数赋值到查询对象中
                q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 通过代理的形式，为删除按钮绑定点击事件处理函数
    $('body').on('click', '.btn-delete', function () {
        // 获取页面中删除按钮的个数
        // 如果当前页面上删除按钮的个数为1
        // 那删除之后需要将搜索对象中的页数手动减 1，否则会出现空页面的 bug
        var len = $('.btn-delete').length

        // 获取到文章的 id
        var id = $(this).attr('data-id')

        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)

                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了，则让页码值 -1 之后，再重新调用 initTable()
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    initTable()
                }
            })

        })
    })
})