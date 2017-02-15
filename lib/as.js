#!/usr/bin/env node
'use strict';

/*
* npm install decimal.js --save
*
* const Decimal = require('decimal.js');
*
* */

const like = require('./like');
const pl = require('./pl');
//const is = require('./is');

const OPTIONS = {
	duplicate: true,
	lower: false,
	recursion: true,
	prefix: false,
	join: '-->'
};

const TYPES = {
	array: 'a', a: 'a',
	boolean: 'b', b: 'b',
	date: 'dt', dt: 'dt',
	decimal: 'dm', dm: 'dm',
	double: 'dl', dl: 'dl',
	float: 'fl', fl: 'fl',
	function: 'f', func: 'f', f: 'f',
	integer: 'i', int: 'i', i: 'i',
	null: 'nil', nil: 'nil',
	number: 'n', num: 'n', n: 'n',
	object: 'o', o: 'o',
	promise: 'pr', pr: 'pr',
	regexp: 're', re: 're',
	string: 's', str: 's', s: 's',
	undefined: 'u', undef: 'u', u: 'u',
};

class typeAs{
	get a(){ return this.array; }
	get b(){ return this.boolean; }
	get db(){ return this.double; }
	get dt(){ return this.date; }
	get dm(){ return this.decimal; }
	get fl(){ return this.float; }
	get f(){ return this.func; }
	get func(){ return this.function; }
	get i(){ return this.int; }
	get int(){ return this.integer; }
	get n(){ return this.num; }
	get num(){ return this.number; }
	get nil(){ return this.null; }
	get o(){ return this.object; }
	get pr(){ return this.promise; }
	get re(){ return this.regexp; }
	get s(){ return this.str; }
	get str(){ return this.string; }
	get u(){ return this.undef; }
	get undef(){ return this.undefined; }

	get cid(){ return this._class; }
	get cids(){ return this._classes.slice(); }
	get pid(){ return this._super; }
	get t(){ return this._type; }

	get array(){ return this._array; }
	get boolean(){ return this._boolean; }
	get date(){ return this._date; }
	get decimal(){ return this._decimal; }
	get double(){ return this._double; }
	get float(){ return this._float; }
	get function(){ return this._function; }
	get integer(){ return this._integer; }
	get number(){ return this._number; }
	get null(){ return this._null; }
	get object(){ return this._object; }
	get promise(){ return this._promise; }
	get regexp(){ return this._regexp; }
	get string(){ return this._string; }
	get undefined(){ return this._undefined; }

	get class(){ return this._class; }
	get classes(){ return this._classes.slice(); }
	get is(){ return this._is; }
	get parent(){ return this._super; }
	get super(){ return this._super; }
	get type(){ return this._type; }
	get types(){ return TYPES; }

	constructor(that, options){
		const o = Object.assign({}, OPTIONS, options);
console.log(o);
		const re = {
			'C': /^[^\:]+[\:][\s]*/,
			'f': /^[\-\+]?[\d]+[\.\,][\d]*$/,
			'i': /^[\-\+]?[\d]+$/,
			'n': /^null$/i,
			'u': /^undefined$/i
		};
		const _classes = pl(that).map(function(t){
			return t.constructor.name;
		}).concat(that instanceof Object ? [] : [like(that, {lower: o.lower})]);
console.log(_classes);
		const _has = function(value){
			if(value instanceof Array){
				return value.some(_has);
			}
			else{
				return _classes.indexOf(value)>=0;
			}
		};

		this._array = _has('Array');
		this._boolean = _has('Boolean');
		this._date = _has('Date');
		this._decimal = _has('Decimal');
		this._double = _has([ 'Decimal', 'Number'] ) && re['f'].test(that);
		this._float = _has([ 'Decimal', 'Number'] ) && re['f'].test(that);
		this._function = _has('Function');
		this._integer = _has([ 'Decimal', 'Number'] ) && re['i'].test(that);
		this._null = re['n'].test(that);
		this._number = _has('Number');
		this._object = _has('Object');
		this._promise = _has('Promise');
		this._regexp = _has('Regexp');
		this._string = _has('String');
		this._undefined = re['u'].test(that);

		this._class = _classes.slice().concat(['?'])[0];
		this._classes = _classes.slice();
		this._super = _classes.slice().concat(['?', '?'])[1];
		this._that = that;
		this._type = like(that);
		Object.freeze(this);
	}

	has(name){
		return this.cids.indexOf(name)>=0;
	}
}

const as = function(that, options){
	return new typeAs(that, options);
}
as.types = TYPES;

module.exports = as;
