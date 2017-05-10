window.onload = function () {
    // 顶部的通栏 滚动的效果
    headerScroll();
    // 倒计时的效果
    cutDownTime();
    // 轮播图的效果
    banner();
}

   //顶部通栏
 var headerScroll = function () {

    var navDom = document.querySelector('.jd_nav');
    var maxDistance = navDom.offsetTop + navDom.offsetHeight;
    var headerDom = document.querySelector('.jd_header');

    headerDom.style.backgroundColor = 'rgba(201,21,35,0)';

    window.onscroll = function () {
        var scrollDistance = window.document.body.scrollTop;
       //透明度百分比
        var percent = scrollDistance / maxDistance;

        if (percent>1) {
            percent=1;
        }

        headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
    }
}

    //倒计时部分
var cutDownTime = function(){
    //定义总剩余时长
    var totalHour = 3;
    var totalSec = totalHour*60*60;

    var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');

    //定时器部分
    var timeId = setInterval(function(){
        //到时间结束定时器
        if (totalSec<=0) {
            clearInterval(timeId);
            return;
        }

        totalSec--;

        //剩余时间依次转换为时分秒
        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 /60);
        var sec =totalSec % 60;

        // 小时
        liArr[0].innerHTML =Math.floor(hour/10) ;  // 十位 41 / 10  =4.1 所以要取整数
        liArr[1].innerHTML =hour%10 ; // 个位

        // 分
        liArr[3].innerHTML = Math.floor(minute/10);// 是为 55/10 = 5.5 取整
        liArr[4].innerHTML = minute%10;

        // 秒
        liArr[6].innerHTML = Math.floor(sec/10);
        liArr[7].innerHTML = sec%10;
    },1000);
}

    //轮播图部分
var banner = function(){
    var width = document.body.offsetWidth;
    var moveUl = document.querySelector('.banner_images');
    var indexLiArr = document.querySelectorAll('.banner_index li');

    //索引值
    var index = 1;

    //将代码提取出来 减少代码量且便于维护
    var startTransition = function () {
        moveUl.style.transition = 'all .3s';
    }

    var endTransition = function () {
        moveUl.style.transition = '';
    }

    var setTransform = function (distance) {
        moveUl.style.transform = 'translateX('+distance+'px)';
    }

    // 开启定时器 图片轮播
    var timeId = setInterval(function () {
        index++;
        startTransition();
        // 修改 ul的位置
        setTransform(index*width*-1);
    },1000);

// 过渡 结束事件 用来 修正 index的值 并修改索引
    moveUl.addEventListener('webkitTransitionEnd',function () {

        if (index > 8) {
            index = 1;
            endTransition();
            // 瞬间 修改一下 ul 的位置
            setTransform(index * width * -1);
        } else if (index < 1) {
            // 跳到倒数第二张
            index = 8;
            endTransition();
            // 瞬间 修改一下 ul 的位置;
            setTransform(index * width * -1);
        }
        // 修改 索引li标签的 class
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].className = '';
        }

        // 有一个 1的 差值
        indexLiArr[index-1].className = 'current';

    })


    // 注册 三个 touch事件
    // 定义变量 记录 开始的X
    var startX = 0;

    // 记录移动的值
    var moveX = 0;

    // 触摸开始
    moveUl.addEventListener('touchstart',function (event) {
        // 关闭定时器
        clearInterval(timeId);

        // 关闭过渡效果
        endTransition();

        // 记录开始值
        startX = event.touches[0].clientX;

    })

    // 触摸中
    moveUl.addEventListener('touchmove',function (event) {
        // 计算移动的值
        moveX = event.touches[0].clientX - startX;

        // 移动ul
        setTransform(moveX+index*-1*width);
    })

    // 触摸结束
    moveUl.addEventListener('touchend',function (event) {

        // 定义 最大的 偏移值
        var maxDistance = width/3;

        // 判断 是否超过
        if (Math.abs(moveX)>maxDistance) {
            // 判断 到底是 往左 还是往右移动
            if (moveX>0) {
                index--;
            }else{
                index++;
            };
            startTransition();

            // 吸附 一整页;
            setTransform(index*-1*width);

        }else{

            startTransition();
            setTransform(index*-1*width);
        }

        // 记录结束值

        // 开启定时器
        timeId = setInterval(function () {
            // 累加
            index++;
            startTransition();
            // 修改 ul的位置
            setTransform(index*width*-1);
        },1000)
    })
}