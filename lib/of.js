'use strict';

var like = require('./like');
var is = require('./is');

class typeOf{
	get a(){ return this.array; };
	get b(){ return this.boolean; };
	get cid(){ return this.class; };
	get cids(){ return this.classes; };
	get d(){ return this.date; };
	get nil(){ return this.null; };
	get n(){ return this.number; };
	get o(){ return this.object; };
	get pr(){ return this.promise; };
	get re(){ return this.regexp; };
	get s(){ return this.string; };
	get pid(){ return this.super; };
	get t(){ return this.type; };
	get u(){ return this.undefined; };

	get array(){ return this._type==='array'; };
	get boolean(){ return this._type==='boolean'; };
	get class(){ return this.classes.concat(['?'])[0]; };
	get classes(){ return this._type.replace(/^[^\:]+[\:][\s]*/, '').split('-->'); };
	get date(){ return this._type==='date'; };
	get null(){ return this._type==='null'; };
	get number(){ return this._type==='number'; };
	get object(){ return this._type==='object: object-->object'; };
	get promise(){ return /(?:^object[\:][\s]|-->)promise(?:-->|$)/i.test(this._type); };
	get regexp(){ return this._type==='regexp'; };
	get string(){ return this._type==='string'; };
	get super(){ return this.classes.concat(['?', '?'])[1]; };
	get type(){ return this._type; };
	get undefined(){ return this._type==='undefined'; };
	constructor(that){
		this._that = that;
		this._type = of(that, { d: true, l: true, r: true, p: false, j: '-->' });
	};
	has(name){ return this.cids.indexOf(name)>=0; };
}

var of = function(that, name){
	switch(like(name)){
		case 'array':
			return name.some(function(one){
				switch(like(one)){
					case 'array':
					case 'regexp':
					case 'string':
						return of(that, one);
					default:
						return false;
				}
			});
		case 'null':
			return new typeOf(that);
		case 'regexp':
			return name.test(of(that));
		case 'string':
			return like(that)===name;
		case 'undefined':
		default:
			return is(that, { d: false, l: true, r: true, p: false, j: '-->' });
	}
};

module.exports = of;
