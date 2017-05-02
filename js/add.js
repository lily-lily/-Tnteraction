/**
* Created by Administrator on 2017/3/22 0022.
*/
/* hack IE火狐不能识别输入框number属性 */
$("input[type='number']").on("keyup", function (event) {
    event = event || window.event;
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 109 || event.keyCode == 110 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        return true;
    } else {
        if (window.event) {
            window.event.returnValue = false;
            $(this).val("")
        } else {
            event.preventDefault();
            $(this).val("")
        }
    }
});
/*  增加暂支单 */
$(".widget").hide();
var flag = false;  // 标志变量
var n = 1; // 编号
$("#addWidget").on("click", function () {
    if(flag == false){
        $(".widget").show();
        flag = true;
    }else {
        $(".widget").first().clone(true).insertBefore("#addWidget");
        n++;
        $(".widget").last().find(".row").first().find(".colc-md-6").first().text(n);
        $(".widget").last().find("input").val("");
    }
    beFlex();
    $(this).blur();
    return n;
});
$(".widget").on("click",".del", function () { // 删除暂支单
    if($(".widget").length <= 1){
        $(".widget").find("input").val("");
        $(".widget").hide();
        flag =  false ;
    }else{
        $(this).parent().parent().remove();
        n--;
        $(".widget").each(function (index) {
            $(".widget").eq(index).find(".row").first().find(".colc-md-6").first().text(index+1);
        });
    }
    return n;
});
/* 日期控件函数 */
function showDate (cls){
    var date = new Date();
    $(cls).datetimepicker({
        format: "yyyy-mm-dd", // 显示时间yyyy-mm-dd hh:ii
        autoclose: true, //选择一个日期后立刻关闭选择框
        todayBtn: true,
        todayHighlight:true,
        startDate: date, //限制从哪个时间点之前的是不能点击选择的
        startView:2,
        minView: 2, //日期选择的精准时间
        language:"zh-CN",
        forceParse:0
    });
    /* 显示日期控件的左右按钮 */
    $(".datetimepicker").find(".prev").children().removeClass().addClass("glyphicon glyphicon-arrow-left");
    $(".datetimepicker").find(".next").children().removeClass().addClass("glyphicon glyphicon-arrow-right");
};
showDate(".form_date1");

/* 输入框聚焦显示模态框 */
var publicIndex = 0;
function showModal(inputCls,modalId){
    $(inputCls).on("focus", function () {
        $(modalId).modal();
        bodyScroll.afterOpen();
        publicIndex = $(inputCls).index($(this));
        return publicIndex;
    });
}
/* 点击选择显示模态窗 */
function btnShowModal(btnCls,modalId){
    $(btnCls).on("click", function () {
        $(this).parent().siblings().focus();
    });
}
showModal(".openModal","#modal1");  // 显示模态框1 借款人
btnShowModal(".btn-borrower","#modal1"); //点击显示模态窗


btnShowModal(".apartment","#modal1"); //点击显示模态窗

