<?php
	$host="localhost";
	$db_user="root";
	$db_pass="mysqlroot";
	$db_name="test_user";
	$timezone="Asia/Shanghai";

	$link=mysqli_connect($host,$db_user,$db_pass,$db_name);
	//mysql_query("SET names UTF8");

	//header("Content-Type: text/html; charset=utf-8");
	///date_default_timezone_set($timezone); //北京时间
?>
