
/*--退出登录--*/
	$(".exit_out").on("click",function(){
		if(user.System=="IOS"){
            exitSuccess();
       }else if(user.System =="Android"){
        	exitToAndroid();
        }else if(user.System =="PC"){
        	window.location.href="login.html";
        }
	});
/*--注销登录--*/
	$(".login_out").on("click",function(){
		if(user.System=="IOS"){
            cancelSuccess();
       }else if(user.System =="Android"){
        	logoutToAndroid();
        }else if(user.System =="PC"){
        	window.location.href="login.html";
        }

	});
/*--获取登录页面的用户名密码--*/
	$("#password").blur(function(){
		var passW = $("#password").val(); 
		var pwd = user.personPassword;
		console.log(pwd)
	    if(passW!=pwd){
		  	$('.alert-tips').css('display','block').find("span").text("原密码错误!");
		  	setTimeout(function(){
				$('.alert-tips').css('display','none');
			},1000);
	    }else{
	    	console.log('密码与原密码匹配成功');
	    }
	    return true;
	});
	/*function getCookie(cname) //获取cookie值
    {
        var ss = document.cookie;
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0)
                return c.substring(name.length,c.length);
        }
        return "";
    }*/
/*--修改密码--*/
$("#btn-save").on("click",function(){
	var passW = $("#password").val(); 
	var pwd = user.personPassword; 
	var newPassword = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	if(newPassword!=confirmPassword){
		$('.alert-tips').css('display','block').find("span").text("新密码与确认密码不一致，请重新输入！");
		$("#confirmPassword").focus();
		setTimeout(function(){
			$('.alert-tips').css('display','none');
		},1000);
	}else if(newPassword==confirmPassword&&passW==pwd&&newPassword!==""&&confirmPassword!=""&&passW!==""){
		$(".modal").modal('hide');
		$('.alert-tips').css('display','block').find("span").text("密码修改成功！");
		setTimeout(function(){
			$('.alert-tips').css('display','none');
		},1000);
		console.log(passW,newPassword,confirmPassword)
		var passwordMsg = {
            personID:user.PersonID,
            passwordChange:newPassword
        };
        var stringMsg = JSON.stringify(userMsg);
        if(user.System=="IOS"){
	       	changeSuccess(passwordMsg);
	    }else if(user.System=="Android"){
	       	changeToAndroid(stringMsg);
	    }
		$("#password").val(""); //密码修改成功后，清空本文值
		$("#newPassword").val('');
		$("#confirmPassword").val('');
	}else if(passW==""||newPassword==""||confirmPassword==""){
		$('.alert-tips').css('display','block').find("span").text("密码不能为空！");
	}else{
		$('.alert-tips').css('display','block').find("span").text("服务器错误!");
	}
})

$("button[data-dismiss='modal']").on("click", function () { // 单击模态层，关闭模态框
    $("#password").val(""); //密码修改成功后，清空本文值
		$("#newPassword").val('');
		$("#confirmPassword").val('');
});