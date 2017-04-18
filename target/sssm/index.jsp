<!DOCTYPE html>
<html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="css/jqgrid/ui.jqgrid.css">
    <link type="text/css" rel="stylesheet" href="css/jqgrid/jquery-ui.theme.min.css">
    <title>Search</title>
    <script  type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-migrate-1.2.1.js"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jqgrid/i18n/grid.locale-cn.js"></script>
    <script type="text/javascript" src="js/jqgrid/jquery.jqGrid.min.js"></script>

    <!-- 标示 -->
    <script type="text/javascript">
        (function ($) {
            $.fn.serializeJson = function () {
                debugger
                var jsonData1 = {};
                var serializeArray = this.serializeArray();
                // 先转换成{"id": ["12","14"], "name": ["aaa","bbb"], "pwd":["pwd1","pwd2"]}这种形式
                $(serializeArray).each(function () {
                    if (jsonData1[this.name]) {
                        if ($.isArray(jsonData1[this.name])) {
                            jsonData1[this.name].push(this.value);
                        } else {
                            jsonData1[this.name] = [jsonData1[this.name], this.value];
                        }
                    } else {
                        jsonData1[this.name] = this.value;
                    }
                });
                // 再转成[{"id": "12", "name": "aaa", "pwd":"pwd1"},{"id": "14", "name": "bb", "pwd":"pwd2"}]的形式
                var vCount = 0;
                // 计算json内部的数组最大长度
                for (var item in jsonData1) {
                    var tmp = $.isArray(jsonData1[item]) ? jsonData1[item].length : 1;
                    vCount = (tmp > vCount) ? tmp : vCount;
                }

                if (vCount > 1) {
                    var jsonData2 = new Array();
                    for (var i = 0; i < vCount; i++) {
                        var jsonObj = {};
                        for (var item in jsonData1) {
                            jsonObj[item] = jsonData1[item][i];
                        }
                        jsonData2.push(jsonObj);
                    }
                    return JSON.stringify(jsonData2);
                } else {
                    return "[" + JSON.stringify(jsonData1) + "]";
                }
            };
        })(jQuery);
        $(function () {
        });
        //添加属性值文本框
        function conAddAttrValue() {
            var liNum = document.getElementsByClassName("attrValueLI").length;
            liNum = parseInt(liNum) + 1;
            var text = '<li class="attrValueLI"id="attrValueLI' + liNum + '" >';
            text += '姓名：<input  id="username" name="username" type="text" class="priceinput" />&nbsp;身份证明号：<input  id="certNo" name="certNo" type="text" class="priceinput" />';
            text += '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="removeLi(' + liNum + ');" style="width:90px;">移除</a></li>';
            $(text).appendTo($("#attrValueUL"));
        }
        //删除属性值文本框
        function removeLi(i) {
            $("#attrValueLI" + i).remove();
        }
        function submitUserList() {
            var jsonStr = $("#form1").serializeJson();
           /* //console.log(jsonStr);
            $.ajax({
                url: "search/family",
                type: "POST",
                contentType: 'application/json;charset=utf-8', //设置请求头信息
                dataType: "json",
                data: jsonStr,
                success: function (data) {
                    console.log(data[0].certNo);
                },
                error: function (res) {
                    alert(res.responseText);
                }
            });*/
            showFCList(jsonStr);
        }
        function showFCList(jsonStr){
            $("#list1").jqGrid({
                url:"search/family/"+jsonStr,
                //postdata:jsonStr,
                ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
                datatype:"json", //数据来源，本地数据
                mtype:"GET",//提交方式
                prmNames : {search : "search"},
                height:300,//高度，表格高度。可为数值、百分比或'auto'
                //width:1000,//这个宽度不能为百分比
                autowidth:true,//自动宽
                multiselect: true,
                colNames:['房屋编号', '坐落', '面积','用途','业务号'],
                colModel:[
                    //{name:'id',index:'id', width:'10%', align:'center' },
                    {name:'realeunum',index:'realeunum', width:'20%',align:'center'},
                    {name:'roomlocation',index:'roomlocation', width:'25%',align:'center'},
                    {name:'buildarea',index:'buildarea', width:'20%', align:"center", sortable:true},
                    {name:'roomstruct',index:'roomstruct', width:'10%', align:"center"},
                    {name:'hruse',index:'hruse', width:'10%',align:"center"}
                ],
                rownumbers:true,//添加左侧行号
                altRows:true,//设置为交替行表格,默认为false
                //sortname:'createDate',
                //sortorder:'asc',
                viewrecords: true,//是否在浏览导航栏显示记录总数
                rowNum:15,//每页显示记录数
                rowList:[15,20,25],//用于改变显示行数的下拉列表框的元素数组。
                jsonReader:{
                    id: "blackId",//设置返回参数中，表格ID的名字为blackId
                    repeatitems : false
                },
                pager:$('#gridPager')
            });
            $("#list1").jqGrid('navGrid','#gridPager',{edit:true,add:true,del:true,view:true});
            jQuery("#list1").jqGrid('navButtonAdd','#gridPager',{
                caption: "打印",
                buttonicon:"ui-icon-print",
                title: "选择要的列",
                onClickButton : function (){
                    jQuery("#list1").jqGrid('columnChooser');
                }

            }).navSeparatorAdd("#gridPager",{sepclass : "ui-separator",sepcontent: ''}).navButtonAdd('#gridPager',{
                caption:"",
                title:"导出数据",
                buttonicon:"ui-icon-disk",
                onClickButton: function(){
                    alert("您没有选择一行，将导出所有数据");
                },
                position:"last"
            }).navButtonAdd('#gridPager',{
                caption:"",
                title:"哈哈",
                buttonicon:"ui-icon-print",

            });

        }

    </script>
    <style>


    </style>
</head>
<body>
<div class="container" style="margin-top: 60px;margin-bottom: 20px;">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">房产查询</h3>
        </div>
        <div class="panel-body">
            <fieldset>
                <legend>家庭搜索</legend>
                <form id="form1">

                    <ul id="attrValueUL">
                        <li class="attrValueLI" id="attrValueLI_1">
                            姓名：<input id="username" name="username" type="text" class="priceinput"/>
                            身份证明号：<input id="certNo" name="certNo" type="text" class="priceinput"/>
                            <a href="javascript:void(0);" onclick="conAddAttrValue();" style="width:90px;">&nbsp;&nbsp;继续添加属性值</a>
                        </li>
                    </ul>
                </form>
            </fieldset>
            <fieldset>
                <legend>模糊搜索</legend>
                <form id="form2">
                    <table class="vertical-custable">
                        <tr>
                            <td class="cusThead">坐落：</td>
                            <td colspan="2"><input type="text" id="location" name="location"></td>
                            <td class="cusThead">产权证号：</td>
                            <td colspan="2"><input type="text" id="ocertno" name="ocertno"></td>
                        </tr>
                    </table>
                </form>
            </fieldset>

            <input type="button" value="Search" onclick="submitUserList();">

        </div>
    </div>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">房产列表</h3>
        </div>
        <div class="panel-body">
            <!-- jqGrid table list4 -->
            <table id="list1"></table>
            <!-- jqGrid 分页 div gridPager -->
            <div id="gridPager"></div>
        </div>
    </div>
    <a href="search/family2">jstl Test</a>
</div>
</body>
</html>
