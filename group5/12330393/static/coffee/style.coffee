

define ['require','./helper/event','./helper/node','./helper/table'], (require) ->
	event = require('./helper/event')
	node = require('./helper/node')
	table = require('./helper/table')

	_result = {
		###
		* when click the table header, the header will changge its style 
		###
		changeBackIcon : ->
			allTh = document.getElementsByTagName("th")
			for th in allTh
				event.addHandler th, 'click', ->
					siblings = node.getSiblingNode(@)
					for sib in siblings
						node.removeClass(sib, 'up')
						node.removeClass(sib, 'ascend')
						node.removeClass(sib, 'descend')
					if node.hasClass(@, 'up')
						node.removeClass(@, 'descend')
						node.addClass(@, 'ascend')
					else
						node.removeClass(@, 'ascend')
						node.addClass(@, 'descend')

		getTable: table.getAllTables()

		resetStyle: ->
			allTable = _result.getTable
			for table in allTable
				for tr in node.getELementChild(table.head)
					event.addHandler tr, 'click', ->
						_result.trStyle()

		trStyle: ->
			allTable = _result.getTable
			for table in allTable
				tbody = table.copy
				for tr, index in tbody
					tr.style.backgroundColor = "#fff"
					if index % 2 != 0
						tr.style.backgroundColor = "#B7C2C4"
	}

		