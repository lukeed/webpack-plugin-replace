# webpack-plugin-replace [![Build Status](https://travis-ci.org/lukeed/webpack-plugin-replace.svg?branch=master)](https://travis-ci.org/lukeed/webpack-plugin-replace)

> Replace content while bundling.


## Install

```
$ npm install --save-dev webpack-plugin-replace
```


## Usage

```js
// webpack.config.js
const ReplacePlugin = require('webpack-plugin-replace');

module.exports = {
  // ...
  plugins: [
    new ReplacePlugin({
      exclude: [
        'foo.js',
        /node_modules/,
        filepath => filepath.includes('ignore')
      ],
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'FOO_BAR': '"hello world"',
        'DEV_MODE': false,
      }
    })
  ]
};
```


## API

### webpack-plugin-replace(options)

#### options.exclude

Type: `Array|String|Function|RegExp`<br>
Default: `false`

If multiple conditions are provided, matching _any_ condition will exclude the filepath, which prevents any alterations.

> **Note:** By default, nothing is excluded!

#### options.include

Type: `Array|String|Function|RegExp`<br>
Default: `true`

If multiple conditions are provided, matching _any_ condition will include & scan the filepath for eligible replacements.

> **Note:** By default, all filepaths are included!

#### options.values

Type: `Object`<br>
Default: `{}`

An object whose keys are `strings` that should be replaced and whose values are `strings` the replacements.

If desired, you may forgo the `values` key & declare your `key:value` pairs directly to the main configuration. For example:

```js
{
  exclude: /node_modules/,
  values: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
}

// is the same as:

{
  exclude: /node_modules/,
  'process.env.NODE_ENV': JSON.stringify('production'),
}
```


## License

MIT © [Luke Edwards](https://lukeed.com)
