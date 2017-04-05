<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-03-27
  Time: 17:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <title>Search</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
</head>
<body>
<h2>添加用户成功</h2>
<h2>${requestScope.添加成功}</h2>
${requestScope.user}

<br>
<div>
    <table class="table table-hover">
        <thead>
        <th>姓名</th>
        <th>身份证号</th>
        </thead>
        <tbody>
        <c:forEach items="${user2}" var="user">
            <tr>
                <td>${user.username}</td>
                <td>${user.certNo}</td>
            </tr>

        </c:forEach>
        </tbody>
    </table>
</div>

</body>
</html>
