// Generated by CoffeeScript 1.6.2
(function() {
  var GlorifiedInstance, Glorify,
    __hasProp = {}.hasOwnProperty;

  GlorifiedInstance = (function() {
    function GlorifiedInstance(instance) {
      this.instance = instance;
    }

    GlorifiedInstance.prototype.properties = function(definitions) {
      var descriptor, enumerable, get, property, set;

      for (property in definitions) {
        if (!__hasProp.call(definitions, property)) continue;
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
        if (!__hasProp.call(definitions, property)) continue;
        value = definitions[property];
        Object.defineProperty(this.instance, property, {
          value: value
        });
      }
      return this;
    };

    return GlorifiedInstance;

  })();

  Glorify = function(instance) {
    return new GlorifiedInstance(instance);
  };

  Function.prototype.properties = function(definitions) {
    return Glorify(this.prototype).properties(definitions);
  };

  Function.prototype.readonly = function(definitions) {
    return Glorify(this.prototype).readonly(definitions);
  };

  module.exports = Glorify;

}).call(this);
