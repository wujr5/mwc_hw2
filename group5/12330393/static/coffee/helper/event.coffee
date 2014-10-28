###
* A module to Compatible with the event handler 
###

define ->
	{
		addHandler: (element, type, handler)->
			if element.attachEvent
				element.attachEvent("on" + type,handler)
			if element.addEventListener
				element.addEventListener(type,handler,false)
			else
				element["on" + type] = handler
		removeHandler: (element, type,handler) ->
			if element.detachEvent
				element.detachEvent("on" + type,handler)
			if element.removeEventListener
				element.removeEventListener(type,handler,false)
			else
				element["on" + type] = null
	}
