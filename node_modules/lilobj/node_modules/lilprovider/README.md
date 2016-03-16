# lilprovider

A li'l provide/require shim to share modules in the browser.

## Description

lilprovider adds provide and require methods to the current context.

## Basic usage

create and provide your module:

```javascript
(function () {

  var blender = {
    blend: function () {}
  }

  provide('blender', blender);

}());
```
or wrap your node module

```javascript
define('blender', function (require, module, exports) {

  module.exports = {
    blend: function () {}
  };

});
```

then somewhere else require and use your module:

```javascript
(function () {
  
  var blender = require('blender');
  blender.blend();

}());
```

## License
Copyright (c) 2013 August Hovland
Licensed under the MIT license.
