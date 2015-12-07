<?php
include_once('connect.php');

$page = intval($_POST['pageNum']);

$result = mysqli_query($link,"select id from food");
$total = mysqli_num_rows($result);//总记录数

$pageSize = 8; //每页显示数
$totalPage = ceil($total/$pageSize); //总页数

$startPage = $page*$pageSize;
$arr['total'] = $total;
$arr['pageSize'] = $pageSize;
$arr['totalPage'] = $totalPage;
$query = mysqli_query($link,"select id,title,pic from food order by id asc limit $startPage,$pageSize");
while($row=mysqli_fetch_array($query,MYSQLI_BOTH)){
	 $arr['list'][] = array(
	 	'id' => $row['id'],
		'title' => $row['title'],
		'pic' => $row['pic'],
	 );
}
//print_r($arr);
echo json_encode($arr);
?>