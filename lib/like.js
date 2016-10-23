'use strict';

var like = function(that){
	let result = {}.toString.call(that);
	result = String(result).toLowerCase();
	let result2name = result.match(/^[\[]object[\s]+([a-zA-Z]+)[\]]$/i);
	return result2name ? result2name[1] : result;
};
module.exports = like;
