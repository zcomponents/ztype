#!/usr/bin/env node

'use strict';

const ztas = require('./as');

const re = [
	/^else$/,
	/^(?:cids?|class(?:es)?|l(?:ike)?|parent|pid|super)$/,
	/^cid_(.*)$/i
];

const al = function (that, then) {
	if (ztas(then).o) {
		const asthat = ztas(that);
		for (const t in then) {
			if (re[0].test(t)) {
				return ztas(then[t]).f ? then[t](that) : then[t];
			}
			else if (!re[1].test(t) && asthat[t] === true) {
				return ztas(then[t]).f ? then[t](that) : then[t];
			}
			else if (re[2].test(t) && re[2].exec(t)[1] === asthat.cid) {
				return ztas(then[t]).f ? then[t](that) : then[t];
			}
		}
	}
	throw 'type as unexpected';
};

module.exports = al;

//module.exports.al = al;
