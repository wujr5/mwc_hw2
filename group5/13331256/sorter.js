/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2014-10-30 10:36:19
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
        if (oThead.length != 0) { // 有thead
            for (var j = 0; j < oThead.length; j++) {
                shortedth[i][j] = 0;
                var oTh = oThead[j].getElementsByTagName('th');
                if (oTh.length == 0) oTh = oThead[j].getElementsByTagName('td'); // 为西西里君专门做的兼容优化
                for (var k = 0; k < oTh.length; k++)
                    oTh[k].addEventListener('click', toShort);
            }
        } else {
            var oTbody = tables[i].getElementsByTagName('tbody');
            for (var jj = 0; jj < oTbody.length; jj++) {
                shortedth[i][jj] = 0;
                var oTh2 = oTbody[jj].getElementsByTagName('th');
                if (oTh2.length == 0)
                    oTh2 = oTbody[jj].getElementsByTagName('tr')[0].getElementsByTagName('td');
                for (var kk = 0; kk < oTh2.length; kk++)
                    oTh2[kk].addEventListener('click', toShort);
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
    var noth = false, nothead = false;
    // 确定table编号i
    for (var i = 0; i < tables.length &&
        tables[i].innerHTML != mTable.innerHTML; i++);
    // 确定thead/tbody编号j
    var oThead = tables[i].getElementsByTagName('thead');
    if (oThead.length == 0) {
        oThead = tables[i].getElementsByTagName('tbody');
        nothead = true;
    }
    for (var j = 0; j < oThead.length && 
        oThead[j].innerHTML != mThead.innerHTML; j++);
    var oTbody = tables[i].tBodies[j];
    // 确定th/td编号k
    var oTh = oThead[j].getElementsByTagName('th');
    if (oTh.length == 0) {
        oTh = oThead[j].getElementsByTagName('tr')[0].getElementsByTagName('td');
        noth = true;
    }
    for (var k = 0; k < oTh.length &&
        oTh[k].innerHTML != mTh.innerHTML; k++);

    // 排序并更新tbody
    var oTr = oTbody.rows;
    var retr = new Array();
    for(var ii = 0; ii+nothead < oTr.length; ii++)
        retr[ii] = oTr[ii+nothead];
    if (shortedth[i][j] == k+1 || shortedth[i][j] == -k-1) {
        retr.reverse();
    } else {
        retr.sort(getcmp(k)); // 调用sort函数并传入比较函数进行排序
    }
    var reFrag = document.createDocumentFragment();
    if (nothead) reFrag.appendChild(oTr[0]);
    for(var ii = 0; ii < retr.length; ii++)
        reFrag.appendChild(retr[ii]);
    oTbody.appendChild(reFrag);

    // 更新tr背景色和th
    var ooTr = oTbody.getElementsByTagName('tr'); // tr背景色变化
    var firsttr = nothead ? 1 : 0;
    for (var jj = firsttr; jj < ooTr.length; jj++) {
        if ((jj+firsttr) % 2) ooTr[jj].style.backgroundColor = "#FFE4E1";
        else ooTr[jj].style.backgroundColor = "white";
    }
    var oldshortedth = shortedth[i][j] == 0 ? -1 : Math.abs(shortedth[i][j])-1;
    if (oldshortedth == -1) { // 对本列中th进行初始化
        for (var ii = 0; ii < oTh.length; ii++) {
            oTh[ii].style.backgroundColor = "#000080";
            oTh[ii].style.backgroundImage = "";
        }
    } else { // 对本列中之前排序的th初始化
        oTh[oldshortedth].style.backgroundColor = "#000080";
        oTh[oldshortedth].style.backgroundImage = "";
    }
    if (shortedth[i][j] == k+1) { // 点击的列表已是升序时不同处理
        this.style.backgroundImage = 'url("images/descend.png")';
        this.style.backgroundRepeat = 'no-repeat';
        this.style.backgroundPosition = 'right';
        this.style.cursor = 'pointer';
        shortedth[i][j] = -k-1;
    } else {
        this.style.backgroundImage = 'url("images/ascend.png")';
        this.style.backgroundRepeat = 'no-repeat';
        this.style.backgroundPosition = 'right';
        this.style.cursor = 'pointer';
        shortedth[i][j] = k+1;
    }
    this.style.backgroundColor = "#7FFFD4";
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