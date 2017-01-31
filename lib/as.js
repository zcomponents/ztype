#!/usr/bin/env node
'use strict';

var Decimal = require('decimal.js');

//const like = require('./like');
const is = require('./is');

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


class typeAs_0{
	get types(){ return TYPES; }
	constructor(that){
		const _is = is(that, { d: true, l: true, r: true, p: false, j: '-->' });
		const _classes = _is.replace(/^[^\:]+[\:][\s]*/, '').split('-->');
		const re = {
			'f': /^[\-\+]?[\d]+[\.\,][\d]*$/,
			'F': /^function(?:[\:]|$)/i,
			'i': /^[\-\+]?[\d]+$/,
			'n': /^number|decimal$/i,
			'O': /^object(?:[\:]|$)/i,
		};

		this._array = _is==='array';
		this._boolean = _is==='boolean';
		this._date = _is==='date';
		this._decimal = _is==='decimal';
		this._double = re['n'].test(_is) && re['f'].test(that);
		this._float = re['n'].test(_is) && re['f'].test(that);
		this._function = re['F'].test(_is);
		this._integer = re['n'].test(_is) && re['i'].test(that);
		this._null = _is==='null';
		this._number = _is==='number';
		this._object = re['O'].test(_is);
		this._promise = _is==='promise' || _classes.indexOf('promise')>=0;
		this._regexp = _is==='regexp';
		this._string = _is==='string';
		this._undefined = _is==='undefined';

		this._class = _classes.slice().concat(['?'])[0];
		this._classes = _classes.slice();
		this._is = _is;
		this._super = _classes.slice().concat(['?', '?'])[1];
		this._that = that;
		this._type = _is;
		Object.freeze(this);
	}
}

class typeAs_1 extends typeAs_0{
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

	constructor(that){
		super(that);
	}
}

class typeAs_2 extends typeAs_1{
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
	get nun(){ return this.number; }
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

	constructor(that){
		super(that);
	}
}

class typeAs extends typeAs_2{
	constructor(that){
		super(that);
	}

	has(name){
		return this.cids.indexOf(name)>=0;
	}
}

const as = function(that){
	return new typeAs(that);
}
as.types = TYPES;

module.exports = as;
