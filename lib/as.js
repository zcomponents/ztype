#!/usr/bin/env node
'use strict';

const is = require('./is');

class _typeAs{
	constructor(that){
		const _is = is(that, { d: true, l: true, r: true, p: false, j: '-->' });
		const _classes = _is.replace(/^[^\:]+[\:][\s]*/, '').split('-->');

		this._array = _is==='array';
		this._boolean = _is==='boolean';
		this._date = _is==='date';
		this._double = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._float = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._int = _is==='number' && /^[\-\+]?[\d]+$/.test(that);
		this._null = _is==='null';
		this._number = _is==='number';
		this._object = /^object[\:]/i.test(_is);
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

	has(name){
		return this.cids.indexOf(name)>=0;
	}
}

class __typeAs extends _typeAs{
	get array(){ return this._array; }
	get boolean(){ return this._boolean; }
	get date(){ return this._date; }
	get double(){ return this._double; }
	get float(){ return this._float; }
	get int(){ return this._int; }
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

	constructor(that){ super(that); }
}

class ___typeAs extends __typeAs{
	get a(){ return this._array; }
	get b(){ return this._boolean; }
	get d(){ return this._date; }
	get i(){ return this._int; }
	get n(){ return this._number; }
	get nil(){ return this._null; }
	get o(){ return this._object; }
	get pr(){ return this._promise; }
	get re(){ return this._regexp; }
	get s(){ return this._string; }
	get u(){ return this._undefined; }

	get cid(){ return this._class; }
	get cids(){ return this._classes.slice(); }
	get pid(){ return this._super; }
	get t(){ return this._type; }

	constructor(that){ super(that); }
}

const THENS = {
	a: 'array', a: 'a',
	b: 'boolean', b: 'b',
	d: 'date', d: 'd',
	double: 'double',
	float: 'float',
	i: 'int', i: 'i',
	n: 'number', n: 'n',
	nil: 'null', nil: 'nil',
	o: 'object', o: 'o',
	pr: 'promise', pr: 'pr',
	re: 'regexp', re: 're',
	s: 'string', s: 's',
	u: 'undefined', u: 'u',
};

class typeAs extends ___typeAs{
	constructor(that){ super(that); }

	if(then){
		for(let t in THENS){
			let tt = THENS[t];
			if(this[t] && then[tt]){
				then[tt](this._that);
				return;
			}
			throw 'type as unexpected';
		}		
	}
}

const as = function(that){
	return new typeAs(that);
}

module.exports = as;
