/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2014-10-29 16:56:52
*/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}

var shortedth = new Array(); // 用于标记已排序的th

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        shortedth[i] = new Array();
        var oThead = tables[i].getElementsByTagName('thead');
        for (var j = 0; j < oThead.length; j++) {
            shortedth[i][j] = new Array();
            var oTh = oThead[j].getElementsByTagName('th');
            if (oTh.length == 0) oTh = oThead[j].getElementsByTagName('td'); // 为西西里君专门做的兼容优化
            for (var k = 0; k < oTh.length; k++) {
                shortedth[i][j][k] = 0;
                oTh[k].addEventListener('click', toShort);
            }
        }
    }
}

function toShort(event) {
    // 找到调用的th的i, j, k编号
    var tables = getAllTables();
    var mTable = this.parentNode.parentNode.parentNode;
    var mThead = this.parentNode.parentNode;
    var mTh = this;
    for (var i = 0; i < tables.length &&
        tables[i].innerHTML != mTable.innerHTML; i++);
    var oThead = tables[i].getElementsByTagName('thead');
    for (var j = 0; j < oThead.length && 
        oThead[j].innerHTML != mThead.innerHTML; j++);
    var oTbody = tables[i].tBodies[j];
    var oTh = oThead[j].getElementsByTagName('th');
    if (oTh.length == 0) oTh = oThead[j].getElementsByTagName('td');
    for (var k = 0; k < oTh.length &&
        oTh[k].innerHTML != mTh.innerHTML; k++);

    // 排序并更新tbody
    var oTr = oTbody.rows;
    var retr = new Array();
    for(var ii = 0; ii < oTr.length; ii++) {
        retr[ii] = oTr[ii];
    }
    if (shortedth[i][j][k]) {
        retr.reverse();
    } else {
        retr.sort(getcmp(k)); // 调用sort函数并传入比较函数进行排序
    }
    var reFrag = document.createDocumentFragment();
    for(var ii = 0; ii < retr.length; ii++) {
        reFrag.appendChild(retr[ii]);
    }
    oTbody.appendChild(reFrag);

    // 更新th和tr
    this.style.backgroundColor = "#7FFFD4";
    if (shortedth[i][j][k] == 1) { // 点击的列表已是升序时不同处理
        this.style.backgroundImage = 'url("images/descend.png")';
        shortedth[i][j][k] = -1;
    } else {
        this.style.backgroundImage = 'url("images/ascend.png")';
        shortedth[i][j][k] = 1;
    }
    for (var ii = 0; ii < oTh.length; ii++) //对本列中其他th进行还原
        if (ii != k) {
            shortedth[i][j][ii] = 0;
            oTh[ii].style.backgroundColor = "#000080";
            oTh[ii].style.backgroundImage = "";
        }
    var ooTr = oTbody.getElementsByTagName('tr'); // tr背景色变化
    for (var i = 0; i < ooTr.length; i++) {
        if (i % 2) ooTr[i].style.backgroundColor = "#FFE4E1";
        else ooTr[i].style.backgroundColor = "white";
    }
}
function getcmp(k) { // 比较函数
    return function cmp(tr1, tr2) {
        var val1, val2;
        val1 = tr1.cells[k].textContent; // 取元素的文本内容
        val2 = tr2.cells[k].textContent;
        if (!isNaN(Number(val1))) { // 对数字进行排序，从而不会出现10出现在2前面的问题
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}
    // var tables = getAllTables();
    // makeAllTablesSortable(tables);