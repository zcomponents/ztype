'use strict';

var like = require('./like');
var of = require('./of');

var ofs = function(thats, name){
	switch(like(name)){
		case 'array':
		case 'regexp':
		case 'string':
			return !(of(thats, 'array') ? thats : [thats]).some(function(that){
				return !of(that, name);
			});
		default:
			return false;
	}
};

module.exports = ofs;