$(".modal").on("click", function () { // 单击模态层，关闭模态框
    $(".close").click();
});
$(".modal-content").on("click", function (ev) { // 在对模态框内容操控时，阻止事件捕获和事件冒泡
    ev = ev || event;
    ev.cancelBubble = true;
    if(ev.stopPropagation){
        ev.stopPropagation();
    }
});
$(".modal").on("keyup", function (ev) { // 当按esc键时，关闭模态框
    ev = ev || event;
    if (ev.keyCode == 27){
        $(".close").click();
    }
})
/* 树形视图控件 借款人 *///************************************************************************
var defaultData = [
    {
        "text":"company",
        "tags":[2],
        // href:"#company",
        "nodes":[
            {
                "text":"财务部",
                "tags":[3],
                "nodes":[
                    { "text":"员工1","tags":[0] },
                    { "text":"员工2","tags":[0] },
                    { "text":"员工3","tags":[0] }
                ]
            },
            {
                "text":"人力资源部",
                "tags":[3],
                "nodes":[
                    { "text":"员工1","tags":[0] },
                    { "text":"员工2","tags":[0] },
                    { "text":"员工3","tags":[0] }
                ]
            }
        ]
    },
    {
        "text":"公司B",
        "tags":[2],
        "nodes":[
            {
                "text":"研发部",
                "tags":[3],
                "nodes":[
                    { "text":"员工1","tags":[0] },
                    { "text":"员工2","tags":[0] },
                    { "text":"员工3","tags":[0] }
                ]
            },
            {
                "text":"运营",
                "tags":[3],
                "nodes":[
                    { "text":"员工1","tags":[0] },
                    { "text":"员工2","tags":[0] },
                    { "text":"员工3","tags":[0] }
                ]
            }
        ]
    },
    {
        "text":"公司C",
        "tags":[0]
    },
    {
        "text":"公司D",
        "tags":[0]
    },
    {
        "text":"公司E",
        "tags":[0]
    },
    {
        "text":"公司F",
        "tags":[0]
    },
    {
        "text":"公司G",
        "tags":[0]
    },
    {
        "text":"公司G",
        "tags":[0]
    },
    {
        "text":"公司G",
        "tags":[0]
    },
    {
        "text":"公司G",
        "tags":[0]
    },
    {
        "text":"公司G",
        "tags":[0]
    }
];
//init
$(".treeview-searchable").treeview({
    color:"#468bca",
    expandIcon:"glyphicon glyphicon-plus",
    collapseIcon:"glyphicon glyphicon-minus",
    nodeIcon:"glyphicon glyphicon-user",
    showTags:true,
    data:defaultData
});
$(".treeview-searchable").treeview('expandAll',{ silent: true });/* 打开弹窗就展开所有的节点 */
/* 搜索树形菜单 */
var search = function () {
    var pattern = $("#input-search").val();
    var results = $(".treeview-searchable").treeview('search',[pattern,""]); //查询的结果，数组
    $("<p/>").text("查询到"+results.length+"个结果").appendTo("#search-results");
    if (results.length > 0){
        if ( nodeNum == 0 ){
            $(".treeview-searchable").find("li.node-selected").click();
            $(".search-result").eq(0).addClass("node-selected").css({backgroundColor:"#428bca"});
        }else if ( nodeNum >= (results.length-1) ){
            $(".search-result").removeClass("node-selected").css({backgroundColor:"undefined"});
            $(".search-result").eq(results.length-1).addClass("node-selected").css({backgroundColor:"#428bca"});
            $(".treeview-searchable").scrollTop($(".search-result").eq(length-1).position().top)
        }else{
            $(".search-result").removeClass("node-selected").css({backgroundColor:"undefined"});
            $(".search-result").eq(nodeNum).addClass("node-selected").css({backgroundColor:"#428bca"});
            console.log($(".search-result").eq(nodeNum).position().top);
            $(".treeview-searchable").scrollTop($(".search-result").eq(nodeNum).position().top)
        }
        nodeNum++;
    }
};
//  查询 : 1，单击查询按钮； 2，输入同步查询
var nodeNum = 0;
$("#btn-search").on("click",search);
$("#input-search").on("keyup", function (ev) { // enter键查询
    ev = ev || window.event;
    if (ev.keyCode == 13){
        search();
    }
});
//  展开和折叠所有tree
$(".enable-tree").on("click", function () {
   $(".treeview-searchable").treeview('collapseAll', { silent: true });
});
$(".expand-tree").on("click", function () {
   $(".treeview-searchable").treeview('expandAll',{ silent: true });
});
/* 选中员工放进输入框 */
function pick(){
    var num = parseInt($(".treeview-searchable").find("li.node-selected").children(".badge").text());
    if(num === 0){
        var choose = $(".treeview-searchable").find("li.node-selected").contents().filter(function() {
            return this.nodeType === 3;
        }).text();  // 获取主节点的文本
        $(".openModal").eq(publicIndex).val(choose);
        bodyScroll.beforeClose();
        $("#modal1").modal("hide");
    }else{
        alert("请继续选择");
    }
}
$(".confirm-choose-result").on("click",pick);

