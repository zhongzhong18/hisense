define(['jquery','jquery-cookie'], function($){
    function show(){
        //显示app二维码
        $('.downloadapp a').mouseenter(function(){
            $('.downpic').css('display', 'block') ;
        })
        $('.downloadapp').mouseleave(function(){
            $('.downpic').css('display', 'none') ;
        })
        //显示网站导航
        $('.netnav a').mouseenter(function(){
            $('.netnav-sub').css('display', 'block') ;
        })
        $('.netnav').mouseleave(function(){
            $('.netnav-sub').css('display', 'none') ;
        })
    }

    //选项卡显示
    function tab(){
        $('.select-item').mouseenter(function(e){
            $.ajax({
                url: "../data/tab.json",
                success: function (arr) {
                  for (var i = 0; i < arr.length; i++) {
                      //插入一个整体
                      if(arr[i].title == e.target.innerHTML){
                        $(`<div class='select-drop clear-fix'>
                        <ul class='drop-l'>
                        </ul>
                        <ul class='drop-r'>
                        </ul>
                        </div>`).appendTo($(e.target.parentNode));
                       
                        //插入一个左边
                        var strl = ``;
                        for(var j = 0; j < arr[i].subleft.length; j++){
                            strl += ` <li>
                            <a href="#">
                                <img src=${arr[i].subleft[j].img} alt="">
                                <span>${arr[i].subleft[j].size}</span>
                            </a>
                        </li>`
                        }
                        strl += `<li class='inchannel'><a href="#">进入频道&gt;</a></li>`;
                        $('.select-drop .drop-l').html(strl);
                        //插入一个右边
                        var strr = ``;
                        for(var k = 0; k < arr[i].subright.length; k++){
                            var char = arr[i].subright[k].des;
                            if(char.length > 12){
                                char = char.substring(0, 12) + '...'
                            }

                            strr += ` <li>
                            <img src= ${arr[i].subright[k].img} alt="">
                            <p>${char}</p>
                            <h3>${arr[i].subright[k].price}</h3>
                        </li>`
                        }
                        $('.select-drop .drop-r').html(strr);
                        
                      }

                  }
                },
                error: function (msg) {
                  console.log(msg);
                },
              });
        })
        
        $('.select-item').mouseleave(function(){
            $('.select-item .select-drop').remove();
        })
    }

    //轮播图
    function slide(){
        //左右点击消失出现
        $('#banner-wrap').hover(
            function(){
                $('.btn-lr').css('display', 'block');
            },
            function(){
                $('.btn-lr').css('display', 'none');
            }
        )
        //轮播图
            var btns = $('.banner-box').find('ol li');
            var banner = $('.banner-box').find('.banner')
            var btnL = $('.btn-lr').find('.btn-l');
            var btnR = $('.btn-lr').find('.btn-r');
            var iNow = 0;
            var timer = null;

            //焦点切换
            btns.click(function () {
                iNow = $(this).index();
                console.log(iNow)
                tab();
            })

            //自动轮播
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 3000);

            //移入停止，移出继续
            $("#banner-wrap").mouseenter(function () {
                clearInterval(timer);
            }).mouseleave(function () {
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 3000);
            })

            //左右切换
            btnL.click(function(){
                iNow--;
                tab();
            });
            btnR.click(function(){
                iNow++;
                tab();
            });

            function tab() {
                btns.removeClass('active').eq(iNow).addClass('active');
                if (iNow == btns.size()) {
                    btns.eq(0).addClass("active");
                }
                if (iNow == -1) {
                    btns.eq(btns.size() - 1).addClass("active");
                }
                banner.animate({ left: (iNow + 1) * -1920 }, 1000, function () {
                    if (iNow == btns.size()) {
                        iNow = 0;
                        banner.css("left", '-1920px');
                    }
                    if(iNow == -1){
                        iNow = 4;
                        banner.css("left", '-9600px');
                    }
                });
            }


    }

   /*  function magnify(){
        var w = $('.mgnify img').css('width') * 1.2;
        var h = $('.mgnify img').css('height') * 1.2;
        $('.mgnify img').css({
            width: w,
            height: h
        })
    } */
    return {
        show: show,
        tab: tab,
        slide: slide
    }
})