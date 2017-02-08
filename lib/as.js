#!/usr/bin/env node
'use strict';

/*
* npm install decimal.js --save
*
* const Decimal = require('decimal.js');
*
* */

const like = require('./like');
const is = require('./is');

const OPTIONS = {
	duplicate: true,
	lower: true,
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
		const re = {
			'A': /^array$/i,
			'B': /^boolean$/i,
			'C': /^[^\:]+[\:][\s]*/,
			'D': /^date$/i,
			'Dm': /^decimal/i,
			'fl': /^[\-\+]?[\d]+[\.\,][\d]*$/,
			'F': /^function(?:[\:]|$)/i,
			'i': /^[\-\+]?[\d]+$/,
			'n': /^number|decimal$/i,
			'nil': /^null$/i,
			'N': /^number$/i,
			'O': /^object(?:[\:]|$)/i,
			'PR': /^promise/i,
			'RE': /^regexp/i,
			'S': /^string/i,
			'U': /^undefined$/i,
		};
		const _is = is(that, o);
		const _classes = _is.replace(re['C'], '').split(o.j || o.join);

		this._array = re['A'].test(_is);
		this._boolean = re['B'].test(_is);
		this._date = re['D'].test(_is);
		this._decimal = re['Dm'].test(_is);
		this._double = re['n'].test(_is) && re['fl'].test(that);
		this._float = re['n'].test(_is) && re['fl'].test(that);
		this._function = re['F'].test(_is);
		this._integer = re['n'].test(_is) && re['i'].test(that);
		this._null = re['nil'].test(_is);
		this._number = re['N'].test(_is);
		this._object = re['O'].test(_is);
		this._promise = re['PR'].test(_is) || _classes.indexOf('promise')>=0;
		this._regexp = re['RE'].test(_is);
		this._string = re['S'].test(_is);
		this._undefined = re['U'].test(_is);

		this._class = _classes.slice().concat(['?'])[0];
		this._classes = _classes.slice();
		this._is = _is;
		this._super = _classes.slice().concat(['?', '?'])[1];
		this._that = that;
		this._type = _is;
		Object.freeze(this);
	}

	has(name){
		name = like(name, { l: true })==='string' ? name.toLowerCase() : false;
		return name && this.cids.indexOf(name)>=0;
	}
}

const as = function(that, options){
	return new typeAs(that, options);
}
as.types = TYPES;

module.exports = as;
