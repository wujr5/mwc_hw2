require ['require','./helper/table','./style'], (require) ->
	table = require('./helper/table')
	style = require('./style')

	allTable = table.getAllTables()
	style.trStyle()
	table.makeAllTableSortable(allTable)
	style.changeBackIcon()
	style.resetStyle()