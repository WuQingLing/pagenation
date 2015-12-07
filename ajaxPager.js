var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page){ 
	$.ajax({
		type: 'POST',
		url: 'pages.php',
		data: {'pageNum':page-1},
		dataType:'json',
		beforeSend:function(){
			$("#loading").html("<img id='loadin'g src='loading.gif'>");
		},
		success:function(json){
			$("#loading").html("");
			$("#list ul").empty();
			total = json.total; //总记录数
			pageSize = json.pageSize; //每页显示条数
			curPage = page; //当前页
			totalPage = json.totalPage; //总页数
			var li = "";
			var list = json.list;
			$.each(list,function(index,array){ //遍历json数据列
				li += "<li><a href='#'><img src='"+array['pic']+"'></a><p>"+array['title'].substring(0,10)+"</p></li>";
			});
			$("#list ul").append(li);
		},
		complete:function(){ //生成分页条
			getPageBar();
		},
		error:function(){
			alert("数据加载失败");
		}
	});
}

//获取分页条
function getPageBar(){
	//页码大于最大页数
	if(curPage>totalPage) curPage=totalPage;
	//页码小于1
	if(curPage<1) curPage=1;
	pageStr = "<span class=''>共"+total+"条"+curPage+"/"+totalPage+"</span>";
	
	//如果是第一页
	if(totalPage<=4)
	{
		if(curPage==1){
			pageStr += "<span class='cur'>1</span>";
			for(var i=2;i<=totalPage;i++)
			{
				pageStr += "<a href='javascript:void(0)' rel='"+i+"'>"+i+"</a>";
			}
		}else{
			pageStr += "<a href='javascript:void(0)' rel='1'><<</a><a href='javascript:void(0)' rel='"+(curPage-1)+"'><</a>";
			for(var i=1;i<=totalPage;i++)
			{
				if(i==curPage)
				{
					pageStr += "<span class='cur'>"+i+"</span>"
				}
				else
				{
					pageStr += "<a href='javascript:void(0)' rel='"+i+"'>"+i+"</a>";
				}
			}
			
		}
	}
	else//当页数大于5的时候就要这样显示1 2 3 4 ...
	{
		if(curPage<=3){
			if(curPage==1)
			{
				pageStr += "<span class='cur'>1</span>";
			}
			else
			{
				pageStr += "<a href='javascript:void(0)' rel='1'><<</a><a href='javascript:void(0)' rel='"+(curPage-1)+"'><</a>";
				pageStr += "<span class='cur'><a href='javascript:void(0)' rel='1'>1</a></span>";
			}
			for(var i=2;i<=4;i++)
			{
				if(i==curPage)
				{
					pageStr += "<span class='cur'>"+i+"</span>"
				}
				else
				{
					pageStr += "<a href='javascript:void(0)' rel='"+i+"'>"+i+"</a>";
				}
			}
			pageStr += "<span class='cur'>...</span>";
		}else{
			pageStr += "<a href='javascript:void(0)' rel='1'><<</a><a href='javascript:void(0)' rel='"+(curPage-1)+"'><</a>";
			pageStr += "<span class='cur'>...</span>";
			if(curPage>totalPage-2)
			{
				for(var i=totalPage-2;i<=totalPage;i++)
				{
					if(i==curPage)
					{
						pageStr += "<span class='cur'>"+i+"</span>"
					}
					else
					{
						pageStr += "<a href='javascript:void(0)' rel='"+i+"'>"+i+"</a>";
					}
				}
			}
			else
			{
				pageStr += "<a href='javascript:void(0)' rel='"+(curPage-1)+"'>"+(curPage-1)+"</a>";
				pageStr += "<span class='cur'>"+curPage+"</span>";
				pageStr += "<a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>"+(parseInt(curPage)+1)+"</a>";
				pageStr += "<span class='cur'>...</span>";
			}
		}
	}
	//如果是最后页
	if(curPage>=totalPage){
		//pageStr += "<span>></span>   <span>>></span>";
	}else{
		pageStr += "<a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>></a><a href='javascript:void(0)' rel='"+totalPage+"'>>></a>";
	}
		
	$("#pagecount").html(pageStr);
}

$(function(){
	getData(1);
	$("#pagecount  a").live('click',function(){
		var rel = $(this).attr("rel");
		if(rel){
			getData(rel);
		}
	});
});