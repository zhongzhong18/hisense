define(['jquery','jquery-cookie'], function($){
    function show(){
        var cookieArr = JSON.parse($.cookie("goods"));
        // console.log(cookieArr)
        $.ajax({
            url: '../data/goodslist.json',
            success: function(arr){
                for(var i = 0; i < arr.length; i++){
                    for(var k = 0; k < cookieArr.length; k++){
                        if(arr[i].gid == cookieArr[k].gid){
                            // console.log(arr[i]);
                            $(`<tr class="item-tr ">
                            <td class="check-td">
                                  <input type="checkbox" class="input-checkbox input-checkbox-b ">
                            </td>
                            <td class="left-text clear_fix">
                                <div>
                                    <img src=${arr[i].img} alt="">
                                </div>
                                <a href="#">${arr[i].titleDesc}</a>
                            </td>
                            <td>
                                <span class='goods-price'>￥${arr[i].price}</span>
                            </td>
                            <td>
                                <div class='add-reduce clear_fix'>
                                    <a href="javascript:void(0);" class='reduce'>-</a>
                                    <div class='sum-num'>${cookieArr[k].num}</div>
                                    <a href="javascript:void(0);" class='add'>+</a>
                                </div>
                            </td>
                            <td>
                                <span class='goods-single_price'><em>￥</em>${arr[i].price * cookieArr[k].num}</span>
                            </td>
                            <td>
                                <a class='del' href="#">删除</a>
                            </td>
                          </tr>`).appendTo('tbody');
                        }
                    }  
                }  
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function addReduce(){
        $('tbody').on('click','.reduce',function(){
            var reduceNum = ($(this).siblings('.sum-num').text()) - 0;
            if(reduceNum > 1) {
                reduceNum--;
            $(this).siblings('.sum-num').text(reduceNum);
            var price = $(this).closest(".item-tr").find('.goods-price').text().substring(1);
            var sumPrice = '￥' + price * reduceNum;
            $(this).closest(".item-tr").find('.goods-single_price').text(sumPrice);
            }       
        })
        $('tbody').on('click','.add',function(){
            var addNum = ($(this).siblings('.sum-num').text()) - 0;
            addNum++;
            $(this).siblings('.sum-num').text(addNum);
            var price = $(this).closest(".item-tr").find('.goods-price').text().substring(1);
            var sumPrice = '￥' + price * addNum;
            $(this).closest(".item-tr").find('.goods-single_price').text(sumPrice);
        })
    }


    function checkbox(){
        $('.input-checkboxall').click(function(){
            var isChecked = $('.input-checkboxall').is(':checked');
            console.log(isChecked)
            if(isChecked){
                $('.input-checkbox').addClass('input-checkbox-a')
                var sum = 0;
                $(".input-checkbox").each((index, item) => {
                    if(index > 0){
                        var itemPrice = $(item).closest(".item-tr").find('.goods-single_price').text().substring(1) - 0;
                        console.log(itemPrice)
                        sum += itemPrice;
                    }
                })
                $('.settle-price').text(sum);
            }else{
                $('.input-checkbox').removeClass('input-checkbox-a')
                $('.settle-price').text('0');
            }
        })

        $('tbody').on('click','.input-checkbox',function(){
            var isChecked = $(this).is(':checked');
            console.log(isChecked)
            if(isChecked){
                $(this).addClass('input-checkbox-a')
                var price = $(this).closest(".item-tr").find('.goods-price').text().substring(1);
                var num = $(this).closest(".item-tr").find('.sum-num').text() - 0
                var sumPrice = price * num;
                var settPrice = $('.settle-price').text() - 0
                $('.settle-price').text(sumPrice + settPrice) ;
            }else{
                $(this).removeClass('input-checkbox-a')
            }
        })
        
    }

    function del(){
        $('tbody').on('click','.del',function(){
            $(this).closest(".item-tr").remove();
            var isChecked = $(this).closest(".item-tr").find('.input-checkbox').is(':checked');
            if(isChecked){
                var price = $(this).closest(".item-tr").find('.goods-price').text().substring(1);
                var num = $(this).closest(".item-tr").find('.sum-num').text() - 0
                var sumPrice = price * num;
                var settPrice = $('.settle-price').text() - 0
                $('.settle-price').text(settPrice - sumPrice);
            }
        })
    }

    return{
        show:show,
        addReduce:addReduce,
        checkbox:checkbox,
        del:del
    }
})