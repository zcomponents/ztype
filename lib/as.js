#!/usr/bin/env node
'use strict';

//const like = require('./like');
const is = require('./is');

class typeAs_0{
	constructor(that){
		const _is = is(that, { d: true, l: true, r: true, p: false, j: '-->' });
		const _classes = _is.replace(/^[^\:]+[\:][\s]*/, '').split('-->');

		this._array = _is==='array';
		this._boolean = _is==='boolean';
		this._date = _is==='date';
		this._double = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._float = _is==='number' && /^[\-\+]?[\d]+[\.\,][\d]*$/.test(that);
		this._function = _is==='function' || /^function[\:]/i.test(_is);
		this._int = _is==='number' && /^[\-\+]?[\d]+$/.test(that);
		this._null = _is==='null';
		this._number = _is==='number';
		this._object = _is==='object' || /^object[\:]/i.test(_is);
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
	get double(){ return this._double; }
	get float(){ return this._float; }
	get function(){ return this._function; }
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

	constructor(that){
		super(that);
	}
}

class typeAs_2 extends typeAs_1{
	get a(){ return this._array; }
	get b(){ return this._boolean; }
	get d(){ return this._date; }
	get db(){ return this._double; }
	get fl(){ return this._float; }
	get f(){ return this._function; }
	get func(){ return this._function; }
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

module.exports = as;
