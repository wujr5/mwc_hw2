(function() {
  define(function() {
    return {
      /*
      		* convert an object to array
      		* @param _object: an array to be converted
      		* @return       : an array
      */

      toArray: function(_object) {
        return Array.prototype.slice.call(_object);
      },
      /*
      		* traverse an array
      		* @param _array: an array to be traversed
      		* @param _callback: a function to be call when traversing the array
      */

      each: function(_array, _callback) {
        var length, _results;
        length = _array.length;
        _results = [];
        while (length) {
          length -= 1;
          _results.push(_callback.call(this, _array[length], length));
        }
        return _results;
      }
    };
  });

}).call(this);
