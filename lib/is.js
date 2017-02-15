#!/usr/bin/env node
'use strict';

const like = require('./like');
const pl = require('./pl');
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
	return function(parents){
		return r===true || parents.length<r ? parents : parents.slice(0, r);
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
	let parents = pl(that).map(function(proto){
		let parent = proto.constructor.name;
		parent = o.l(parent); // lowerCase
		parent = o.p(parent); // prefix
		return parent;
	}).map(function(parent, index, parents){
		if(o.d(parent, parents.slice(0, index))) return ''; // no duplicate
		return parent;
	}).filter(function(parent){
		return parent.length>0;
	});
	parents = o.r(parents);
	//if(parents.length>0 && that instanceof Object) parents.unshift(name);
	name = o.j(name, parents);
	return name;
};

module.exports = is;
