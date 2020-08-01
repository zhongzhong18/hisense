window.onload = function(){
    var phone = document.querySelector('.phone');
    var phone_span = document.querySelector('.phone_span');
    var pwd = document.querySelector('.password');
    var pwd_span = document.querySelector('.pwd_span');
    var pwd_confirm = document.querySelector('.password-confirm');
    var confirm_span = document.querySelector('.confirm_span');
    var submit = document.querySelector('.submit')


    //手机号验证提示
    phone.onfocus = function(){
        phone_span.className = 'phone_tips';
        phone_span.innerHTML = '注册之后，你可以使用该手机登录或找回密码';
    }

    phone.addEventListener('blur',phoneHandler);
    
    //首次密码验证提示
    pwd.onfocus = function(){
        pwd_span.className = 'phone_tips';
        pwd_span.innerHTML = '8~16位密码 数字、字母、下划线组成';
    }

    pwd.addEventListener('blur', pwdFirstHandler);
    

    //确认密码验证提示
    pwd_confirm.onfocus = function(){
        confirm_span.className = 'phone_tips';
        confirm_span.innerHTML = '8~16位密码 数字、字母、下划线组成';
    }

    pwd_confirm.addEventListener('blur', pwdConfirmHandler);

    //注册按钮验证
    submit.addEventListener('click', submitHandler);

    //验证手机号函数
    function phoneHandler(){
        var value = phone.value;
        if(!value){
            phone_span.className = 'phone_error';
            phone_span.innerHTML = '<em class="iconfont iconjinggao--"></em>手机号不可为空';
            return false;
        }else if(!(/^1[3456789]\d{9}$/.test(value))){
            phone_span.className = 'phone_error';
            phone_span.innerHTML = '<em class="iconfont iconjinggao--"></em>手机号格式错误';
            return false;
        }else{
            phone_span.className = 'phone_span';
            phone_span.innerHTML = '';
            return true
        }
    }

    //验证首次密码函数
    function pwdFirstHandler(){
        var value = pwd.value;
        if(!value){
            pwd_span.className = 'phone_error';
            pwd_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码不可为空';
            return false;
        }else if(!(/^(?=\D+\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,16}$/.test(value))){
            pwd_span.className = 'phone_error';
            pwd_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码格式不正确';
            return false;
        }else{
            pwd_span.className = 'pwd_span';
            pwd_span.innerHTML = '';
            return true
        }
    }

    //确认密码函数
    function pwdConfirmHandler(){
        var value = pwd_confirm.value;
        if(!value){
            confirm_span.className = 'phone_error';
            confirm_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码不可为空';
            return false;
        }else if(!(/^(?=\D+\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,16}$/.test(value))){
            confirm_span.className = 'phone_error';
            confirm_span.innerHTML = '<em class="iconfont iconjinggao--"></em>密码格式不正确';
            return false;
        }else if(value !== pwd.value){
            confirm_span.className = 'phone_error';
            confirm_span.innerHTML = '<em class="iconfont iconjinggao--"></em>两次密码不一致';
            return false;
        }else{
            confirm_span.className = 'confirm_span';
            confirm_span.innerHTML = '';
            return true
        }
    }

    //注册按钮处理函数
    function submitHandler(e){
        if(phoneHandler() && pwdFirstHandler() && pwdConfirmHandler()){
            $post({
                url: "../server/register.php",
                data: {
                    phone: phone.value,
                    password: pwd.value,
                    repassword: pwd_confirm.value,
                    createTime: (new Date().getTime())
                },
                success: function(result){
                    console.log(result);
                    var obj = JSON.parse(result);
                    // aAlert.style.display = 'block';
                    if(obj.code){
                        //错误
                       alert(obj.msg)

                    }else{
                        // alert('obj.msg')
                        setTimeout(() => {
                            location.assign("../login.html");
                        }, 500);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }else{
            alert('信息填写错误')
        }
    }
}