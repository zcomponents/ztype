#!/usr/bin/env node
'use strict';

const like = require('./like');
const as = require('./as');
const uf = require('util').format;

// options.duplicate: default = true
const options2duplicate = function(options){
	options = options || {};
	let d = true;
	switch('boolean'){
		case like(options.d, true): d = options.d; break;
		case like(options.dupl, true): d = options.dupl; break;
		case like(options.duplicate, true): d = options.duplicate; break;
		//default: d = true;
	}
	return function(parent, parents){
		if(d===true) return false;
		else return parents.indexOf(parent)>=0;
	};
};

// options.lower: default = true
const options2lowerCase = function(options){
	//return like.options2lowerCase(options);
	options = options || {};
	let l = true;
	switch('boolean'){
		case like(options.l, true): l = options.l; break;
		case like(options.lower, true): l = options.lower; break;
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
	const d = options2duplicate(options);
	const l = options2lowerCase(options);
	const r = options2recursion(options);
	const p = options2prefix(options);
	const j = options2join(options);
	const T = l(as(that));
	const name = T.like;
	let parents = T.cids.map(function(cid, index, cids){
		return d(cid, cids.slice(0, index)) ? '' : cid; // no duplicate
	}).filter(function(cid){
		return cid.length>0;
	}).map(function(cid){
		return p(l(cid)); // lowerCase && prefix
	});
	parents = r(parents);
	is = j(name, parents);
	return is;
};

module.exports = is;
