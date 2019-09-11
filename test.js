var should = require('should');
var Handlebars = require('handlebars');
var helpers = require('./index');

var context = {
  language: 'en'
};

Handlebars.registerHelper("fluent", helpers.fluent);

describe('fluent helper', function () {
  it('should take a key and return for the default language', function () {
    var template = Handlebars.compile('{{fluent "key"}}');
    template(context).should.eql('value');
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
      template({en: {key: 'value'}, fr: {key: 'valeur'} });
    } catch(err) {
      err.should.equal("{{fluent}} helper: the 'language' parameter is not defined.");
    }
  });

  it('should throw an error when the given property is missing.', function () {
    var template = Handlebars.compile('{{fluent "word" language="tr"}}');
    try {
      template({language: 'en', en: {word: 'value'}, fr: {}});
    } catch(err) {
      err.should.equal("{{fluent}} helper: translation for 'word' is not available for language 'tr'.");
    }
  });
});
