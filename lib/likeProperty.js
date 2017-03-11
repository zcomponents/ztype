#!/usr/bin/env node

'use strict';

/*
 * @name: { string | array | regexp | likeAsBack.then }
 * @options: {
 *   ...
 * }
 *
 * */

module.exports = function (that, then, _default) {
	if (!(that instanceof Object));
	else if (then instanceof Array) {
		for (const t of then) {
			if (!(t in that)) continue;
			return that[t];
		}
	}
	else if (then instanceof Object) {
		for (const t in then) {
			if (!(t in that)) continue;
			const T = then[t];
			const TT = that[t];
			if (T instanceof Function){
				const _ = T(that, t);
				if (_ === false) continue;
				else if (_ === true) return TT;
				else return _;
			}
			if (T instanceof Array){
				if (T.indexOf(TT) < 0) continue;
				else return TT;
			}
			if (T instanceof RegExp){
				if (!T.test(TT)) continue;
				else return TT;
			}
			if (T instanceof Object) return TT;
			if (T === TT) return TT;
		}
	}
	return _default instanceof Function ? _default(that) : _default;
};
