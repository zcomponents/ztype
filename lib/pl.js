#!/usr/bin/env node
'use strict';

const like = require('./like');

// to proto
const to = function(that){
	switch(true){
		case /^function$/i.test(like(that)): return that.prototype;
		case /^object$/i.test(like(that)): return that.__proto__;
		default: return false;
	}
};

const init = function(that){
	if(that instanceof Function){
		return that.prototype;
	}
	else if(that instanceof Object && 'constructor' in that){
		return that.__proto__;
	}
	else{
		return false;
	}
}

const pl = function(that){
	let protos = [];
	for(let proto=init(that), it=0; proto && it>=0; proto=to(proto), it+=1){
		protos.push(proto);
	}
	return protos;
};

module.exports = pl;
