var should = require('should');
var Handlebars = require('handlebars');
var helpers = require('./index');

var context = {
  language: 'en',
  name: "Mocha"
};

Handlebars.registerHelper("fluent", helpers.fluent);

describe('fluent helper', function () {
  it('should take a key and return for the default language', function () {
    var template = Handlebars.compile('{{fluent "key"}}');
    template(context).should.eql('value');
  });

  it('should take a key with an attribute and return', function () {
    var template = Handlebars.compile('{{fluent "key.attr"}}');
    template(context).should.eql('property');
  });

  it('should take a key that uses context data and return', function () {
    var template = Handlebars.compile('{{fluent "hello"}}');
    template(context).should.eql('Hello ⁨Mocha⁩!');
  });

  it('should take a key that uses context data and and override value and return', function () {
    var template = Handlebars.compile('{{fluent "hello" name="World"}}');
    template(context).should.eql('Hello ⁨World⁩!');
  });

  it('should take a key and return for the override language', function () {
    var template = Handlebars.compile('{{fluent "key" language="tr"}}');
    template(context).should.equal('değeri');
  });
});

describe('errors:', function () {
  it('should throw an error when an invalid key is passed:', function () {
    var template = Handlebars.compile('{{fluent foo}}');
    try {
      template();
    } catch(err) {
      err.should.equal("{{fluent}} helper: invalid key. Keys must be formatted as strings.");
    }
  });

  it('should throw an error when no language is undefined.', function () {
    var template = Handlebars.compile('{{fluent "key"}}');
    try {
      template({});
    } catch(err) {
      err.should.equal("{{fluent}} helper: the 'language' parameter is not defined.");
    }
  });

  it('should throw an error when the given property is missing.', function () {
    var template = Handlebars.compile('{{fluent "word" language="tr"}}');
    try {
      template({language: 'en'});
    } catch(err) {
      err.should.equal("{{fluent}} helper: translation for 'word' is not available for language 'tr'.");
    }
  });
});
