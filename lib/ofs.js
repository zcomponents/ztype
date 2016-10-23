'use strict';

var of = require('./of');

var ofs = function(thats, name){
	return (of(thats, 'array') ? thats : [thats]).some(function(that){
		return !of(that, name);
	});
};
module.exports = ofs;
