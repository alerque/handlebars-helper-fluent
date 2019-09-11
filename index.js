var fluent = require("@fluent/bundle");
var fs = require("fs");

exports.fluent = function (key, options) {
  options = options || {};
  options.hash = options.hash || {};

  var language;

  if (typeof key !== "string") {
    throw "{{fluent}} helper: invalid key. Object keys must be formatted as strings.";
  }

  if (typeof options.hash.language === "string") {
    language = options.hash.language;
  } else {
    language = this.language;
  }

  if (typeof language === "undefined") {
    throw "{{fluent}} helper: the 'language' parameter is not defined.";
  }

  if (typeof this[language] === "undefined") {
    throw "{{fluent}} helper: context object not defined for language '" + language + "'.";
  }

  if (typeof this[language][key] === "undefined") {
    throw "{{fluent}} helper: property '" + key + "' is not defined for language '" + language + "'.";
  }

  return this[language][key];
};
