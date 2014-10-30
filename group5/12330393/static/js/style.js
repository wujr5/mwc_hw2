(function() {
  define(['require', './helper/event', './helper/node', './helper/table'], function(require) {
    var event, node, table, _result;
    event = require('./helper/event');
    node = require('./helper/node');
    table = require('./helper/table');
    return _result = {
      /*
      		* when click the table header, the header will changge its style
      */

      changeBackIcon: function() {
        var allTh, th, _i, _len, _results;
        allTh = document.getElementsByTagName("th");
        _results = [];
        for (_i = 0, _len = allTh.length; _i < _len; _i++) {
          th = allTh[_i];
          _results.push(event.addHandler(th, 'click', function() {
            var sib, siblings, _j, _len1;
            siblings = node.getSiblingNode(this);
            for (_j = 0, _len1 = siblings.length; _j < _len1; _j++) {
              sib = siblings[_j];
              node.removeClass(sib, 'up');
              node.removeClass(sib, 'ascend');
              node.removeClass(sib, 'descend');
            }
            if (node.hasClass(this, 'up')) {
              node.removeClass(this, 'descend');
              return node.addClass(this, 'ascend');
            } else {
              node.removeClass(this, 'ascend');
              return node.addClass(this, 'descend');
            }
          }));
        }
        return _results;
      },
      getTable: table.getAllTables(),
      resetStyle: function() {
        var allTable, tr, _i, _len, _results;
        allTable = _result.getTable;
        _results = [];
        for (_i = 0, _len = allTable.length; _i < _len; _i++) {
          table = allTable[_i];
          _results.push((function() {
            var _j, _len1, _ref, _results1;
            _ref = node.getELementChild(table.head);
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              tr = _ref[_j];
              _results1.push(event.addHandler(tr, 'click', function() {
                return _result.trStyle();
              }));
            }
            return _results1;
          })());
        }
        return _results;
      },
      trStyle: function() {
        var allTable, index, tbody, tr, _i, _len, _results;
        allTable = _result.getTable;
        _results = [];
        for (_i = 0, _len = allTable.length; _i < _len; _i++) {
          table = allTable[_i];
          tbody = table.copy;
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (index = _j = 0, _len1 = tbody.length; _j < _len1; index = ++_j) {
              tr = tbody[index];
              tr.style.backgroundColor = "#fff";
              if (index % 2 !== 0) {
                _results1.push(tr.style.backgroundColor = "#B7C2C4");
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        }
        return _results;
      }
    };
  });

}).call(this);
