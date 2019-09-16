var utils = require("handlebars-utils");
var fluent = require("@fluent/bundle");
var fs = require("fs");
var err = "{{fluent}} helper: ";

exports.fluent = function (thisArg, locals, options) {
  options = utils.options(thisArg, locals, options);
  var context = utils.context(this, locals, options);

  if (!utils.isString(thisArg)) {
    throw new Error(err+"invalid key. Keys must be formatted as strings.");
  }

  var [key, attr] = thisArg.split('.', 2);

  if (typeof context.lang === "undefined") {
    throw new Error(err+"the 'lang' parameter is not defined.");
  }

  if (typeof context.ftl === "undefined") {
    context.ftl = context.lang + ".ftl";
  }

  var source = fs.readFileSync(context.ftl).toString();
  var bundle = new fluent.FluentBundle([context.lang]);
  var resource = new fluent.FluentResource(source);
  bundle.addResource(resource);

  try {
    var message = bundle.getMessage(key);
    result = utils.isString(attr) ?
      message.attributes[attr] :
      message.value;
    return bundle.formatPattern(result, context);
  } catch (_) {
    throw new Error(err+"translation for '" + key + "' is not available for language '" + context.lang + "'.");
  }
};

module.exports.register = function(Handlebars) {
  Handlebars.registerHelper('fluent', exports.fluent);
};
