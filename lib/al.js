#!/usr/bin/env node

'use strict';

const _as = require('./as');

const re = [
	/^cid_(.*)$/,
	/^(?:cids?|class(?:es)?|l(?:ike)?|parent|pid|super)$/,
	/^else$/
];

module.exports = function (that, then) {
  if (then instanceof Object) {
    const T = _as(that);
    for (const t in then) {
			if (re[0].test(t) && T.cid === re[0].exec(t)[1]);
      else if (!re[1].test(t) && T[t] === true);
			else if (re[2].test(t));
      else continue;
      return then[t] instanceof Function ? then[t](that) : then[t];
    }
  }
  throw 'type as unexpected';
};
