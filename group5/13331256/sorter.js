/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2014-10-28 19:31:45
*/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
function getAllTables() {
    return document.getElementsByTagName('table');
}
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var oThead = tables[i].getElementsByTagName('thead');
        for (var j = 0; j < oThead.length; j++) {
            var oTbody = tables[i].tBodies[j];
            var oTh = oThead[j].getElementsByTagName('th');
            for (var k = 0; k < oTh.length; k++) {
                oTh[k].addEventListener('click', toShort);
            }
        }
    }
}

function toShort(event) {
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
    for (var k = 0; k < oTh.length &&
        oTh[k].innerHTML != mTh.innerHTML; k++);

    var oTr = oTbody.rows;
    var retr = new Array();
    for(var ii = 0; ii < oTr.length; ii++) {
        retr[ii] = oTr[ii];
    }
    if (oTr.i == i && oTr.j == j && oTr.k == k) {
        retr.reverse();
    } else {
        retr.sort(getcmp(k));
    }
    var reFrag = document.createDocumentFragment();
    for(var ii = 0; ii < retr.length; ii++) {
        reFrag.appendChild(retr[ii]);
    }
    oTbody.appendChild(reFrag);

    oTr.i = i;  oTr.j = j;  oTr.k = k;
    var ooTh = mTable.getElementsByTagName('th');
    for (var i = 0; i < ooTh.length; i++) {
        ooTh[i].style.backgroundColor = "#000080";
        ooTh[i].style.backgroundImage = "";
    }
    var ooTr = oTbody.getElementsByTagName('tr');
    for (var i = 0; i < ooTr.length; i++) {
        if (i % 2) ooTr[i].style.backgroundColor = "#FFE4E1";
        else ooTr[i].style.backgroundColor = "white";
    }
    this.style.backgroundColor = "#7FFFD4";
    this.style.backgroundImage = "url(images/ascend.png)";
    this.style.backgroundRepeat = "no-repeat";
    this.style.backgroundPosition = "right";
}
function getcmp(k) {
    return function cmp(tr1, tr2) {
        var val1, val2;
        val1 = tr1.cells[k].firstChild.nodeValue;
        val2 = tr2.cells[k].firstChild.nodeValue;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}
