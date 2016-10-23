'use strict';


var uf = require('util').format;


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


var like = module.exports.like = function(that){
	let result = {}.toString.call(that);
	result = String(result).toLowerCase();
	let result2name = result.match(/^[\[]object[\s]+([a-zA-Z]+)[\]]$/i);
	return result2name ? result2name[1] : result;
};

/*
 * @options
 *   duplicate: boolean = true
 *   lowerClass: boolean = false
 *   prefix: string = undefined
 *   join: string = ' --> '
 *   depth: boolean = false
 * */
var is = module.exports.is = function(that, options){
	let name = like(that), isO = name.match(/^object$/i), isF = name.match(/^function$/i);
	if(isO || isF){
		let classes = [];
		let pThat = isF ? that.prototype : that.__proto__, pDepth = 0;
		while(pThat){
			let className = pThat.constructor.name;
			pThat = pThat.__proto__;
			if(options && options.duplicate===false && classes.indexOf(className)>=0) continue; // no duplicate
			pDepth++;
			if(options && options.lowerClass) className = String(className).toLowerCase(); // classes in lowerCase
			if(options && options.prefix) className = uf('%s %s', options.prefix, className);
			classes.push(className);
		}
		if(options && options.depth){ // (isF && pDepth>2) || (isO && pDepth>1)
			name = uf('%s: %s', name, classes.join(options && options.join || '-->'));
		}
	}
	return name;
};

var of = module.exports.of = function(that, name){
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

var ofs = module.exports.ofs = function(thats, name){
	return (of(thats, 'array') ? thats : [thats]).some(function(that){
		return !of(that, name);
	});
};
