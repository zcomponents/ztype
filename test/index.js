'use strict'

const assert = require('assert');
const type = require('../');

(function(){

	const like = type.like;
	assert.strictEqual(like([]), 'array', 'like([])');
	assert.strictEqual(like(false), 'boolean', 'like(false)');
	assert.strictEqual(like(true), 'boolean', 'like(true)');
	assert.strictEqual(like(new Date()), 'date', 'like(new Date())');
	assert.strictEqual(like(null), 'null', 'like(null)');
	assert.strictEqual(like(1), 'number', 'like(number)');
	assert.strictEqual(like({}), 'object', 'like({})');
	assert.strictEqual(like(''), 'string', 'like("")');
	assert.strictEqual(like(undefined), 'undefined', 'like(undefined)');

	const is = type.is;
	class A {
		constructor(){
			this.a = 1;
		}
	}
	class B extends A{
		constructor(){
			super();
			this.b = 2;
		}
	}
	assert.strictEqual(is([]), 'array', 'is([])');
	assert.strictEqual(is(false), 'boolean', 'is(false)');
	assert.strictEqual(is(true), 'boolean', 'is(true)');
	assert.strictEqual(is(new Date()), 'date', 'is(new Date())');
	assert.strictEqual(is(null), 'null', 'is(null)');
	assert.strictEqual(is(1), 'number', 'is(number)');
	assert.strictEqual(is({}, { d: false }), 'object');
	assert.strictEqual(is(new B()), 'object: b-->a-->object');
	assert.strictEqual(is(B), 'function: b-->a-->object');
	assert.strictEqual(is(''), 'string', 'is("")');
	assert.strictEqual(is(undefined), 'undefined', 'is(undefined)');

	const of = type.of;
	assert.ok(of([], ['array']));
	assert.ok(of([], null).array);
	assert.ok(of([], /^Array$/i));
	assert.ok(of([], 'array'));
	assert.ok(of([]), 'array');
	assert.ok(of(Promise.resolve(), null).pr);

	const ofs = type.ofs;
	assert.ok(ofs(['a', 'b', 1], ['number', 'string']));

})();