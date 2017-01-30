#!/usr/bin/env node
'use strict';

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
	assert.strictEqual(is({}), 'object');
	assert.strictEqual(is(new B(), { j: '-->' }), 'object: b-->a-->object');
	assert.strictEqual(is(B, { j: '-->' }), 'function: b-->a-->object');
	assert.strictEqual(is(''), 'string', 'is("")');
	assert.strictEqual(is(undefined), 'undefined', 'is(undefined)');

	const as = type.as;
	assert.ok(as([], null).array);
	assert.ok(as(Promise.resolve(), null).pr);

	const al = type.al;
	assert.ok(al(Promise.resolve(), {a: a=>true, pr: pr=>true}));
	assert.ok(al(1.2, {a: a=>true, fl: true}));

	const of = type.of;
	assert.ok(of([], ['array']));
	assert.ok(of([], /^Array$/i));
	assert.ok(of([], 'array'));
	assert.ok(of([]), 'array');

	const ofs = type.ofs;
	assert.ok(ofs(['a', 'b', 1], ['number', 'string']));

})();
