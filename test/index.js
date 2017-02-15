#!/usr/bin/env node
'use strict';

const assert = require('assert');
const Decimal = require('decimal.js');
const type = require('../');

(function(){
	// test data
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

	//test-2 data
	class C extends Array{
		constructor(c){
			c ? super(c) : super();
		}
	}

	//test-3 data
	class D extends Date{
		constructor(d){
			d ? super(d) : super();
		}
	}

	// like
	const like = type.like;
	assert.strictEqual(like([]), 'array', 'like(array:[])');
	assert.strictEqual(like(false), 'boolean', 'like(boolean:false)');
	assert.strictEqual(like(true), 'boolean', 'like(boolean:true)');
	assert.strictEqual(like(new Date()), 'date', 'like(date:new Date())');
	assert.strictEqual(like(Decimal(1/2)), 'object', 'like(Decimal:1/2)');
	assert.strictEqual(like(1/3), 'number', 'like(float:1/3)');
	assert.strictEqual(like(Math.PI), 'number', 'like(Math.PI)');
	assert.strictEqual(like(null), 'null', 'like(null)');
	assert.strictEqual(like(1), 'number', 'like(number)');
	assert.strictEqual(like({}), 'object', 'like({})');
	assert.strictEqual(like(''), 'string', 'like("")');
	assert.strictEqual(like(undefined), 'undefined', 'like(undefined)');
	assert.strictEqual(like(new A()), 'object');
	assert.strictEqual(like(new B()), 'object');
	assert.strictEqual(like(new C(1, 2, 3)), 'array');
	assert.strictEqual(like(new D()), 'date');

	// pl
	const pl = function(args){
		return type.pl(args).map(function(a){
			return a.constructor.name;
		});
	}
	assert.deepEqual(pl(new A()), [ 'A', 'Object' ]);
	assert.deepEqual(pl(new B()), [ 'B', 'A', 'Object' ]);
	assert.deepEqual(pl(new C(1, 2, 3)), [ 'C', 'Array' ]);
	assert.deepEqual(pl(new D()), [ 'D', 'Date' ]);
	assert.deepEqual(pl(D), [ 'D', 'Date' ]);
	assert.deepEqual(pl(null), [  ]);

	// as
	const as = type.as;
	assert.ok(as(true).boolean);
	assert.ok(as([]).array);
	assert.ok(as([]).array);
	assert.ok(as([]).array);
	assert.ok(as(Promise.resolve()).pr);

	// is
	const is = type.is;
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

	// al
	const al = type.al;
	assert.ok(al(Promise.resolve(), { pr:true, else:false }));
	assert.ok(al(new Number(1.2), { fl:true, else:false }));
	//assert.ok(al(1.2, { fl:true, else:false }));

	// of
	const of = type.of;
	//assert.ok(of([], ['array']));
	//assert.ok(of([], /^Array$/i));
	//assert.ok(of([], 'array'));
	//assert.ok(of([]), 'array');

	// ofs
	const ofs = type.ofs;
	//assert.ok(ofs(['a', 'b', 1], ['number', 'string']));

})();
