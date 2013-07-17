###
Allows an object to be easily extended.
###
class GlorifiedInstance
  constructor: ( @instance ) ->

  properties: ( definitions ) ->
    for property, descriptor of definitions
      { get, set, enumerable } = descriptor
      Object.defineProperty @instance::, property, { get, set }
    @

  readonly: ( definitions ) ->
    for property, value of definitions
      Object.defineProperty @instance::, property, value: value
    @

###
Ease of use function for creating a new glorified instance.
###
Glorify = ( instance ) ->
  new GlorifiedInstance instance

###
Define properties of this class with get and set functions.
###
Function::properties = ( definitions ) ->
  Glorify( @ ).properties definitions

###
Define read-only properties of this class
###
Function::readonly = ( definitions ) ->
  Glorify( @ ).readonly definitions

module.exports = Glorify
