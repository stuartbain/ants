// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Json_decode = require("@glennsl/bs-json/lib/js/src/Json_decode.js");

function sim(json) {
  return /* record */[/* simId */Json_decode.field("sim_id", Json_decode.$$int, json)];
}

function parse(json) {
  return /* record */[/* data */Json_decode.field("data", sim, json)][/* data */0];
}

exports.sim   = sim;
exports.parse = parse;
/* No side effect */
