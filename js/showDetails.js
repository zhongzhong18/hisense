define(['jquery','jquery-cookie'], function($){
    function details(){
        $.ajax({
            url: '../data/goodslist.json',
            success: function(arr){
                // console.log(arr)
                // console.log(location.href)
                var index = location.href.indexOf('=');
                var gid = location.href.substring(index + 1);
                // console.log(gid)
                for(var i = 0; i < arr.length; i++){
                    if(gid == arr[i].gid){
                        $('.item-title h2').html(`${arr[i].title}${arr[i].titleDesc}`);
                        $('.activity').html(`${arr[i].activity}`);
                        $('.current-price').html(`<em>￥</em>${arr[i].price}`);
                        $('.sale-num').html(`已售${arr[i].saleNum}台`);
                        $('.goods-pic img').attr('src', `${arr[i].img}`)
                        $('.bigImg').attr('src', `${arr[i].img}`)
                    }
                }

            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function addCar(){
        $('.add-reduce .reduce').click(function(){
            var reduceNum = ($('.sum-num').text()) - 0;
            if(reduceNum > 1) reduceNum--;
            $('.sum-num').text(reduceNum);
        })
        $('.add-reduce .add').click(function(){
            var addNum = ($('.sum-num').text()) - 0;
            addNum++;
            $('.sum-num').text(addNum);
        })
        $('.add-car').click(function(){
            var index = location.href.indexOf('=');
            var gid = location.href.substring(index + 1);
            var num = $('.sum-num').text() - 0
            var first = $.cookie("goods") == null ? true : false;
                if(first){
                    var arr = [{gid:gid, num:num}];
                    $.cookie("goods", JSON.stringify(arr), {
                        expires: 7
                    })
                    alert('添加成功');
                }else{
                    var cookieArr = JSON.parse($.cookie("goods"));
                    var index = cookieArr.findIndex(item => item.gid == gid);
                    if(index >= 0){
                        cookieArr[index].num += num;
                    }else{
                        cookieArr.push({gid:gid, num:num});
                    }

                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                    console.log($.cookie("goods"));
                    alert('添加成功');
                }

        })
    }

    return{
        details: details,
        addCar: addCar
    }
})