Glorify your classes!
=================================

Glorify allows you to quickly and easily define properties
on your objects or within your constructor functions using getters,
setters, and other descriptors.

Example in CoffeeScript and NodeJS:

```coffeescript
  Glorify = require 'glorify'
  
  # Generic database for example purposes.
  Database = require 'some-database'
  
  class Foo
    @properties
      name:
        get: -> Database.getProperty @, 'name'
        set: ( value ) -> Database.setProperty @, 'name', value
        
      age:
        get: -> Database.getProperty @, 'age'
        set: ( value ) -> Database.setProperty @, 'name', value
        enumerable: yes
        
    @readonly
      type: 'Foobar'
      
    constructor: ( @name, @age ) ->
      # Example of a read-only property at
      # construction time.
      createdOn = Date.now()
      
      # You can use the static Glorify method to chain
      # 'properties' or 'readonly' calls in any order
      Glorify( @ )
      .readonly
        createdOn: createdOn
      .properties
        upperCase:
          get: -> @name.toUpperCase()
```

Usage
=====

Glorify can be used either directly on a constructor function or as a static call on an arbitrary object.

_Note: All examples below are in CoffeeScript._

On a constructor function
-------------------------

```coffeescript
Glorify = require 'glorify'

class Foo
  @properties
    name:
      get: -> getNameFor @
      set: ( value ) -> setNameFor @, value
      
    age:
      get: -> getAgeFor @
      set: ( value ) -> setAgeFor @, value
      
    guid:
      get: -> getGuidFor @
      
    enumerableProperty:
      get: -> getEnumerablePropertyFor @
      set: ( value ) -> setEnumerablePropertyFor @, value
      enumerable: yes
      
  @readonly
    version: '0.0.1'
```

As a static call
----------------

```coffeescript
Glorify = require 'glorify'

foo = do ->
  foo = {}
  name = 'Blah'
  createdOn = Date.now()
  
  Glorify( @ )
  .properties
    name:
      get: -> name
      set: ( value ) -> name = value
    uppercase:
      get: -> name.toUpperCase()
  .readonly
    createdOn: createdOn

  foo
```

Creating your own descriptors
-----------------------------

```coffeescript
Glorify = require 'glorify'

# For demonstration purposes, this is our database
DATABASE = {}

Glorify.add
  database: ( property ) ->
    entry = ( item ) -> DATABASE[item.guid]
    enumerable: yes
    get: -> entry( @ )[property]
    set: ( value ) -> entry( @ )[property] = value
  
class Person
  constructor: ( name, age ) ->
    # Set up a fake GUID (just using a timestamp)
    guid = Date.now()
    DATABASE[guid] = {}
    
    # Glorify our person
    Glorify( @ )
    .readonly
      guid: guid
    .database
      name: name
      age: age
      
bob = new Person 'Bob', 32
```

Reference
=========

Glorify.add( descriptors )
-----------

* `descriptors`: For each key in `descriptors`, a function is added to the Glorify prototype, allowing it to be
  used in subsequent `Glorify` calls. This function is passed one argument, the name of the property being accessed
  through a `get` or `set` call, and is expected to return a valid descriptor. Documentation on valid descriptors
  may be found at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

The functions below have the same signature whether they are used on a constructor function or as a static call.

properties( definitions )
--------------------------

* `definitions`: An object whose keys become the property names and whose values are used as descriptors.
  Only `get`, `set`, and `enumerable` descriptors are used.

readonly( definitions )
-----------------------

* `definitions`: An object whose keys become the property names and whose values are used as the static values
  for read-only properties added to the instance.