// 关闭模态框的同时清空搜索框和所有的搜索结果
$(".close").on("click", closeDoing);
$(".close-modal").on("click", closeDoing);
function closeDoing(){
    bodyScroll.beforeClose();
    $(".modal").modal("hide");
    $(".treeview-searchable").treeview('clearSearch');
    $("#input-search").val("");
    nodeNum = 0;
    $(".treeview-searchable").scrollTop(0);
    $(".treeview-searchable").find("li").removeClass("tr_bg"); /* 关闭选中状态*/
    $(".temporarySupport").find("tr").removeClass("tr_bg"); /* 关闭选中状态*/
    $("#supplier tbody").find("tr").removeClass("tr_bg");/* 解绑选中状态 */
    $("#personal tbody").find("tr").removeClass("tr_bg");
    $(".openModal2").eq(publicIndex).val("");  /* 当前的暂支单被清空 */
    $(".openModal3").val("");/* 清空模态框三中的内容 */
    $(".bank").val("");
    $(".bank-account").val("");
}
//  下拉菜单聚焦清空
$(".select-menu").on("focus", function () {
    $(this).val("")
});

/* 模态框2（单据）*/ //*********************************************************
var data = [
    {
        index:0,
        bianhao:"YMG20170217001",
        type:"暂支单",
        expenseAccount:"L2信息费",
        department:"sh总经办",
        applicant:"用户1",
        date:"2017-2-17",
        borrowBalance:"111",
        alreadyPaid:"22",
        outstandingAmount:"89",
        abstract:""
    },
    {
        index:1,
        bianhao:"YMG201702170014",
        type:"暂支单",
        expenseAccount:"品牌推广费",
        department:"sh总经办",
        applicant:"用户1",
        date:"2017-2-17",
        borrowBalance:"370",
        alreadyPaid:"22",
        outstandingAmount:"348",
        abstract:""
    }
];
// 聚焦显示模态窗2
showModal(".openModal2","#modal2");
btnShowModal(".btn-temp-payment","#modal2");// 点击显示模态窗2
$.each(data, function (index,item) {
    var trC = $("<tr/>");
    for(var key in item){
        var td = $("<td/>").text(item[key]);
        trC.append(td);
    }
    $(".temporarySupport").append(trC);
});
/* 单击选中单据行 */
$(".temporarySupport tbody").on("click","tr",function () {
    $(".temporarySupport tbody").find("tr").removeClass("tr_bg");
    $(this).addClass("tr_bg");
    var cont = $(this).find("td").eq(1).text();
    $(".openModal2").eq(publicIndex).val(cont);
});
$(".confirm-choose-result1").on("click", function () {
    if($(".temporarySupport tbody").find("tr").hasClass("tr_bg")){
        var $cont = $(".openModal2").eq(publicIndex).val();
        if ( $cont != "" ){
            $(".temporarySupport tbody").find("tr").removeClass("tr_bg");
            bodyScroll.beforeClose();
            $("#modal2").modal("hide");
        }
    }else{
        alert("请选择")
    }
});

/* 模态框三（收款方） *///**********************************************************
showModal(".openModal3","#modal3");   // 收款方
btnShowModal(".btn-benefit","#modal3"); // 点击选择模态窗3

