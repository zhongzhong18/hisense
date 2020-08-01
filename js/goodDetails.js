console.log('加载成功')

require.config({
    paths:{
        jquery: "../lib/jquery-1.11.3",
        "jquery-cookie": "../lib/jquery.cookie",
        parabola: "../lib/parabola", //抛物线方程不支持AMD规范
        main:'main',
        magnify: 'magnify',
        showDetails: 'showDetails'
    },
    shim:{
        "jquery-cookie": ["jquery"],
        parabola: {
            exports: "_",
          }
    }
});

require(['main', 'magnify','showDetails'],function (main, magnify,showDetails) {
    main.show();
    main.tab();
    magnify.magnifyGlass();
    showDetails.details();
    showDetails.addCar();
  })