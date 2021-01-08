$(function () {
    //调用getUserInfo()函数获取用户信息
    getUserInfo();
    //点击退出按钮，实现退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // console.log(1);
        //提示用户是否退出
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的token
            localStorage.removeItem('token');
            //重新跳转到登录界面
            location.href = 'mylogin.html';
            //关闭confirm询问框
            layer.close(index);
        })
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
        //不论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log(res);
        //     //在complete回调函数中，可以使用res.responseJSON拿服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //强制跳转登录界面
        //         location.href = 'mylogin.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}