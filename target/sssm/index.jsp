<html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <title>Search</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
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
            //console.log(jsonStr);
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

            <input type="button" value="Search" onclick="submitUserList();">

        </div>
    </div>
    <div>
        <table class="table table-hover">
            <thead>
            <th>姓名</th>
            <th>身份证号</th>
            </thead>
            <tbody>
            <c:forEach items="${users2}" var="user">
                <tr>
                    <td>${user.username}</td>
                    <td>${user.certNo}</td>
                </tr>

            </c:forEach>
            </tbody>
        </table>
    </div>
    <a href="search/family2">jstl Test</a>
</div>
</body>
</html>
