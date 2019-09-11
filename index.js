var fluent = require("@fluent/bundle");
var fs = require("fs");

exports.fluent = function (key, options) {
  options = options || {};
  options.hash = options.hash || {};

  var language, ftl, result;

  if (typeof key !== "string") {
    throw "{{fluent}} helper: invalid key. Keys must be formatted as strings.";
  }

  if (typeof options.hash.language === "string") {
    language = options.hash.language;
  } else {
    language = this.language;
  }

  if (typeof language === "undefined") {
    throw "{{fluent}} helper: the 'language' parameter is not defined.";
  }

  if (typeof options.hash.ftl === "string") {
    ftl = options.hash.ftl;
  } else {
    ftl = this.ftl;
  }

  if (typeof ftl === "undefined") {
    ftl = language + ".ftl";
  }

  var source = fs.readFileSync(ftl).toString();
  var bundle = new fluent.FluentBundle([language]);
  var resource = new fluent.FluentResource(source);
  bundle.addResource(resource);

  try {
    result = bundle.getMessage(key);
    return result.value;
  } catch (err) {
    throw "{{fluent}} helper: translation for '" + key + "' is not available for language '" + language + "'.";
  }
};