showModal(".openModal4","#modal1");  // 付款方式
btnShowModal(".btn-way","#modal1"); // 点击选择模态窗3
var dataPersonal = [
    {
        num:0,
        name:"用户1",
        account:13124657,
        bank:"工商银行",
        beneficiary:"上海益盟",
        openAccount:"农业银行",
        province:"上海",
        country:"闸北",
        licenseNumber:"1234567644"
    },
    {
        num:1,
        name:"用户2",
        account:13124657,
        bank:"招商银行",
        beneficiary:"李上方",
        openAccount:"农业银行",
        province:"北京",
        country:"闸北",
        licenseNumber:"1234567644"
    },
    {
        num:2,
        name:"用户3",
        account:13124657,
        bank:"工商银行",
        beneficiary:"上海益盟",
        openAccount:"工商银行",
        province:"上海",
        country:"闸北",
        licenseNumber:"1234567644"
    }
];
var dataSupplier = [
    {
        num:1,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"上海益盟",
        openAccount:"农业银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:2,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"招商银行",
        beneficiary:"李上方",
        openAccount:"农业银行",
        province:"北京",
        country:"闸北"
    },
    {
        num:3,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"上海益盟",
        openAccount:"工商银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:4,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"华夏银行",
        beneficiary:"李上方",
        openAccount:"花旗银行",
        province:"南京",
        country:"闸北"
    },
    {
        num:5,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"光明银行",
        beneficiary:"上海益盟",
        openAccount:"农业银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:6,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:7,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"光明银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:8,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:9,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"光明银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:10,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:11,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:12,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:13,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:14,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:15,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    },
    {
        num:16,
        name:"上海益同软件技术有限公司",
        account:13124657,
        bank:"工商银行",
        beneficiary:"李上方",
        openAccount:"中国银行",
        province:"上海",
        country:"闸北"
    }
];
$.each(dataPersonal, function (index,item) { // 循环json数据，展示在table中
    var trC = $("<tr/>");
    for(var key in item){
        var td = $("<td/>").text(item[key]);
        trC.append(td)
    }
    $("#personal").find("tbody").append(trC);
});
$.each(dataSupplier, function (index,item) {
    var trC = $("<tr/>");
    for(var key in item){
        var td = $("<td/>").text(item[key]);
        trC.append(td)
    }
    $("#supplier").find("tbody").append(trC);
});
var totalArr = $("#supplier tbody").find("tr");  // 将拿到的供应商银行信息放到数组里  ！important

/* 根据选择呈现的信息数量 */
function msgShowNum(activeIndex){
    var showNum = parseInt($("#modal3").find(".modal-footer select").val());  //每页显示的数量
    var maxNum = totalArr.length; // 总数组的长度
    var showArr = [];
    var totalPages = 0;  // 总页数
    var bigPageNum = []; // 分成的数组的集合  把每一页的数据放进一个数组
    if (showNum >= maxNum){
        bigPageNum.push(totalArr);
    }else{
        showNum = showNum;
        for (var i = 0; i < maxNum; i = i+showNum ){
            showArr = totalArr.slice(i,i+showNum);
            bigPageNum.push(showArr);
        }
    }
    totalPages = "共"+bigPageNum.length+"页";
    $("#modal3 .pages").find("span").eq(2).text(totalPages);
    $("#modal3 .pages").find("input").val(activeIndex+1);
    $("#modal3").find("#supplier tbody").html(bigPageNum[activeIndex]);
    return bigPageNum;
}
var getArr = msgShowNum(0);  // 拿到 bigPageNum ，getArr = bigPageNum
$("#modal3 .pages").find("span").eq(0).on("click", function () { //第一页
    msgShowNum(0);
});
$("#modal3 .pages").find("span").eq(1).on("click", function () { //上一页
    var _index = parseInt($("#modal3 .pages").find("input").val());
    var getIndex = _index-1;
    if (getIndex==0){
        _index = 0;
    }else{
        _index = getIndex-1
    }
    msgShowNum(_index);
});
$("#modal3 .pages").find("span").eq(3).on("click", function () { //下一页
    var _index = parseInt($("#modal3 .pages").find("input").val());
    console.log(getArr.length);
    if (_index==getArr.length){
        return;
    }else{
        _index = _index;
    }
    msgShowNum(_index);
});
$("#modal3 .pages").find("span").eq(4).on("click", function () { //最后一页
    msgShowNum(getArr.length-1);
});
$("#modal3").find(".modal-footer select").on("change", function () {
    msgShowNum(0);
    getArr = msgShowNum(0);  // 切换每页的显示数量时先清空getArr ！important
});
//  搜索收款方信息
function searchItem(){//  后台验证 ！！！
    var chooseItem = [];
    var searchVal = $("#supplierInput").val();
    var ss = $("#supplier tbody").find("td");
    $.each(ss, function (index,item) {
        var _item = $(item).text();
        if (searchVal == _item){
            chooseItem.push($(item).parent());
        }
        $("#modal3").find("#supplier tbody").html(chooseItem);
    });
};
$(".supplierInputBtn").on("click",searchItem);
$("#supplierInput").on("keyup", function (ev) {// 按 enter 键发送
    ev = ev || window.target;
   if (ev.keyCode == 13){
       $(".supplierInputBtn").click();
   }
});
/* 选择收款方 */
function dblClcikEvent(){
    $(this).addClass("tr_bg");
    $(this).siblings().removeClass("tr_bg");
    var chooseText = $(this).find("td").eq(4).text();
    var chooseBank = $(this).find("td").eq(3).text();
    var chooseBankAccount = $(this).find("td").eq(8).text();
    $(".openModal3").val(chooseText);
    $(".bank").val(chooseBank);
    $(".bank-account").val(chooseBankAccount);
}
$(".confirm-choose-result2").click(function () { // 点击 确定 时关闭选中内容 关闭模态框
    bodyScroll.beforeClose();
    $("#modal3").modal("hide");
    $("#supplier tbody").find("tr").removeClass("tr_bg");
    $("#personal tbody").find("tr").removeClass("tr_bg");
});
$("#supplier tbody").find("tr").on("click", dblClcikEvent);
$("#personal tbody").find("tr").on("click", dblClcikEvent);
/* 导航模态层 *///**********************************************************
var tag = false;
$(".navbar-toggle").click(function () {
    if (!tag){
        tag = true;
        $("nav").css({zIndex:10000});
        $(".modal-screen").show().css({zIndex:1030});
    }else {
        tag = false;
        bodyScroll.beforeClose();
        $(".modal-screen").hide();
    }
});
$(".noBorder").on("focus", function () {
    $(this).blur()
});
/* 改变输入框的大小 */

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flagJ = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flagJ = false;
            break;
        }
    }
    return flagJ;
}
var resFlagJ = IsPC();

