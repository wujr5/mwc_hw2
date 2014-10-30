(function() {
  define(['require', './event', './node', './helper'], function(require) {
    var event, helper, node, _result;
    event = require('./event');
    node = require('./node');
    helper = require('./helper');
    return _result = {
      /*
      		* get all the tables in the page
      */

      getAllTables: function() {
        var allTable, allTr, i, tab, table, tableBody, tableHead, temp, _i, _len, _tb;
        allTable = [];
        i = 0;
        table = document.getElementsByTagName("table");
        for (_i = 0, _len = table.length; _i < _len; _i++) {
          tab = table[_i];
          temp = {};
          _tb = [];
          tableHead = node.getNthChild(tab, 'thead');
          tableBody = node.getNthChild(tab, 'tbody');
          if (tableHead.length > 0) {
            temp.head = tableHead[0].getElementsByTagName("tr")[0];
            temp.body = tableBody[0].getElementsByTagName("tr");
            temp.type = 1;
          }
          if (tableHead.length === 0) {
            allTr = helper.toArray(tableBody[0].getElementsByTagName("tr"));
            temp.head = allTr[0];
            temp.body = allTr.slice(1, allTr.length);
            temp.type = 2;
          }
          temp.copy = temp.body;
          helper.each(helper.toArray(temp.body), function(_arg) {
            _tb.push(_arg.cloneNode(true));
            return temp.body = _tb;
          });
          allTable.push(temp);
        }
        return allTable;
      },
      /*
      		* Bubble sort for an array consist of "object HTMLCollection". 
      		  The "object HTMLCollection" is the collection of all "tr" element nodes in a "table" element node.
      		  After sorting, the array will be arranged in an ascending order or an descending order
      		* @param _array : an array consist of "object HTMLCollection"
      		* @param col    : an number to indicate which column you want to sort
      		* @param flag   : an flag to indicate the rule of sort
      		* @return       : an array that arrange in an ascending order or an descending order
      */

      getFirstNotEmptyTd: function(array, col) {
        var arr, index, one, td, tdCol, _i, _j, _len, _len1;
        one = 0;
        tdCol = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          arr = array[_i];
          tdCol.push(node.getNthChild(arr, 'td', col));
        }
        for (index = _j = 0, _len1 = tdCol.length; _j < _len1; index = ++_j) {
          td = tdCol[index];
          if (td.innerText !== "") {
            one = index;
          }
        }
        return tdCol[one];
      },
      sortTr: function(_array, col, flag) {
        var i1, i2, result, stringType, t1, t2, testCol, v1, v2, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _temp1, _temp2;
        testCol = _result.getFirstNotEmptyTd(_array, col);
        stringType = helper.checkType(testCol.innerText);
        result = [];
        for (i1 = _i = 0, _len = _array.length; _i < _len; i1 = ++_i) {
          v1 = _array[i1];
          for (i2 = _j = 0, _len1 = _array.length; _j < _len1; i2 = ++_j) {
            v2 = _array[i2];
            _temp1 = node.getNthChild(v1, "td", col).innerText;
            _temp2 = node.getNthChild(v2, "td", col).innerText;
            if (stringType === 'float') {
              t2 = _temp2 !== '' ? parseFloat(_temp2) : 0.00;
              t1 = _temp1 !== '' ? parseFloat(_temp1) : 0.00;
              if (t2 > t1) {
                _ref = [_array[i1], _array[i2]], _array[i2] = _ref[0], _array[i1] = _ref[1];
              }
            }
            if (stringType === 'integer') {
              t2 = _temp2 !== '' ? parseInt(_temp2) : 0;
              t1 = _temp1 !== '' ? parseInt(_temp1) : 0;
              if (t2 > t1) {
                _ref1 = [_array[i1], _array[i2]], _array[i2] = _ref1[0], _array[i1] = _ref1[1];
              }
            }
            if (stringType === 'hasChinese') {
              if (_temp2.localeCompare(_temp1) > 0) {
                _ref2 = [_array[i1], _array[i2]], _array[i2] = _ref2[0], _array[i1] = _ref2[1];
              }
            }
            if (stringType === "notChinese") {
              if (_temp2 > _temp1) {
                _ref3 = [_array[i1], _array[i2]], _array[i2] = _ref3[0], _array[i1] = _ref3[1];
              }
            }
          }
        }
        if (flag === 'up') {
          result = _array;
        }
        if (flag === 'down') {
          result = _array.reverse();
        }
        return result;
      },
      /*
      		* The interface of this script.It bind an event handler for every table's head.that is,if you click the table's head,two things  will be executed,one is sort the table's body,two is replace the table's body
      		* @param table : an array consists of objects,and the object contain datas of every table.
      */

      makeAllTableSortable: function(table) {
        var index, parent, _body, _i, _len, _results, _tab, _td, _type;
        _results = [];
        for (_i = 0, _len = table.length; _i < _len; _i++) {
          _tab = table[_i];
          _results.push((function() {
            var _j, _len1, _ref, _results1;
            _ref = node.getELementChild(_tab.head);
            _results1 = [];
            for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
              _td = _ref[index];
              _body = _tab.body;
              _type = _tab.type;
              if (_type === 1) {
                parent = _td.parentNode.parentNode.parentNode;
              }
              if (_type === 2) {
                parent = _td.parentNode.parentNode;
              }
              _results1.push((function(num, body, parent, type) {
                return event.addHandler(_td, 'click', function() {
                  var a;
                  if (node.hasClass(this, 'up')) {
                    node.removeClass(this, 'up');
                  } else {
                    node.addClass(this, 'up');
                  }
                  if (node.hasClass(this, 'up')) {
                    a = _result.sortTr(helper.toArray(body), num, 'up');
                  } else {
                    a = _result.sortTr(helper.toArray(body), num, 'down');
                  }
                  return node.replaceNode(parent, a, type);
                });
              })(index, _body, parent, _type));
            }
            return _results1;
          })());
        }
        return _results;
      }
    };
  });

}).call(this);
