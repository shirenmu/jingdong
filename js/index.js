$(function () {

    carouselFocus();
    //大轮播图自动播放 切换

    carouselSk();
    // 样品箱轮播图自动播放 切换

    $('.close').on('click', function () {
        $('header').hide();
    });
    //关闭首页header广告


    toolbar(); //工具条 切换


    moreChange(); //更多商品

    countDown(2,0,0, 1000); //倒计时







});


function carouselFocus() {
    //定义全局变量和定时器
    var i = 0;
    var timer;
    var imgLength = $('.slider_list a').length;
    var index = $('.circle i').index();
    index = 0;
    // 设置第一张图片显示，其余隐藏
    $('.slider_list a').eq(i).show().siblings().hide();
    $('.circle i').eq(i).addClass("current").siblings().removeClass("current"); // 小圆点显示，其余隐藏
    $('.circle i span').eq(i).addClass('bg').parent().siblings().find('span').removeClass('bg'); // 

    // 调用showTime函数
    showTime();
    //当鼠标经过下面的circle时，触发两个事件（鼠标悬停和鼠标离开）
    $('.circle i').hover(function () {
        //获取当前的i的值，并显示，同时清除定时器
        i = $(this).index();
        Show();
        clearInterval(timer);
    }, function () {
        showTime();
    });


    $('.focus_arrow_r').on("click", function () {
        clearInterval(timer);
        i++;
        if (i == $('.slider_list a').length) {
            i = 0;
        }
        Show();
        showTime();
    });

    $('.focus_arrow_l').on("click", function () {
        clearInterval(timer);
        i--;
        if (i == -1) {
            i = $('.slider_list a').length - 1;
        }
        Show();
        showTime();
    });


    //创建一个showTime函数，进行自动播放
    function showTime() {
        //定时器
        timer = setInterval(function () {
            i++;
            index++;
            // 当图片下标超过索引时，设置图片索引为0
            if (i == imgLength || index == imgLength) {
                i = 0;
                index = 0;
            }
            // 调用一个Show函数
            Show();

        }, 4000);

    }

    // 创建一个Show函数 ，切换样式
    function Show() {

        //jquery动画
        $('.slider_list a').eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);

        //给circle创建一个新的class为其添加一个新的样式，并且要在css中设置改样式
        $('.circle i').eq(i).addClass("current").siblings().removeClass("current");


        $('.circle i span').eq(i).addClass('bg').parent().siblings().find('span').removeClass('bg');
    }
}


// 样品箱右侧轮播图

function carouselSk() {
    //定义全局变量和定时器
    var index = 0; // 图片索引
    var i = 0; // 小圆点索引
    var timer; // 定时器标识
    var imgWidth = $(".sk_right a img").eq(0).width(); // 图片宽度
    var imgArr = $('.sk_right a img').length; // 图片的数量

    $('.sk_right a').css('width', imgWidth * imgArr); //设置列表宽度 = 图片宽度 * 图片数量


    var iArr = $('.sk_chn-c i').length; // 获取所有小圆点

    $('.sk_chn_c i').eq(0).css('background', '#e33333');
    //设置小圆点默认选中的效果


    autoChange(); // 图片自动切换


    //当鼠标经过下面的circle时，触发两个事件（鼠标悬停和鼠标离开）
    $('.sk_chn_c i').hover(function () {
        //获取当前的i的值，并显示，同时清除定时器
        index = $(this).index();
        i = $(this).index();
        move();
        clearInterval(timer);

    }, function () {
        autoChange();
    });





    //用来自动切换图片
    function autoChange() {
        //定时器
        timer = setInterval(function () {
            i++; //小圆点下标
            index++; //图片索引

            // 当图片下标超过索引时，设置图片索引为0
            if (i == iArr || index == imgArr) {
                i = 0;
                // index = 0 ;

            }
            move();


        }, 4000)
    }





    //根据下标变换样式
    function move() {
        $('.sk_chn_c i').eq(i).css('background', '#e33333').siblings().css('background', '#c0c0c0')
        //让当前显示的小圆点 变红

        $('.sk_right a').stop().animate({
            left: -index * imgWidth
        }, 400, 'linear', function () {
            if (index == imgArr - 1) {
                index = 0;
                $('.sk_right a').css("left", '0px');
                // 根据图片的索引 移动图片列表的left值，如果索引超过最大值 ，那么让其等于0
            }
        });

    }

}



function toolbar() {
    //鼠标移入 变换颜色  #cb1623; 隐藏的 显示
    // 移出 恢复原状
    //  移入 变红 右侧滑出  移出：变回咖色 左侧滑入
    $('.toolbar_tab').on('mouseenter', function () {
        $(this).css('background', '#cb1623');
        // $('.toolbar-footer ').css('backgroundColor','#cb1623');
        $(this).children().eq(1).stop().animate({
            right: 30
        }, 300, 'linear', function () {});
        $(this).children().eq(1).css({
            color: "#fff",
            background: '#cb1623'
        });
        // $('.toolbar-footer span ').stop().animate({width:70},300,'linear',function(){});
    })
    $('.toolbar_tab ').on('mouseleave', function () {
        $('.toolbar_tab').css('background', '#7a6e6e');
        // $('.toolbar-footer ').css('backgroundColor','#7a6e6e');
        $(this).children().eq(1).stop().animate({
            right: -70
        }, 300, 'linear', function () {});
        $(this).children().eq(1).css('color', '#cb1623');
        // $('.toolbar-footer span ').stop().animate({width:0},300,'linear',function(){});
    })

    $('.toolbar_footer').on('mouseenter', function () {
        $(this).css('background', '#cb1623');
        $(this).children().eq(1).stop().animate({
            right: 30
        }, 300, 'linear', function () {});
        $(this).children().eq(1).css({
            color: "#fff",
            background: '#cb1623'
        });
    })
    $('.toolbar_footer').on('mouseleave', function () {
        $(this).css('background', '#7a6e6e');
        $(this).children().eq(1).stop().animate({
            right: -70
        }, 300, 'linear', function () {});
        $(this).children().eq(1).css('color', '#cb1623');
    })

    $(".toolbar_footer").click(function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 500);
    });

}


function moreChange() {
    //更多的商品内容显示
    $(".grid_menu .grid_menu_item").on("mouseenter", function () {
        $(this).children("img").css("display", "block");
    });
    $(".grid_menu .grid_menu_item").on("mouseleave", function () {
        $(this).children("img").css("display", "none");
    })
}


function countDown(h, m, s, speed) { //倒计时函数封装
    $("#hTime").text(h);
    $("#mTime").text(m);
    $("#sTime").text(s);
    if (h < 10) $("#hTime").text("0"+h);
    if (m < 10) $("#mTime").text("0"+m);
    if (s < 10) $("#sTime").text("0"+s);
    if(s == 0 &&m ==0){
        s=59;
        m = 59;
        h-=1;
    }
    let f;
    f = setInterval(setCount, speed);
    function setCount() {
        $("#hTime").text(h);
        $("#mTime").text(m);
        $("#sTime").text(s);
        if (s < 10) $("#sTime").text("0" + s);
        if (m < 10) $("#mTime").text("0" + m);
        if (h < 10) $("#hTime").text("0" + h);
        --s;
        if (s < 0) {
            --m;
            s = 59;
            if (m < 0) {
                if (h == 0) {
                    clearTimeout(f)
                    // $("#sTime").text('0' + 0)
                } else {
                    --h;
                    m = 59;
                }
            }
        }
    }
}