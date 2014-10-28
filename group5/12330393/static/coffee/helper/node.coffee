define ->
	_result = {
		###
		* get the element children node for a given node
		* @param node : a node to be dealed with
		* @return     : an array consists of the element children node of the given node
		###
		getELementChild : (node) ->
			childNode = []
			for child in node.childNodes
				if child.nodeType == 1
					childNode.push child
			return childNode
		###
		* If there are three params passed to this function,the result will be the nth element node for given type .
		* If there are two params passed to this function and the second param is a string of tagname, 
		  the result will be an array consists of the element children node in type of the second param
		* If there two params passed to this function and the second param is a number,
		  the result will be the nth element children node of the given node
		* @param parent : a node to be dealed with
		* @param ele    : a string of tagname
		* @param num    : a number to indicate the nth element children node you want

		* get the nth element node of the given node
		###
		getNthChild : (parent, ele, num)->
			_ele = null
			child = _result.getELementChild(parent)
			if arguments.length == 2
				if typeof arguments[1] == "string"
					_ele = Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]))
				if typeof arguments[1] == "number"
					_ele = child[arguments[1]]
			if arguments.length == 3
				_ele = Array.prototype.slice.call(parent.getElementsByTagName(ele))[num]

			return _ele

		getSiblingNode : (node) ->
			siblings = []
			parentNode = node.parentNode
			allSibling = _result.getELementChild(parentNode)
			for sibling in allSibling
				if sibling != node
					siblings.push(sibling)
			return siblings
		
		###
		* a function to check if a node has specific class
		* @param ele : the node to be dealed with
		* @param cla : a string of className
		###
		hasClass : (ele, cls) ->
			reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
			className = if ele.getAttribute("class") then ele.className else ""
			return reg.test(className)

		###
		* a function to add a class to the given node
		* @param ele : the node to be added
		* @param cla : a string of className 
		###
		addClass : (ele, cls) ->
			if not _result.hasClass(ele, cls)
				ele.className += ' ' + cls

		###
		* a function to remove a class of the given node
		* @param ele : a node to be dealed with
		* @patam cls : a string of className 
		###
		removeClass : (ele,cls) ->
			if _result.hasClass(ele, cls)
				reg = new RegExp('(\\s|^)'+cls+'(\\s|$)')
				ele.className = ele.className.replace(reg,' ')

		###
		* empty the body of table and replace with an array consist of new table body
		* @param oldParentNode : the root node of table
		* @param newNode : an array consist of a new table body
		* @param type    : a flag to indicate the type of table,which means if the value of type is 1,the table has "THEAD" child node,and if the value of type is 2, the table has no "THEAD" child node.
		###
		replaceNode : (oldParentNode, newNode, type)->
			allTr = []
			if type == 1
				tbody = oldParentNode.getElementsByTagName('tbody')[0]
				allTr = _result.getELementChild(tbody)
			if type == 2
				tbody = oldParentNode
				temp = _result.getNthChild(oldParentNode, 'tr')
				allTr = temp.slice(1,temp.length)
			for tr in allTr
				tbody.removeChild(tr)
			for node in newNode
				tbody.appendChild(node)

	}

