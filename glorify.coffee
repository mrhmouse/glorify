# Allows an object to be easily extended.
class GlorifiedInstance
  constructor: ( @instance ) ->

  # Define properties of this instance with get and set functions.
  properties: ( definitions ) ->
    for own property, descriptor of definitions
      { get, set, enumerable } = descriptor
      Object.defineProperty @instance, property, { get, set }
    @

  # Define read-only properties of this class
  readonly: ( definitions ) ->
    for own property, value of definitions
      Object.defineProperty @instance, property, value: value
    @

  # Easily add common property patterns
  @add: ( descriptors ) ->
    for own name, setup of descriptors
      GlorifiedInstance::[name] = ( definitions ) ->
        for own property, value of definitions
          descriptor = setup property
          Object.defineProperty @instance,
            property,
            descriptor
          @instance[property] = value
        @

# Ease of use function for creating a new glorified instance.
Glorify = ( instance ) ->
  new GlorifiedInstance instance

Glorify.add = ( descriptors ) ->
  GlorifiedInstance.add descriptors

# Export these to the Function prototype
Function::properties = ( definitions ) ->
  Glorify( @:: ).properties definitions

Function::readonly = ( definitions ) ->
  Glorify( @:: ).readonly definitions

module.exports = Glorify
