
// ios调用方法
	/*--登录调用--*/
	function invokeFail( args ){
		window.location = 'login-fail:'  + encodeURIComponent(JSON.stringify(args));
	}
	function invokeSuccess( args ){
		window.location = 'login-success:'  + encodeURIComponent(JSON.stringify(args));
	}
	/*--注销logOut--*/
	function cancelSuccess( args ){
		window.location = 'logout:'  + encodeURIComponent(JSON.stringify(args));
	}
	/*--退出exitApplication --*/
	function exitSuccess( args ){
		window.location = 'exit-application:'  + encodeURIComponent(JSON.stringify(args));
	}
	/*--修改密码passwordChange--*/
	function changeSuccess( args ){
		window.location = 'password-change:'  + encodeURIComponent(JSON.stringify(args));
	}

//andiord调用方法
	function getFromAndroid(str){    //接收来自android的数据  
        document.getElementById("team1").innerHTML=str;  
	}
	function sendToAndroid(){  //登录页面跳转
		var personName;
		var personPass;
		if(user.PersonID){
			personName = user.PersonID;
			personPass = user.personPassword;
		}else{
			personName = $("input[name='username']").val();
    		personPass = $("input[name='keyword']").val();
    	}
		var str = "main.html";
		 var userMsg = {
       		personID:personName,
        	personPassword:personPass
        };
        var stringMsg = JSON.stringify(userMsg);
		window.EPSoft.toMainActivity(str,stringMsg);//通过injs接口调用android的函数 
   } 
    function exitToAndroid(){  //退出登录
        window.EPSoft.exitapplication();//通过injs接口调用android的函数 
    }   
    function logoutToAndroid(){  //注销登录
        window.EPSoft.logout();//通过injs接口调用android的函数 
    }
    function changeToAndroid(str){  //修改密码
        window.EPSoft.passwordchange(str);//通过injs接口调用android的函数 
    }

	/*function  closeActivity(){
		window.EPSoft.closeActivity();//通过injs接口调用android的函数
	}

   	function getFromAndroidOne(str){    //接收来自android的数据  
        document.getElementById("person1").innerHTML=str;  
    	}  
	function sendToAndroidOne(){         
        var str = "Phone/Report/reportHome/person_total.html";  
        window.EPSoft.toReportActivity(str);//通过injs接口调用android的函数    
    }  */

 /*--设置登录验证--*/
	var user={
      	//是否手机登录
	      IsPhone: false,
	      //系统分为：1.Android | 2.Iphone | WindowPhone8
	      System: "PC",
	      //制造商
	      Manufacturer: "",
	      //手机设备版本
	     Version: "",
	     //personID
	     PersonID:"",
	     //密码
	     personPassword:"1"
 	};
	function setLoginMessage(u_JsonValue,flag){
	  	var u_Data = ObjectTransitionJson(u_JsonValue);
	  	user.IsPhone = u_Data.IsPhone == "true" ? true : u_Data.IsPhone;   		
	  	user.System = u_Data.System;   		
	  	user.Manufacturer = u_Data.Manufacturer;	   		
	  	user.Version = u_Data.Version;	  	 	
	  	user.PersonID = u_Data.PersonID;
	  	user.personPassword = u_Data.personPassword;
	  	if(user.System == "Android"&&flag==0){ //进入页面android自动登录
	  		if(user.PersonID=="1"&&user.personPassword=="1"){
	  			$("input[name='username']").val(user.PersonID);
        	    $("input[name='keyword']").val(user.personPassword);
	  			sendToAndroid();
	  		}else if(user.PersonID=="1"&&user.personPassword=="2"){
	  			$("input[name='username']").val(user.PersonID);
        	    $("input[name='keyword']").val(user.personPassword);
	  			sendToAndroid();
	  		}else if (user.PersonID==""||user.personPassword==""){
  
        	}else{
        		$('.alert-tips').css('display','block').find("span").text("userName or password is error!");
				setTimeout(function(){
					$('.alert-tips').css('display','none');
				},1000);
	  		}
	  	}
		//return user.PersonID;
	};
	 sessionStorage.setItem("person1",user.PersonID);
	 //localStorage.setItem("pwd",user.personPassword);
	 function ObjectTransitionJson(u_Data) {
		try {
			if (u_Data != null && u_Data != "" && u_Data!=undefined) {
				if (typeof (u_Data) == "object" || typeof (u_Data) == "Array") {
	
				} else {
					u_Data = JSON2.parse(u_Data);
				}
			}
		} catch (e) {
			alertMessageUsePhone("ObjectTransitionJson()=>" + e.toString());
		}
		return u_Data;
	 };	


