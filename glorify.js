// Generated by CoffeeScript 1.6.2
/*
Allows an object to be easily extended.
*/


(function() {
  var GlorifiedInstance, Glorify;

  GlorifiedInstance = (function() {
    function GlorifiedInstance(instance) {
      this.instance = instance;
    }

    GlorifiedInstance.prototype.properties = function(definitions) {
      var descriptor, enumerable, get, property, set;

      for (property in definitions) {
        descriptor = definitions[property];
        get = descriptor.get, set = descriptor.set, enumerable = descriptor.enumerable;
        Object.defineProperty(this.instance, property, {
          get: get,
          set: set
        });
      }
      return this;
    };

    GlorifiedInstance.prototype.readonly = function(definitions) {
      var property, value;

      for (property in definitions) {
        value = definitions[property];
        Object.defineProperty(this.instance, property, {
          value: value
        });
      }
      return this;
    };

    return GlorifiedInstance;

  })();

  /*
  Ease of use function for creating a new glorified instance.
  */


  Glorify = function(instance) {
    return new GlorifiedInstance(instance);
  };

  /*
  Define properties of this class with get and set functions.
  */


  Function.prototype.properties = function(definitions) {
    return Glorify(this.prototype).properties(definitions);
  };

  /*
  Define read-only properties of this class
  */


  Function.prototype.readonly = function(definitions) {
    return Glorify(this.prototype).readonly(definitions);
  };

  module.exports = Glorify;

}).call(this);
