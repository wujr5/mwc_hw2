define ['require','./event','./node','./helper'], (require) ->
	event = require('./event') 
	node = require('./node')
	helper = require('./helper')

	_result = {
		###
		* get all the tables in the page
		###
		getAllTables : ->
			allTable = []
			i = 0
			table = document.getElementsByTagName("table")
			for tab in table
				temp = {}
				_tb = []

				child = node.getELementChild(tab)
				if child[0].tagName == "THEAD" and child[child.length - 1].tagName == "TBODY"
					temp.head = child[0].getElementsByTagName("tr")[0]
					temp.body = child[child.length - 1].getElementsByTagName("tr")
					temp.type = 1
				if child[0].tagName == 'TBODY'
					allTr = helper.toArray child[0].getElementsByTagName('tr')
					temp.head = allTr[0]
					temp.body = allTr.slice(1,allTr.length)
					temp.type = 2	
				temp.copy = temp.body
				helper.each helper.toArray(temp.body), (_arg) ->
					_tb.push(_arg.cloneNode(true))
					temp.body = _tb
				allTable.push(temp)
			return allTable

		###
		* Bubble sort for an array consist of "object HTMLCollection". 
		  The "object HTMLCollection" is the collection of all "tr" element nodes in a "table" element node.
		  After sorting, the array will be arranged in an ascending order or an descending order
		* @param _array : an array consist of "object HTMLCollection"
		* @param col    : an number to indicate which column you want to sort
		* @param flag   : an flag to indicate the rule of sort
		* @return       : an array that arrange in an ascending order or an descending order
		###
		sortTr : (_array, col, flag) ->
			for v1,i1 in _array
				for v2, i2 in _array
					_temp1 = node.getNthChild(v1,"td", col).innerHTML 
					_temp2 = node.getNthChild(v2,"td", col).innerHTML
					if flag == "up"
						if _temp2 > _temp1
							[_array[i2],_array[i1]]=[_array[i1],_array[i2]]		
					if flag == "down"
						if _temp2 < _temp1
							[_array[i2],_array[i1]]=[_array[i1],_array[i2]]
			return _array

		###
		* The interface of this script.It bind an event handler for every table's head.that is,if you click the table's head,two things  will be executed,one is sort the table's body,two is replace the table's body
		* @param table : an array consists of objects,and the object contain datas of every table. 
		###
		makeAllTableSortable : (table)->
			for _tab in table
				for _td,index in node.getELementChild(_tab.head)
					_body = _tab.body
					_type = _tab.type
					if _type == 1
						parent = _td.parentNode.parentNode.parentNode
					if _type == 2
						parent = _td.parentNode.parentNode
					((num,body,parent,type) ->
						event.addHandler _td, 'click', ->
							if node.hasClass(@, 'up') then node.removeClass(@, 'up') else node.addClass(@,'up')	
							if node.hasClass(@, 'up')
								a = _result.sortTr(helper.toArray(body), num, 'up')
							else
								a = _result.sortTr(helper.toArray(body), num,'down')
							node.replaceNode(parent, a, type)
					)(index,_body,parent,_type)
	}