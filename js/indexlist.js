define(['jquery','jquery-cookie'], function($){
    function showlist(){
        $.ajax({
            url: '../data/indexlist.json',
            success: function(arr){
                var eles = document.getElementsByClassName('main-title');
                var tits = [];
                for(var k = 0; k < eles.length; k++){
                    // console.log(eles[k]);
                    tits.push(eles[k].innerText);                    
                }
              for(var i = 0; i < arr.length;i++){
                  if(tits.indexOf(arr[i].title) > -1){
                      var index = tits.indexOf(arr[i].title);
                      var ele = eles[index];
                      var str = '';
                      for(var j = 0; j < arr[i].list.length; j++){
                          str +=` <li>
                          <a href="./goodList.html"><img src=${arr[i].list[j].img} alt=""></a>
                          <p>${arr[i].list[j].name}</p>
                          <h3>${arr[i].list[j].desc}</h3>
                          <h4>${arr[i].list[j].price}</h4>
                      </li>`;
                      }
                      console.log(str);
                      $(ele).siblings('.show-list').html(str);
                  }
              }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
      



    return{
        showlist:showlist,
    }
})