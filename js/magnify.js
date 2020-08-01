define(['jquery', 'jquery-cookie'],function($){
    function magnifyGlass(){
        var mark = document.querySelector('.mark');
        var bigImg = document.querySelector('.bigImg');
        // console.log(bigImg)
        var goodsPic = document.querySelector('.goods-pic')
        //鼠标移入显示遮罩和大图片
        $('.goods-pic').mouseenter(function(){
            $('.mark').css('display', 'block')
            $('.big').css('display', 'block')
        }) 
        
        //移出消失
        $('.goods-pic').mouseleave(function(){
            $('.mark').css('display', 'none')
            $('.big').css('display', 'none')
        })

        goodsPic.onmousemove = function(e){
                //限制遮罩层出界
                var l = e.clientX - goodsPic.offsetLeft - 150;
                var t = e.clientY - goodsPic.offsetTop -250;
                if(l <= 0){
                    l = 0;
                }
                if(l >= 400){
                    l = 400;
                }
                if(t <= 0){
                    t = 0;
                }
                if(t >= 400){
                    t = 400;
                }
                //设置遮罩层位置
                mark.style.left = l + 'px';
                mark.style.top = t + 'px';

                //设置大图位置
                bigImg.style.left = -2 * l + 'px';
                bigImg.style.top = -2 * t + 'px';
                // console.log(bigImg.style.left)
        }
    }


    return{
        magnifyGlass: magnifyGlass
    }
})