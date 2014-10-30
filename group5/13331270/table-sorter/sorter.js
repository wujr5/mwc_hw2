window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}
var change = [0, 0, 0, 0, 0, 0]; //用来识别当前排序列
function sortTables(tableId, iCol, nClick, dataType) {
    var table = document.getElementById(tableId);
    var tbody = table.tBodies[0];  
    var colRows = tbody.rows;
    var aTrs = new Array;

    for (var i=0; i < colRows.length; i++) {  //将将得到的列放入数组，备用  
        aTrs[i] = colRows[i];  
    }

    if (table.sortCol == iCol) {  //判断上一次排列的列和现在需要排列的是否同一个。 
        aTrs.reverse();
    } else {
        aTrs.sort(compareEle(iCol, dataType));  //如果不是同一列，使用数组的sort方法，传进排序函数  
    }

    var oFragment = document.createDocumentFragment();  

    for (var i=0; i < aTrs.length; i++) {
        oFragment.appendChild(aTrs[i]);
    }
    tbody.appendChild(oFragment);

    table.sortCol = iCol;  //记录最后一次排序的列索引  

    var th = document.getElementsByTagName("th");
    var num;
    if (nClick < 3) {
        num = 3;
        i = 0;
    } else {
        num = 6;
        i = 3;
    }
    for (; i < num; i++) { //全部列原来的样式
    	th[i].className = 'nochange';
    }
    if (change[nClick] == 0) { //升序排列样式
    	th[nClick].className = 'changeAscend';
    	change[nClick] = 1;
    } else {	//降序排列样式
    	th[nClick].className = 'changeDescend';
    	change[nClick] = 0;
    }
}
function convert(sValue, dataType) {
    switch(dataType) {
    case "int":
        return parseInt(sValue);
    case "float":
        return parseFloat(sValue);
    case "date":
        return new Date(Date.parse(sValue));
    default:
        return sValue.toString();
    }  
}
function compareEle(iCol, dataType) {  //排序函数，iCol表示列索引，dataType表示该列的数据类型  
    return  function (oTR1, oTR2) {  
        var vValue1 = convert(oTR1.cells[iCol].textContent, dataType);
        var vValue2 = convert(oTR2.cells[iCol].textContent, dataType);
        if (vValue1 < vValue2) {
            return -1;
        } else if (vValue1 > vValue2) {  
            return 1;
        } else {  
            return 0;
        }
    };
}
function makeAllTablesSortable(tables) {
	var th = document.getElementsByTagName("th");

	th[0].onclick = function() {sortTables(tables[0].id, 0, 0);}
	th[1].onclick = function() {sortTables(tables[0].id, 1, 1, 'date');}
	th[2].onclick = function() {sortTables(tables[0].id, 2, 2);}
	th[3].onclick = function() {sortTables(tables[1].id, 0, 3);}
	th[4].onclick = function() {sortTables(tables[1].id, 1, 4);}
	th[5].onclick = function() {sortTables(tables[1].id, 2, 5, 'date');}
}