/* 跨列函数 */
function full (cls,num){
    if(resFlagJ){
        var parentW = 0;
        var baseW = 0;
        var baseW_tips = 0;
        var baseW_input = 0;
        var per = 0;
        var baseW1 = 0;
        var baseW2 = 0;
        parentW = parseFloat($(cls).find(".row").width());  //跨列的row的宽度
        console.log(parentW);
        baseW = parseFloat($(".col-md-4").css("width"))+parseFloat($(".col-md-4").css("padding-left"))+parseFloat($(".col-md-4").css("padding-right")); // 固定宽度一个控件的宽度
        baseW1 = baseW/3;//十二分之四
        per = (baseW1/parentW) *100+"%"; //(baifenbi )
        console.log(baseW);
        baseW2 = baseW/12;//十二分之一
        baseW_tips = (baseW2/parentW) *100+"%" ;  // * 的宽度（百分比）
        baseW_input = 100*(1-baseW1/parentW-baseW2/parentW)+"%"; // input 的宽度
        console.log(baseW_input);
        var $ele =null;
        switch (num){
            case "1":
                $ele = $("div[data-col='1']");
                break;
            case "2":
                $ele = $("div[data-col='2']");
                break;
            case "3":
                $ele = $("div[data-col='3']");
                break;
            case "4":
                $ele = $("div[data-col='4']");
                break;
            case "5":
                $ele = $("div[data-col='5']");
                break;
            case "6":
                $ele = $("div[data-col='6']");
                break;
            case "7":
                $ele = $("div[data-col='7']");
                break;
        }
        $ele.find(".colc-md-4").css({width:per});
        $ele.find(".colc-md-7").css({width:baseW_input});
        $ele.find(".colc-md-1").css({width:baseW_tips});
    }
}
$.each($("div[data-col]"), function (index,item) {
    var $num = $(item).attr("data-col");
    var choose_num=null;
    switch ($num){
        case "1":
            choose_num = ".col-md-4";
            break;
        case "2":
            choose_num = ".col-md-8";
            break;
        case "3":
            choose_num = ".col-md-12";
            break;
        case "4":
            choose_num = ".col-md-16";
            break;
        case "5":
            choose_num = ".col-md-20";
            break;
        case "6":
            choose_num = ".col-md-24";
            break;
        case "7":
            choose_num = ".col-md-28";
            break;
    }
    full(choose_num,$num);
});
/* 非编辑状态 */
$(".submitPage").on("click", function () {
    $("header").hide();
    $("#addWidget").hide();
    $(".form-control").css({"border-width":0});
    $(".tips").hide();
    $(".input-group-btn").hide();
    $(".input-group-addon").hide();
    $(".edit-no").show();  // 编辑时添加一个透明的模态层
    $("select").addClass("hide-select");
    $(".modal-screen").hide(); // 隐藏手机端的模态层
    $(".del").hide();/* 隐藏 × */
    $("input[type='number']").css({"-moz-appearance":"textfield"});/* 隐藏火狐的数字输入框的上下箭头 */
});

