console.log('加载成功')

require.config({
    paths:{
        jquery: "../lib/jquery-1.11.3",
        "jquery-cookie": "../lib/jquery.cookie",
        parabola: "../lib/parabola", //抛物线方程不支持AMD规范
        main:'main',
        indexlist: 'indexlist'
    },
    shim:{
        "jquery-cookie": ["jquery"],
        parabola: {
            exports: "_",
          }
    }
});

require(['main', 'indexlist'],function (main , indexlist) {
    main.show();
    main.tab();
    main.slide();
    indexlist.showlist();
  })