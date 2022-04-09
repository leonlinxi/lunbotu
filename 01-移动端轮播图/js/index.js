window.addEventListener('load',function () {
    // this.alert(1)
    // 1.获取元素
    var focus = document.querySelector('.focus')
    var ul  =focus.children[0]
    // 获得focus 的宽度
    var w = focus.offsetWidth
    var ol =this.document.querySelector('ol')
    console.log(w);
    // 2.利用定时器自动轮播图片
    let index = 0
    var timer = setInterval(function () {
        index++
        var translaterx = -index * w
        ul.style.transition = 'all 1s'
        ul.style.transform = 'translateX('+translaterx+'px)'
    },2000)

    // 等着过渡完成之后，再去判断  监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend',function () {
        // console.log(1);
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            console.log(index);
            // 去掉过渡效果，让ul快速返回开头的位置
            ul.style.transition = 'none'
            // 利用最新的宽度去滚动图片
            var translaterx = -index * w;
            ul.style.transform = 'translateX('+translaterx+'px)'
        }else if(index <= 0){
            index = 2
            ul.style.transition = 'none'
            // 利用最新的宽度去滚动图片
            var translaterx = -index * w;
            ul.style.transform = 'translateX('+translaterx+'px)'
        }
        // 小圆点跟随变化
        // 把ol里面的li  带有current 选出来
        ol.querySelector('.current').classList.remove('current')
        // 为ol子项 index 个，添加current 类名
        ol.children[index].classList.add('current')
    })

    // 4.手指滑动轮播图
    // 触摸手指，获得手指初始坐标
    var startX = 0
    var moveX = 0
    var flag = false // 手指移动过在做判断，否则不做判断效果
    ul.addEventListener('touchstart',function (e) {
            startX =e.targetTouches[0].pageX
            // 手指滑动时清除 计时器
            clearInterval(timer)
    })
    // 移动手指的距离
    ul.addEventListener('touchmove',function (e) {
        // 计算移动距离
        // moveX 是手指移动距离
        moveX = e.targetTouches[0].pageX - startX
        // 移动盒子   盒子原来的位置 + 手z指移动的距离
        var translaterx = -index * w + moveX
        // 手指拖动的时候不需要过渡效果
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translaterx + 'px)'
        flag = true
        e.preventDefault() // 阻止滚动屏幕的行为
    })
    ul.addEventListener('touchend',function (e) {
        if (flag) {
            // (1)如果移动距离大于50像素就播放上一张或下一张
            console.log(Math.abs(moveX) );
            console.log(moveX);
            // 这里为什么使用绝对值？
            // 因为需要判断的是手指移动距离，因为可以左右滑动，所以左划时会出现负值，导致无法采集左划的数值，
            // 但是使用绝对值，那么手指不管向哪个方向移动采集到的都是正值，当手指移动距离超过50时，就可以进入内层判断
            // 内层判断不需要使用绝对值，需要判断的是当前moveX的值是正值还是负值即可。
            // 如果是正值说明手指向右滑动了，那么就播放上一张，此时使用index--。让轮播图的位置减少一个 w 数值
            // 反之，是负值说明手指向左滑动了，就播放下一张，此时使用index++。让轮播图的位置增加一个 w 数值
            if(Math.abs(moveX) > 50) {
                // 如果是右滑就是 播放上一张  moveX 是正值
                if(moveX > 0) {
                    index--;
                } else {
                // 如果是左滑就是 播放下一张  moveX 是负值
                    index++;
                }  
                var translatex = -index * w;
                ul.style.transition = 'all 1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // （2）如果小于50像素，那么轮播图就回弹到原来的位置
                var translatex = -index * w;
                ul.style.transition = 'all .5s';
                ul.style.transform = 'translateX(' + translatex + 'px)';

            }
            flag = false
        }
        // 手指离开从新开启定时器
        clearInterval(timer)
        timer = setInterval(function () {
            index++
            var translaterx = -index * w
            ul.style.transition = 'all 1s'
            ul.style.transform = 'translateX('+translaterx+'px)'
        },2000)
    })
})