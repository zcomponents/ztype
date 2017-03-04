#!/usr/bin/env node

'use strict';

/*
 * @then: {
 *   likeAs.keys: { function | value }
 * }
 *
 * */

const _likeAs = require('./likeAs');

const re = [
	/^cid_(.*)$/,
	/^(?:cids?|class(?:es)?|l(?:ike)?|parent|pid|super)$/,
	/^else$/
];

module.exports = function (that, then, options) {
	if (then instanceof Object) {
		const T = _likeAs(that, options);
		for (const t in then) {
			if (re[0].test(t) && T.cid === re[0].exec(t)[1]);
			else if (!re[1].test(t) && T[t] === true);
			else if (re[2].test(t));
			else continue;
			return then[t] instanceof Function ? then[t](that) : then[t];
		}
		throw new Error('likeAsBack uncatched then');
	}
	throw new Error('likeAsBack then an unexpected');
};
