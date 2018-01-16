// Generated by BUCKLESCRIPT VERSION 2.1.1, PLEASE EDIT WITH CARE
'use strict';

var React               = require("react");
var ReasonReact         = require("reason-react/lib/js/src/ReasonReact.js");
var Utils$ReactTemplate = require("../lib/Utils.bs.js");

var component = ReasonReact.statelessComponent("NotFound");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "not-found"
                }, React.createElement("h1", undefined, Utils$ReactTemplate.str("404")), React.createElement("p", undefined, Utils$ReactTemplate.str("The ants got lost!")));
    });
  return newrecord;
}

exports.component = component;
exports.make      = make;
/* component Not a pure module */
