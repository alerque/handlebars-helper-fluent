var fluent = require("@fluent/bundle");
var fs = require("fs");
var err = "{{fluent}} helper: ";

exports.fluent = function (key, options) {
  var language = this.language, ftl = this.ftl, result, context = this;

  if (typeof key !== "string") {
    throw new Error(err+"invalid key. Keys must be formatted as strings.");
  }

  var [key, attr] = key.split('.', 2);

  if (typeof options.hash.language === "string") {
    language = options.hash.language;
    delete options.hash.language;
  }

  if (typeof language === "undefined") {
    throw new Error(err+"the 'language' parameter is not defined.");
  }

  if (typeof options.hash.ftl === "string") {
    ftl = options.hash.ftl;
    delete options.hash.ftl;
  }

  if (typeof ftl === "undefined") {
    ftl = language + ".ftl";
  }

  Object.keys(options.hash).forEach(function(k) { context[k] = options.hash[k]; });

  var source = fs.readFileSync(ftl).toString();
  var bundle = new fluent.FluentBundle([language]);
  var resource = new fluent.FluentResource(source);
  bundle.addResource(resource);

  try {
    var message = bundle.getMessage(key);
    if (typeof attr === "string") {
      result = message.attributes[attr];
    } else {
      result = message.value;
    }
    return bundle.formatPattern(result, context);
  } catch (_) {
    throw new Error(err+"translation for '" + key + "' is not available for language '" + language + "'.");
  }
};

module.exports.register = function(Handlebars) {
  Handlebars.registerHelper('fluent', exports.fluent);
};
