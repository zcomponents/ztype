#!/usr/bin/env node

'use strict';

/*
 * @name: { string | array | regexp | likeAsBack.then }
 * @options: {
 *   ...
 * }
 *
 * */

module.exports = function (that, then, _else) {
  if (then instanceof Array) {
    for (const t of then) {
      if (!(t in that)) continue;
      return that[t];
    }
  }
  else if (then instanceof Object) {
    for (const t in then) {
      if (!(t in that)) continue;
      if (then[t] instanceof Function && !then[t](that)) continue;
      if (then[t] !== that[t]) continue;
      return that[t];
    }
  }
	return _else;
};
