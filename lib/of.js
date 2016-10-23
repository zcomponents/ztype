'use strict';

var like = require('./like');
var is = require('./is');

class typeOf{
	constructor(that){
		this._that = that;
	};
	has(name){ return this.classes.indexOf(name)>=0; };
	get array(){ return of(this._that, 'array'); };
	get boolean(){ return of(this._that, 'boolean'); };
	get class(){ return this.classes[0]; };
	get classes(){ return is(this._that, {depth: true, join: '-->'}).replace(/^[^\:]*[\:][\s]*/, '').split('-->'); };
	get date(){ return of(this._that, 'date'); };
	get null(){ return of(this._that, 'null'); };
	get number(){ return of(this._that, 'number'); };
	get object(){ return of(this._that, 'object'); };
	get promise(){ return /(?:^object: |-->)Promise(?:$|-->)/i.test(is(this._that, {depth: true, join: '-->'})); };
	get regexp(){ return of(this._that, 'regexp'); };
	get string(){ return of(this._that, 'string'); };
	get super(){ return is(this._that, {depth: true, join: '-->'}).replace(/^[^\:]*[\:][\s]*/, '').split('-->')[1]; };
	get type(){ return is(this._that, {depth: true, join: '-->'}); };
	get undefined(){ return of(this._that, 'undefined'); };
};

var of = function(that, name){
	switch(like(name)){
		case 'array':
			return name.some((one) => of(that, one));
		case 'regexp':
			return name.test(is(that, {depth: true, join: '-->'}));
		case 'string':
			return like(that)===name;
		case 'undefined':
		case 'null':
		default:
			let type = is(that, {depth: true, join: '-->'});
			return new typeOf(that);
	};
};
module.exports = of;
