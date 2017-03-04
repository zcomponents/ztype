#!/usr/bin/env node

'use strict';

const assert = require('assert');
//const Decimal = require('decimal.js'); // npm install decimal.js --save
const zt = require('../');

(function () {
	// test data
	class A {
		constructor() {
			this.a = 1;
		}
	}

	class B extends A {
		constructor() {
			super();
			this.b = 2;
		}
	}

	//test-2 data
	class C extends Array {
		constructor(c) {
			c ? super(c) : super();
		}
	}

	class e extends C {
		constructor(e) {
			e ? super(e) : super();
		}
	}

	//test-3 data
	class D extends Date {
		constructor(d) {
			d ? super(d) : super();
		}
	}

	// inherit
	const inherit = function (args) {
		return zt.inherit(args).map(function (a) {
			return a.constructor.name;
		});
	}
	assert.deepEqual(inherit(1), []);
	assert.deepEqual(inherit(new Number(1)), ['Number', 'Object']);
	assert.deepEqual(inherit(new A()), ['A', 'Object']);
	assert.deepEqual(inherit(new B()), ['B', 'A', 'Object']);
	assert.deepEqual(inherit(new C(1, 2, 3)), ['C', 'Array', 'Object']);
	assert.deepEqual(inherit(new D()), ['D', 'Date', 'Object']);
	assert.deepEqual(inherit(D), ['Function', 'Function', 'Object']);
	assert.deepEqual(inherit(null), []);

	// like
	assert.strictEqual(zt.like([], true), 'array');
	assert.strictEqual(zt.like([]), 'Array');
	assert.strictEqual(zt.like(false), 'Boolean');
	assert.strictEqual(zt.like(true), 'Boolean');
	assert.strictEqual(zt.like(new Date()), 'Date');
	//assert.strictEqual(zt.like(Decimal(1 / 2)), 'Object');
	assert.strictEqual(zt.like(1 / 3), 'Number');
	assert.strictEqual(zt.like(Math.PI), 'Number');
	assert.strictEqual(zt.like(null), 'Null');
	assert.strictEqual(zt.like(1), 'Number');
	assert.strictEqual(zt.like({}), 'Object');
	assert.strictEqual(zt.like(''), 'String');
	assert.strictEqual(zt.like(undefined), 'Undefined');
	assert.strictEqual(zt.like(new A()), 'Object');
	assert.strictEqual(zt.like(new B()), 'Object');
	assert.strictEqual(zt.like(new C(1, 2, 3)), 'Array');
	assert.strictEqual(zt.like(new D()), 'Date');

	// likeAs
	assert.ok(zt.likeAs(true).boolean);
	assert.ok(!zt.likeAs(true).object);
	assert.ok(zt.likeAs(new Boolean(true)).boolean);
	assert.ok(zt.likeAs(new Boolean(true)).object);
	assert.ok(zt.likeAs([]).array);
	assert.ok(zt.likeAs([]).object);
	assert.ok(zt.likeAs(Promise.resolve()).promise);
	assert.ok(zt.likeAs(Promise.resolve()).object);

	// likeAsBack
	assert.ok(zt.likeAsBack(true, {
		b: zt.self,
		else: false
	}));
	assert.ok(zt.likeAsBack(Promise.resolve(), {
		pr: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(new Number(1.2), {
		fl: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(new Number(123), {
		i: true,
		else: false
	}));
	//assert.ok(zt.likeAsBack(new Decimal('1.2'), { fl: true, else: false }));
	//assert.ok(zt.likeAsBack(new Decimal('123'), { i: true, else: false }));
	//assert.ok(zt.likeAsBack(new Decimal('1234'), { n: true, else: false }));
	//assert.ok(zt.likeAsBack(Decimal('1.2'), { fl: true, else: false }));
	//assert.ok(zt.likeAsBack(Decimal('123'), { i: true, else: false }));
	//assert.ok(zt.likeAsBack(Decimal('1234'), { n: true, else: false }));
	assert.ok(zt.likeAsBack(1.2, {
		fl: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(123, {
		i: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(1234, {
		n: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(new A(), {
		cid_A: true,
		else: false
	}));
	assert.ok(zt.likeAsBack(new B(), {
		cid_A: false,
		cid_B: true,
		else: false
	}));

	// likeIs
	assert.strictEqual(zt.likeIs([]), 'Array');
	assert.strictEqual(zt.likeIs(false), 'Boolean');
	assert.strictEqual(zt.likeIs(true, {
		l: true
	}), 'boolean');
	assert.strictEqual(zt.likeIs(new Date()), 'Date');
	assert.strictEqual(zt.likeIs(null), 'Null');
	assert.strictEqual(zt.likeIs(1), 'Number');
	assert.strictEqual(zt.likeIs({}), 'Object');
	assert.strictEqual(zt.likeIs(new B(), {
		j: true
	}), 'Object: B-->A-->Object');
	assert.strictEqual(zt.likeIs(new B(), {
		r: 2,
		j: true
	}), 'Object: B-->A');
	assert.strictEqual(zt.likeIs(B, {
		j: true
	}), 'Function: Function-->Function-->Object');
	assert.strictEqual(zt.likeIs(B, {
		d: false,
		p: '{%s}',
		j: '.'
	}), 'Function: {Function}.{Object}');
	assert.strictEqual(zt.likeIs(''), 'String');
	assert.strictEqual(zt.likeIs(undefined), 'Undefined');
	assert.strictEqual(zt.likeIs((new e()), {
		j: true
	}), 'Array: e-->C-->Array-->Object');
	assert.strictEqual(zt.likeIs((new C()), {
		j: true
	}), 'Array: C-->Array-->Object');
	assert.strictEqual(zt.likeIs((new e()).__proto__, {
		j: true
	}), 'Object: C-->Array-->Object');

	// likeOf
	assert.ok(zt.likeOf([], ['Array']));
	assert.ok(zt.likeOf([], /^Array$/i));
	assert.ok(zt.likeOf([], 'Array'));
	assert.ok(!zt.likeOf([]));

	// likeOfs
	assert.ok(zt.likeOfs(['a', 'b', 1, new e()], ['Number', 'String', 'e']));

})();
