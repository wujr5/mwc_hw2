(function() {
  define(function() {
    var _result;
    return _result = {
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
      },
      checkType: function(str) {
        var check, index, num, type, _check, _i, _len;
        check = [];
        num = 3;
        type = ['float', 'integer', 'hasChinese', "notChinese"];
        check.push(/^\d+(\.\d+)?$/);
        check.push(/^[0-9]*[1-9][0-9]*$/);
        check.push(/.*[\u4e00-\u9fa5]+.*$/);
        for (index = _i = 0, _len = check.length; _i < _len; index = ++_i) {
          _check = check[index];
          if (_check.test(str)) {
            num = index;
          }
        }
        return type[num];
      }
    };
  });

}).call(this);
