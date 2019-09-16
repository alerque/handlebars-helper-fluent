# handlebars-helper-fluent

[![NPM](https://img.shields.io/npm/v/handlebars-helper-fluent)](https://www.npmjs.com/package/handlebars-helper-fluent)
[![Travis CI](https://img.shields.io/travis/com/alerque/handlebars-helper-fluent)](https://travis-ci.com/alerque/handlebars-helper-fluent)

[Fluent][fluent] based i18n helper for [handlebars][handlebars].

# Usage

## From the Command Line

```sh
# Install the Handlebars CLI tool and this plugin
$ npm install hbs-cli handlebars-helper-fluent

# Invoke handlebars to output from a template by specifying this plugin plus data
# about what language and where to find the FTL file
$ hbs -D '{"lang": "en", "ftl": "en.ftl"}' --helper handlebars-helper-fluent -s template.hbs
```

## From Javascript

```js
// Load packages
var Handlebars = require('handlebars');
var Fluent = require('handlebars-helper-fluent');

// Setup data about what language and where to find the FTL file
var context = {
  lang: 'en',
  ftl: 'en.ftl'
};

// Register the helper
Fluent.register(Handlebars);

// Use the way you would normally use Handlebars
var template = Handlebars.compile('Hello {{fluent "world"}}!');
template(context);
```

# API

Requires a `lang` parameter to be set in content.

Optionally uses the `ftl` parameter as a filename to read from, defaults to `$lang.ftl`.

* `{{fluent "index"}}` inline helper, take string as the key to lookup in Fluent. Context data may be adjusted with hash values.

* `{{#fluent "index"}}{{/fluent}}` block helper that can contain instances of `fluentparam`.

* `{{#fluentparam "key"}}value{{/fluentparam}}` block helper that can set data values for use its parent context.

  [fluent]: https://projectfluent.org/
  [handlebars]: https://handlebarsjs.com/
