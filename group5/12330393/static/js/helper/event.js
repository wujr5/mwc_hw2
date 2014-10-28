/*
* A module to Compatible with the event handler
*/


(function() {
  define(function() {
    return {
      addHandler: function(element, type, handler) {
        if (element.attachEvent) {
          element.attachEvent("on" + type, handler);
        }
        if (element.addEventListener) {
          return element.addEventListener(type, handler, false);
        } else {
          return element["on" + type] = handler;
        }
      },
      removeHandler: function(element, type, handler) {
        if (element.detachEvent) {
          element.detachEvent("on" + type, handler);
        }
        if (element.removeEventListener) {
          return element.removeEventListener(type, handler, false);
        } else {
          return element["on" + type] = null;
        }
      }
    };
  });

}).call(this);
