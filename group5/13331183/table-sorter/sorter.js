window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
function getAllTables() {
    return document.getElementsByTagName("table");
}
function makeAllTablesSortable(tables) {
    for (var i = 0 ; i < tables.length ; ++i) {
	(function(num_i) {
	    var head = tables[num_i].getElementsByTagName('th');//得到第i个table的所有“th”节点
	    var tbodys = tables[num_i].getElementsByTagName('tbody');//得到第i个table的“tbody”节点
	    var trs = tbodys[0].getElementsByTagName("tr");//得到第i个table的“tbody“中的所有”tr"节点
	    var temps = [];
	    for(var k = 0 ; k < trs.length ; ++k) {//将第i个table中“tbody”中的所有“tr“节点放入temps数组中，方便进行对应要求的排序
		temps.push(trs[k]);
	    }
	    for (j = 0 ; j < head.length ; ++j) {
		(function(num_j) {
		    head[num_j].onclick = function() {
			for (var k = 0 ; k < head.length ; ++k) {
			    if (k != num_j) {
				head[k].className = "";//将没有点击的表头的样式去掉，避免多个排序标志出现
			    }
			}
			head[num_j].className =  (head[num_j].className == "change_up" ?  "change_down" : "change_up");//判定该表要进行升序还是降序排序
			temps.sort(function(left, right) {//定义不同排序要求时的排序函数
			    if (head[num_j].className == "change_up") {
				return left.childNodes[num_j * 2 + 1].childNodes[0].nodeValue 
				    > right.childNodes[num_j * 2 + 1].childNodes[0].nodeValue;
							} else {
							    return left.childNodes[num_j * 2 + 1].childNodes[0].nodeValue
								< right.childNodes[num_j * 2 + 1].childNodes[0].nodeValue;}
			});
			for (var k = 0 ; k < temps.length ; ++k) {
			    temps[k].className = "";
			    tbodys[0].appendChild(temps[k]);//把按要求排好序的”tr“节点重新接回DOM树中
			}
			temps[1].className = "alternate";//把列表的偶数行（对于该表即只是第二行）设为浅灰色
		    }
		})(j);
	    }
	})(i);
    }
}