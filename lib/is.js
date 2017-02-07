#!/usr/bin/env node
'use strict';

const like = require('./like');
const uf = require('util').format;

// options.duplicate: default = true
const options2duplicate = function(options){
	options = options || {};
	let d = true;
	switch('boolean'){
		case like(options.d, { l:true }): d = options.d; break;
		case like(options.dupl, { l:true }): d = options.dupl; break;
		case like(options.duplicate, { l:true }): d = options.duplicate; break;
		//default: d = true;
	}
	return function(parent, parents){
		if(d===true) return false;
		else return parents.indexOf(parent)>=0;
	};
};

// options.lower: default = true
const options2lowerCase = function(options){
	options = options || {};
	let l = true;
	switch('boolean'){
		case like(options.l, { l:true }): l = options.l; break;
		case like(options.lower, { l:true }): l = options.lower; break;
		//default: l = true;
	}
	return function(name){
		return l ? String(name).toLowerCase() : name;
	};
};

// options.recursion: default = true
const options2recursion = function(options){
	options = options || {};
	let r = true;
	switch('boolean'){
		case like(options.r, { l:true }): r = options.r; break;
		case like(options.recursion, { l:true }): r = options.recursion; break;
		default:
			switch('number'){
				case like(options.r, { l:true }): r = options.r; break;
				case like(options.recursion, { l:true }): r = options.recursion; break;
				//default: r = true;
			}
			r = r===true || r>0 ? r : true;
	}
	// TODO: (function && iteration>2) || (object && iteration>1)
	return function(iteration, name, proto, parents){
		return r===true || iteration<r;
	};
};

// options.prefix: default = false
const options2prefix = function(options){
	options = options || {};
	let p = false;
	switch('string'){
		case like(options.p, { l:true }): p = options.p; break;
		case like(options.prefix, { l:true }): p = options.prefix; break;
		//default: p = false;
	}
	return function(name){
		if(p===false || !(p.length>0)) return name;
		else return uf('%s %s', p, name);
	};
};

// options.join: default = false
const options2join = function(options){
	options = options || {};
	let j = false;
	switch('string'){
		case like(options.j, { l:true }): j = options.j; break;
		case like(options.join, { l:true }): j = options.join; break;
		default: j = false; // '-->'
	}
	return function(name, parents){
		if(j===false || !(parents.length>0)) return name;
		else return uf('%s: %s', name, parents.join(j));
	};
};

// toProto
const toProto = function(that){
	switch(true){
		case /^function$/i.test(like(that)): return that.prototype;
		case /^object$/i.test(like(that)): return that.__proto__;
		default: return false;
	}
};

/*
 * @options
 *   duplicate: boolean = true
 *   lower: boolean = true
 *   recursion: { boolean = true | number > 0 }
 *   prefix: string = false
 *   join: string = false
 * */
const is = function(that, options){
	let o = {
		d: options2duplicate(options),
		l: options2lowerCase(options),
		r: options2recursion(options),
		p: options2prefix(options),
		j: options2join(options)
	};
	let name = o.l(like(that));
	let iteration = 0;
	let parents = [];
	let proto = toProto(that);
	while(proto && o.r(iteration, name, proto, parents)){
		let parent = proto.constructor.name;
		iteration += 1;
		proto = toProto(proto);
		parent = o.l(parent); // lowerCase
		parent = o.p(parent); // prefix
		if(o.d(parent, parents)) continue; // no duplicate
		parents.push(parent);
	}
	name = o.j(name, parents);
	return name;
};

module.exports = is;
