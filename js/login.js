/**
 * Created by Administrator on 2017/4/20 0020.
 */
	
	$(".login-btn").on("keyup", function (ev) { // 当按enter键时，登录
	    ev = ev || window.event;
	    if (ev.keyCode == 13){
	        window.location.href="main.html";
	    }
	})

    $(".login-btn").on("click", function () {
        var personID = $("input[name='username']").val();
        var personPassword = $("input[name='keyword']").val();
        var userMsg = {
            personID:personID,
            personPassword:personPassword,
            url:"main.html"
        };
        var errorMessage = {
        	error:"Password error"
        };
        /*$.ajax({
            success: function (res) {
            	if( personID == "aaa" && personPassword == "1" ){
            		 document.cookie = "pwd="+personPassword;
            		 $('.alert-tips').css('display',"block").find("span").text('登录成功');
					 window.location.href="main.html";
					 sendToAndroid();
	            	 invokeSuccess(userMsg);
            	}else{
            		$('.alert-tips').css('display',"block").find("span").text('登录名或者密码错误');
            	}
            },
            error: function (res) {
				$('.alert-tips').css('display',"block");
            }
        })*/
        if( personID == "1" && personPassword == "1" ){
            if(user.System=="IOS"){
            	invokeSuccess(userMsg);
            }else if(user.System =="Android"){
            	sendToAndroid();
            }else if(user.System =="PC"){
            	window.location.href="main.html";
            }
        }else if(personID==""||personPassword==""){
			$('.alert-tips').css('display','block').find("span").text("password is not null!");
			setTimeout(function(){
				$('.alert-tips').css('display','none');
			},1000);
		}else{
        	if(user.System=="IOS"){
            	invokeFail(errorMessage);
            }else if(user.System =="Android"){
            	$('.alert-tips').css('display','block').find("span").text("userName or password is error!");
				setTimeout(function(){
					$('.alert-tips').css('display','none');
				},1000);
            }
        }
    });
    
 	$(".code-link a img").mouseover(function () {
        $(this).parent().next("div").show();
    }).mouseout(function () {
        $(this).parent().next("div").hide();
    });
    $(".code-link a img").on('click',function () {
        $(this).parent().next("div").toggle();
    })