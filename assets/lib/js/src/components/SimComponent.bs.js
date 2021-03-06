// Generated by BUCKLESCRIPT VERSION 2.1.1, PLEASE EDIT WITH CARE
'use strict';

var Block                        = require("bs-platform/lib/js/block.js");
var Curry                        = require("bs-platform/lib/js/curry.js");
var React                        = require("react");
var ReasonReact                  = require("reason-react/lib/js/src/ReasonReact.js");
var Http$ReactTemplate           = require("../lib/Http.bs.js");
var Knobs$ReactTemplate          = require("../domain/Knobs.bs.js");
var Utils$ReactTemplate          = require("../lib/Utils.bs.js");
var SimResponse$ReactTemplate    = require("../domain/SimResponse.bs.js");
var KnobsResponse$ReactTemplate  = require("../domain/KnobsResponse.bs.js");
var WorldComponent$ReactTemplate = require("./WorldComponent.bs.js");

function updateWorld(send, json) {
  var world = SimResponse$ReactTemplate.parseWorld(json);
  return Curry._1(send, /* UpdateWorld */Block.__(0, [world]));
}

function updateKnobs(send, json) {
  var knobs = KnobsResponse$ReactTemplate.parse(json);
  return Curry._1(send, /* UpdateKnobs */Block.__(1, [knobs]));
}

function fetchWorld(send, simId) {
  Http$ReactTemplate.json(Http$ReactTemplate.get("/api/sim/" + (String(simId) + ""))).then((function (json) {
          return Promise.resolve(updateWorld(send, json));
        }));
  return /* () */0;
}

function fetchKnobs(send, simId) {
  Http$ReactTemplate.json(Http$ReactTemplate.get("/api/sim/" + (String(simId) + "/knob"))).then((function (response) {
          return Promise.resolve(updateKnobs(send, response));
        }));
  return /* () */0;
}

function doTurn(send, simId) {
  Http$ReactTemplate.post("/api/sim/" + (String(simId) + "/turn")).then((function (response) {
          if (response[/* status */1] === 201) {
            return Promise.resolve(Curry._1(send, /* Finished */5));
          } else {
            return Promise.resolve(updateWorld(send, response[/* json */0]));
          }
        }));
  return /* () */0;
}

function antStatusMessage(state) {
  if (state[/* finished */3]) {
    return "The ants found all the food!";
  } else if (state[/* fetching */2]) {
    return "The ants are marching!";
  } else {
    return "The ants are waiting!";
  }
}

var component = ReasonReact.reducerComponent("Sim");

function make(simId, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      var send = param[/* send */4];
      Curry._1(send, /* FetchWorld */0);
      Curry._1(send, /* FetchKnobs */1);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      var match = state[/* fetching */2];
      return React.createElement("div", {
                  className: "sim"
                }, React.createElement("h1", undefined, Utils$ReactTemplate.str("Sim " + (String(simId) + ""))), React.createElement("h2", undefined, Utils$ReactTemplate.str(antStatusMessage(state))), ReasonReact.element(/* None */0, /* None */0, WorldComponent$ReactTemplate.make(state[/* world */0], state[/* knobs */1], /* array */[])), React.createElement("div", {
                      className: "sim__buttons"
                    }, React.createElement("button", {
                          className: "button",
                          onClick: (function () {
                              return Curry._1(send, /* DoTurn */2);
                            })
                        }, Utils$ReactTemplate.str("Turn")), React.createElement("button", {
                          className: "button",
                          onClick: (function () {
                              return Curry._1(send, /* Pause */4);
                            })
                        }, match !== 0 ? Utils$ReactTemplate.str("Pause") : Utils$ReactTemplate.str("Play")), React.createElement("a", {
                          className: "button",
                          href: "/"
                        }, React.createElement("span", undefined, Utils$ReactTemplate.str("Back")))));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* world : [] */0,
              /* knobs */Knobs$ReactTemplate.$$default,
              /* fetching : false */0,
              /* finished : false */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        switch (action) {
          case 0 : 
              return /* SideEffects */Block.__(2, [(function (param) {
                            return fetchWorld(param[/* send */4], simId);
                          })]);
          case 1 : 
              return /* SideEffects */Block.__(2, [(function (param) {
                            return fetchKnobs(param[/* send */4], simId);
                          })]);
          case 2 : 
              if (state[/* finished */3]) {
                return /* NoUpdate */0;
              } else {
                return /* SideEffects */Block.__(2, [(function (param) {
                              return doTurn(param[/* send */4], simId);
                            })]);
              }
          case 3 : 
              return /* SideEffects */Block.__(2, [(function (param) {
                            if (param[/* state */2][/* fetching */2]) {
                              return Curry._1(param[/* send */4], /* DoTurn */2);
                            } else {
                              return 0;
                            }
                          })]);
          case 4 : 
              return /* Update */Block.__(0, [/* record */[
                          /* world */state[/* world */0],
                          /* knobs */state[/* knobs */1],
                          /* fetching */1 - state[/* fetching */2],
                          /* finished */state[/* finished */3]
                        ]]);
          case 5 : 
              return /* Update */Block.__(0, [/* record */[
                          /* world */state[/* world */0],
                          /* knobs */state[/* knobs */1],
                          /* fetching : false */0,
                          /* finished : true */1
                        ]]);
          
        }
      } else if (action.tag) {
        return /* Update */Block.__(0, [/* record */[
                    /* world */state[/* world */0],
                    /* knobs */action[0],
                    /* fetching */state[/* fetching */2],
                    /* finished */state[/* finished */3]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* world */action[0],
                    /* knobs */state[/* knobs */1],
                    /* fetching */state[/* fetching */2],
                    /* finished */state[/* finished */3]
                  ]]);
      }
    });
  newrecord[/* subscriptions */13] = (function (param) {
      var send = param[/* send */4];
      return /* :: */[
              /* Sub */[
                (function () {
                    return setInterval((function () {
                                  return Curry._1(send, /* DoAutoTurn */3);
                                }), 50);
                  }),
                (function (prim) {
                    clearInterval(prim);
                    return /* () */0;
                  })
              ],
              /* [] */0
            ];
    });
  return newrecord;
}

var str = Utils$ReactTemplate.str;

var turnLength = 50;

exports.str              = str;
exports.turnLength       = turnLength;
exports.updateWorld      = updateWorld;
exports.updateKnobs      = updateKnobs;
exports.fetchWorld       = fetchWorld;
exports.fetchKnobs       = fetchKnobs;
exports.doTurn           = doTurn;
exports.antStatusMessage = antStatusMessage;
exports.component        = component;
exports.make             = make;
/* component Not a pure module */
