/*
*    Filename: sorter.js
*    Description: None.
*    Last modified: 2014-10-30 09:33
*
*    陈炜健 － 13331018
*    Email: eleveneat@gmail.com
*/

/*
*    已改进：1. 不直接在js里面改变样式，采用给元素属性赋值方式从而间接在css中修改样式的方案。
*           2. 修改且完善了一些注释和格式的问题。
*    未改进：
*           1. 兼容问题。仍未想出较好的方案从而兼容其他网站不同格式的table，例如表头表格也是tr的table。
*/

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() { //从document对象中得到所有的table
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) { //变成sortable
	for (var i = tables.length - 1; i >= 0; i--) {
		var ths = tables[i].getElementsByTagName('th');
		for (var foo = ths.length - 1; foo >= 0; foo--) {
			ths[foo].addEventListener('click', toSort_ascending);
		}
	}
}

function toSort_ascending(event) { //升序排序
	var sortedTable = this.parentNode.parentNode.parentNode; //得到点击所在的table
	var ths = sortedTable.getElementsByTagName('th');
	reset_Other_Th(ths); //重置此table其他表头单元格的状态

	var th_pos = -1; //所点击的栏目位置
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}

	var trs = sortedTable.getElementsByTagName('tr');
	for (var j = 1; j < trs.length-1; j++) { //冒泡排序
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue > tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2); //互换
			}
		}
	}

	//给所点击的表头单元格的className赋值，从而改变样式
	this.className = "ascend";
	//移除升序的事件发生器，添加降序的事件发生器
	this.removeEventListener('click', toSort_ascending);
	this.addEventListener('click', toSort_descending);
}

function toSort_descending(event) { //降序排序
	var sortedTable = this.parentNode.parentNode.parentNode; //得到点击所在的table
	var ths = sortedTable.getElementsByTagName('th');

	var th_pos = -1; //所点击的栏目位置
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}

	var trs = sortedTable.getElementsByTagName('tr');
	for (var j = 1; j < trs.length-1; j++) { //冒泡排序
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue < tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2); //互换
			}
		}
	}

	//给所点击的表头单元格的className赋值，从而改变样式
	this.className = "descend";
	//移除降序的事件发生器，添加升序的事件发生器
	this.removeEventListener('click', toSort_descending);
	this.addEventListener('click',toSort_ascending);
}

function reset_Other_Th(ths) { //重置表头单元格的状态
	for (var i = ths.length - 1; i >= 0; i--) {
		ths[i].className = ""; //把单元格的className赋为空，从而实现从高亮样式变回原状态样式的效果
		ths[i].removeEventListener('click', toSort_descending);
		ths[i].addEventListener('click',toSort_ascending);
	}
}

function tr_Exchang(tds_1, tds_2) { //互换td的文本内容
	var len = tds_1.length;
	for (var i = 0; i < len; i++) {
		var tmp = tds_1[i].firstChild.nodeValue;
		tds_1[i].firstChild.nodeValue = tds_2[i].firstChild.nodeValue;
		tds_2[i].firstChild.nodeValue = tmp;
	}
}