/*	var  Phone={
      //是否手机登录
      IsPhone: false,
      //系统分为：1.Android | 2.Iphone | WindowPhone8
      System: "PC",
      //制造商
      Manufacturer: "",
      //手机设备版本
     Version: "",
     //personID
     PersonID:""
 	 };

  	//安卓、IOS  处理手机端信息并给公共变量赋值方法
  
	function setPhone(p_JsonValue) {
  	var p_Data = StringTransitionJson(p_JsonValue);

  	Phone.IsPhone = p_Data.IsPhone == "true" ? true : p_Data.IsPhone;
   		
  	Phone.System = p_Data.System;
   		
  	Phone.Manufacturer = p_Data.Manufacturer;
   		
  	Phone.Version = p_Data.Version;
  	 	
  	Phone.PersonID = p_Data.PersonID;
  
	return Phone.PersonID
   		
}
 sessionStorage.setItem("person",Phone.PersonID);*/
 
 /*--openMessage传值--*/
	var  Message={
	    //id:"",
	    recevieid: "",
	    messageid: "",
	    title: "",
	    content:"",
	    sender:"",
	    sendername:"",
	    emergencylevel:"",
	    formid:"",
	    messagetype:"",
	    SendDateTime:"",
      //IsRead 的值只能是 0 或 1,默认为 0
		IsRead:0,
		// 打开单据需要的参数
		fromtypename:"",
		billurl:"",
		formtypeid:"",
		taskid:"",
		activityaudittype:"",
		taskstate:"",
		activename:"",
		formstate:""
 	};

	function SetParameter(s_JsonValue) {
	  	var p_Data = StringTransitionJson(s_JsonValue);
	  	var s_Data = p_Data.content;
		var ss = s_Data.replace(/\\(.)/g, "$1");
		//ss = JSON.parse(ss);
	  	Message.recevieid = ss.recevieid;
	  	Message.messageid = ss.messageid;	
	  	Message.title = ss.title; 		
	  	Message.content = ss.content;	 	
	  	Message.sender = ss.sender;
	  	Message.sendername = ss.sendername;
	  	Message.emergencylevel = ss.emergencylevel;
	  	Message.sender = ss.formid;
	  	Message.sender = ss.messagetype;
	  	Message.sender = ss.SendDateTime;
	  	Message.sender = ss.IsRead;
	  	Message.sender = ss.fromtypename;
	  	Message.sender = ss.billurl;
	  	Message.sender = ss.formtypeid;
	  	Message.sender = ss.taskid;
	  	Message.sender = ss.activityaudittype;
	  	Message.sender = ss.taskstate;
	  	Message.sender = ss.activename;
	  	Message.sender = ss.formstate;
	  	$('#label').text(ss);
	}
		 /**
		字符串转换Json数据方法
		@参数：p_Data：返回数据（Object or String）
		@功能说明：
		**/
 function StringTransitionJson(p_Data) {

	try {
		if (p_Data != null && p_Data != "" && p_Data!=undefined) {
			if (typeof (p_Data) == "object" || typeof (p_Data) == "Array") {

			} else {
				p_Data = JSON2.parse(p_Data);
			}
		}
	} catch (e) {
		alertMessageUsePhone("StringTransitionJson()=>" + e.toString());
	}
	return p_Data;
 }

	function LoginValidate(){  //登录前IOS判断调用
	  	var isNull = user.PersonID;
		var isPwd = user.personPassword;
		var userMsg = {
            personID:user.PersonID,
            personPassword:user.personPassword,
            url:"main.html"
        };
        var errorMessage = {
        	error:"Password error"
        };
		if (isNull==""||isPwd==""){
  
        }else if(isNull=="1"&&isPwd=="1"){
        	$("input[name='username']").val(user.PersonID);
        	$("input[name='keyword']").val(user.personPassword);
        	invokeSuccess(userMsg);
        }else{
        	invokeFail(errorMessage);
        }
	}
	

