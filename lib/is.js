'use strict';

const like = require('./like');
const uf = require('util').format;

// options.duplicate: default = true
const oD = function(options){
	options = options || {};
	let d = true;
	switch('boolean'){
		case like(options.duplicate): d = options.duplicate; break;
		case like(options.dupl): d = options.dupl; break;
		case like(options.d): d = options.d; break;
		//default: d = true;
	}
	return function(parent, parents){
		return d===false && parents.indexOf(parent)>=0;
	};
};

// options.lower: default = true
const oL = function(options){
	options = options || {};
	let l = true;
	switch('boolean'){
		case like(options.lower): l = options.lower; break;
		case like(options.l): l = options.l; break;
		//default: l = true;
	}
	return function(name){
		return l ? String(name).toLowerCase() : name;
	};
};

// options.recursion: default = true
const oR = function(options){
	options = options || {};
	let r = true;
	switch('boolean'){
		case like(options.recursion): r = options.recursion; break;
		case like(options.r): r = options.l; break;
		default:
			switch('number'){
				case like(options.recursion): r = options.recursion; break;
				case like(options.r): r = options.l; break;
				//default: r = true;
			}
			r = r===true || r>0 ? r : true;
	}
	// TODO: (function && iteration>2) || (object && iteration>1)
	return function(iteration, name, proto, parents){
		return r===true || iteration<r;
	};
};

// options.prefix: default = undefined
const oP = function(options){
	options = options || {};
	let p = false;
	switch('string'){
		case like(options.prefix): p = options.prefix; break;
		case like(options.p): p = options.p; break;
		//default: p = false;
	}
	return function(name){
		return p!==false && p.length>0 ? uf('%s %s', p, name) : name;
	};
};

// options.join: default = '-->'
const oJ = function(options){
	options = options || {};
	let j = false;
	switch('string'){
		case like(options.join): j = options.join; break;
		case like(options.j): j = options.j; break;
		default: j = '-->';
	}
	return function(name, parents){
		return j!==false && j.length>0 && parents.length>1 ? uf('%s: %s', name, parents.slice(1).join(j)) : name;
	};
};

// to
const to = function(that){
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
 *   prefix: string = undefined
 *   join: string = ' --> '
 * */
const is = function(that, options){
	let o = { d: oD(options), l: oL(options), r: oR(options), p: oP(options), j: oJ(options) };
	let name = like(that);
	let iteration = 0;
	let parents = [name];
	let proto = to(that);
	while(proto && o.r(iteration, name, proto, parents)){
		let parent = proto.constructor.name;
		iteration += 1;
		proto = to(proto);
		parent = o.l(parent); // lowerCase
		parent = o.p(parent); // prefix
		if(o.d(parent, parents)) continue; // no duplicate
		parents.push(parent);
	}
	name = o.j(name, parents);
	return name;
};

module.exports = is;
