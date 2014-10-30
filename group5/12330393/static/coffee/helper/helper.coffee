define ->
	{
		###
		* convert an object to array
		* @param _object: an array to be converted
		* @return       : an array
		###
		toArray : (_object)->
			Array.prototype.slice.call(_object)

		###
		* traverse an array
		* @param _array: an array to be traversed
		* @param _callback: a function to be call when traversing the array
		###
		each : (_array, _callback) ->
			length = _array.length
			while length
				length -= 1
				_callback.call(this,_array[length], length)
	}
