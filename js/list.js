define(['jquery','jquery-cookie'], function($){
    function showGoodslist(){
        $.ajax({
            url: '../data/goodslist.json',
            success: function(arr){
                console.log(arr)
                for(var i = 0; i < arr.length; i++){
                    $(`<li>
                    <div class='pic'>
                         <img src=${arr[i].img} alt="">
                    </div>
                    <a class='title' target="_blank" href="./goodDetails.html?gid=${arr[i].gid}">
                    ${arr[i].title}<br>${arr[i].titleDesc}
                    </a>
                    <p class='price-num'>
                         <span>￥<span class='price'>${arr[i].price}</span></span>
                         <span class='num'>已售${arr[i].saleNum}台</span>
                    </p>
                </li>`).appendTo($('.list ul'));
                }

                console.log($('.list ul'))
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    return{
        showGoodslist: showGoodslist
    }
})
