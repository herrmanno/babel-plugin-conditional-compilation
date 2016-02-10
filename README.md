# babel-plugin-conditional-compilation

c/c++ style conditional compilation

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-conditional-compilation
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["conditional-compilation"]
}
```

### Via CLI

```sh
$ babel --plugins conditional-compilation script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["conditional-compilation"]
});
```
