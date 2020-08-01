window.onload = function(){
    var phone = document.querySelector('.tel');
    var phone_span = document.querySelectorAll('form span')[0];
    var pwd = document.querySelector('.pwd');
    var pwd_span = document.querySelectorAll('form span')[1];
    var submit = document.querySelector('.submit');
    
     //手机号验证提示
    phone.addEventListener('blur',phoneHandler);

    //首次密码验证提示
    pwd.addEventListener('blur', pwdFirstHandler);

    //登录按钮验证
    submit.addEventListener('click', submitHandler);





    //验证手机号函数
    function phoneHandler(){
        var value = phone.value;
        if(!value){
            phone_span.style.display = 'block';
            phone_span.innerHTML = '<em class="iconfont iconjinggao--"></em>手机号不可为空';
            return false;
        }else if(!(/^1[3456789]\d{9}$/.test(value))){
            phone_span.style.display = 'block';
            phone_span.innerHTML = '<em class="iconfont iconjinggao--"></em>手机号格式错误';
            return false;
        }else{
            phone_span.style.display = 'none';
            phone_span.innerHTML = '';
            return true
        }
    }

    //验证首次密码函数
    function pwdFirstHandler(){
        var value = pwd.value;
        if(!value){
            pwd_span.style.display = 'block';
            pwd_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码不可为空';
            return false;
        }else if(!(/^(?=\D+\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,16}$/.test(value))){
            pwd_span.style.display = 'block';
            pwd_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码格式不正确';
            return false;
        }else{
            pwd_span.style.display = 'block';
            pwd_span.innerHTML = '';
            return true
        }
    }
    

    //登录按钮处理函数
    function submitHandler(e){
        if(phoneHandler() && pwdFirstHandler()){
            console.log(phone.value)
            console.log(pwd.value)
            $post({
                url: "../server/login.php",
                data: {
                    username: phone.value,
                    password: pwd.value,
                },
                success: function(result){
                    console.log(result);
                    var obj = JSON.parse(result);
                    if(obj.code){
                        //错误
                        alert(obj.msg);

                    }else{
                        alert('登录成功')
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }else{
            console.log('信息填写错误')
        }
    }
}