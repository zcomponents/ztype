#!/usr/bin/env node
'use strict';

const is = require('./is');

class __typeAs{
	constructor(that){
		const _is = is(that, { d: true, l: true, r: true, p: false, j: '-->' });
		const _classes = _is.replace(/^[^\:]+[\:][\s]*/, '').split('-->');
		this._that = that;
		this._array = _is==='array';
		this._boolean = _is==='boolean';
		this._class = _classes.slice().concat(['?'])[0];
		this._classes = _classes.slice();
		this._date = _is==='date';
		this._double = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._float = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._int = _is==='number' && /^[\-\+]?[\d]+$/.test(that);
		this._is = _is;
		this._null = _is==='null';
		this._number = _is==='number';
		this._object = /^object[\:]/i.test(_is);
		this._promise = _is==='promise' || _classes.indexOf('promise')>=0;
		this._regexp = _is==='regexp';
		this._string = _is==='string';
		this._super = _classes.slice().concat(['?', '?'])[1];
		this._type = _is;
		this._undefined = _is==='undefined';
		Object.freeze(this);
	}

	has(name){
		return this.cids.indexOf(name)>=0;
	}
}

class _typeAs extends __typeAs{
	get array(){ return this._array; }
	get boolean(){ return this._boolean; }
	get class(){ return this._class; }
	get classes(){ return this._classes.slice(); }
	get date(){ return this._date; }
	get double(){ return this._double; }
	get float(){ return this._float; }
	get int(){ return this._int; }
	get is(){ return this._is; }
	get number(){ return this._number; }
	get null(){ return this._null; }
	get object(){ return this._object; }
	get parent(){ return this._super; }
	get promise(){ return this._promise; }
	get regexp(){ return this._regexp; }
	get string(){ return this._string; }
	get super(){ return this._super; }
	get type(){ return this._type; }
	get undefined(){ return this._undefined; }
	constructor(that){ super(that); }
}

class typeAs extends _typeAs{
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

const as = function(that){
	return new typeAs(that);
}

module.exports = as;
