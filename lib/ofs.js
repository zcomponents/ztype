#!/usr/bin/env node
'use strict';

const al = require('./al');
const of = require('./of');

const ofs = function(thats, name, options){
	const T = al(thats, {a: thats, else: [thats]});
	return !T.some(function(that){
		return !of(that, name, options);
	});
};

module.exports = ofs;
