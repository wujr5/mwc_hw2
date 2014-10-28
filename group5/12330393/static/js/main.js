(function() {
  require(['require', './helper/table', './style'], function(require) {
    var allTable, style, table;
    table = require('./helper/table');
    style = require('./style');
    allTable = table.getAllTables();
    style.trStyle();
    table.makeAllTableSortable(allTable);
    style.changeBackIcon();
    return style.resetStyle();
  });

}).call(this);