/* 选项卡 */
$(".nav-tabs li").on("click", function () {
    $(".nav-tabs li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").find(".tab-pane").eq($(this).index()).addClass("active").siblings().removeClass("active");
});

/* 判断高度，flex 布局  */
$(window).on("resize", function () {
    beFlex();
});
/* 当发生换行时，变成flex布局 */
function beFlex(){
    $.each($(".test"), function (index,item) {
        var firstW = parseFloat($(item).children().first().height());
        //console.log("firstW:"+firstW);
        var secW = parseFloat($(item).children().eq(1).height());
        //console.log("secW:"+secW);
        if (firstW > secW){
            $(item).children().first().css({"width":"auto"});
            $(item).addClass("test-flex");
            $(item).children().eq(1).css({"flex":1})
        }
    });
}
beFlex();
/* 滚动穿透，保存滚动条位置 */
var bodyScroll = (function(bodyCls) {
    var ScrollTop;
    return {
        afterOpen: function() {
            //ScrollTop = document.scrollingElement.scrollTop;
            ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //ScrollTop = $(window).scrollTop();
            $(document.body).addClass(bodyCls);
            //document.body.classList.add(bodyCls);
            //document.body.style.top = -ScrollTop + 'px';
            $(document.body).scrollTop(-ScrollTop);
            console.log(ScrollTop);
        },
        beforeClose: function() {
            $(document.body).removeClass(bodyCls);
            //document.body.classList.remove(bodyCls);
            //document.scrollingElement.scrollTop = ScrollTop;
            $(document.body).scrollTop(ScrollTop)
            console.log(ScrollTop)
        }
    };
})('modal-open');
/*(function () {
    if (document.scrollingElement) {
        return
    }
    var element = null;
    function scrollingElement () {
        if (element) {
            return element
        } else if (document.body.scrollTop) {
            // speed up if scrollTop > 0
            return (element = document.body)
        }
        var iframe = document.createElement('iframe')
        iframe.style.height = '1px'
        document.documentElement.appendChild(iframe)
        var doc = iframe.contentWindow.document
        doc.write('<!DOCTYPE html><div style="height:9999em">x</div>')
        doc.close()
        var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight
        iframe.parentNode.removeChild(iframe)
        return (element = isCompliant ? document.documentElement : document.body)
    }
    Object.defineProperty(document, 'scrollingElement', {
        get: scrollingElement
    })
})()*/