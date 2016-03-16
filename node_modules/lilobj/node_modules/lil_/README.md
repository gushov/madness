# lil_

A li'l utility library

## Description

lil_ is where I keep all the utility functions that I use in my other li'l modules.

## Browser usage

load dist/lil_.js or dist/lil_.min.js in you browser and call it like this:

```javascript
(function () {

  var _ = require('lil_');

  //returns "null"
  _.typeOf(null);

}());
```

## Node usage

Install via npm: `npm install lil_`

```javascript
var _ = require('lil_');

//returns "null"
_.typeOf(null); 
```

## Documentation

### typeOf(thing)

Returns name of thing corresponding with typeof operator except nulls return "null" arrays return "array".

### each(thing, iterator, context)

Calls iterator function with each element or property of thing.

### every(thing, iterator, context)

If iterator returns true for each element or property value of thing function returns true otherwise iteration stops and function returns false.

### some(thing iterator, context)

If iterator returns false for element or property value of thing function returns false otherwise iteration stops and function returns true.

### map(thing, mapper, context)

Returns new array or object populated with elements or properties returned by mapper for each element or property in thing.

### withOut(array, value)

Returns copy of array with all elements equal to value removed. 

### walk(target, src, iterator)

walks src object graph and call iterator with src value, object value, proptery name and target parent object

### extend(target, src, [src...])

copy properties of src to target.

### defaults(target, src)

Copy src properties to target if not already present in target.

### match(object, test)

Returns true if test properties are "===" to object properties.

### pick(target, keys)

Returns copy of target with only properties present in keys.

## License
Copyright (c) 2012 August Hovland
Licensed under the MIT license.
