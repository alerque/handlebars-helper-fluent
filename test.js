var should = require('should');
var Handlebars = require('handlebars');
var helpers = require('./index');

var context = {
  lang: 'en',
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
    var template = Handlebars.compile('{{fluent "key" lang="tr"}}');
    template(context).should.equal('değeri');
  });

});

describe('errors:', function () {
  var err = "{{fluent}} helper: ";

  it('should throw an error when an invalid key is passed:', function () {
    (function() {
      Handlebars.compile('{{fluent foo}}')();
    }).should.throw(err+"invalid key. Keys must be formatted as strings.");
  });

  it('should throw an error when no language is undefined.', function () {
    (function() {
      Handlebars.compile('{{fluent "key"}}')({});
    }).should.throw(err+"the 'lang' parameter is not defined.");
  });

  it('should throw an error when the given property is missing.', function () {
    (function() {
      Handlebars.compile('{{{fluent "word" lang="tr"}}}')({lang: 'tr'});
    }).should.throw(err+"translation for 'word' is not available for language 'tr'.");
  });

});
