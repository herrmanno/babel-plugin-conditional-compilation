[![Build Status](https://travis-ci.org/herrmanno/babel-plugin-conditional-compilation.svg?branch=master)](https://travis-ci.org/herrmanno/babel-plugin-conditional-compilation)

# babel-plugin-conditional-compilation

c/c++ style conditional compilation

## Example

**In**

.babelrc
```json
"plugins": [
    ["conditional-compilation", {
        "DEBUG": 2
    }]
]
```

somfile.js
```js
let DEBUG;
"#if DEBUG > 1";
DEBUG = 1;
"#endif";
```

**Out**

somfile.js
```js
let DEBUG;

DEBUG = 1;
```

For *complete* examples look at [test directory](test/fixtures).

## Installation

```sh
$ npm install babel-plugin-conditional-compilation
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```javascript
{
  "plugins": ["conditional-compilation", {/* compile-time constants */}]
}
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["conditional-compilation", {/* compile-time constants*/}]
});
```
