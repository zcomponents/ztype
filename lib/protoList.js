#!/usr/bin/env node

'use strict';

const toProto = require('./object2proto');
const options2length = require('./options2length');

module.exports = function (that, options) {
	let protoList = [];
	let length = options2length(options);
	for (let it = 0, proto = that; proto && length(protoList); it += 1) {
		proto = toProto(proto, it);
		if (proto === false || protoList.indexOf(proto) < 0) break;
		protoList.push(proto);
	}
	return protoList;
};
