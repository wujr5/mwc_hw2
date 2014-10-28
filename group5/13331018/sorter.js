/*
*    Filename: sorter.js
*    Description: None.
*    Last modified: 2014-10-27 15:06
*
*    陈炜健 － 13331018
*    Email: eleveneat@gmail.com
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
			ths[foo].addEventListener('click', toSort_ascending)
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

	//改变点击的表头单元格样式，移除升序的事件发生器，添加降序的事件发生器
	this.removeEventListener('click', toSort_ascending);
	this.style.backgroundColor = "rgba(150, 156, 255, 1)";
	this.style.backgroundImage = "url(images/ascend.png)";
	this.style.backgroundRepeat = "no-repeat";
	this.style.backgroundPosition = "top right";
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

	//改变点击的表头单元格样式，移除降序的事件发生器，添加升序的事件发生器
	this.removeEventListener('click', toSort_descending);
	this.style.backgroundImage = "url(images/descend.png)";
	this.style.backgroundPosition = "top right";
	this.addEventListener('click',toSort_ascending);
}

function reset_Other_Th(ths) { //重置表头单元格的状态
	for (var i = ths.length - 1; i >= 0; i--) {
		ths[i].style.backgroundColor = "rgba(3, 12, 110, 1)";
		ths[i].style.backgroundImage = "";
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
