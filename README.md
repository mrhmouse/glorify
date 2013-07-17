Glorify.js: Glorify your classes!
=================================

Glorify.js allows you to quickly and easily define properties
on your objects or within your constructor functions.

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
