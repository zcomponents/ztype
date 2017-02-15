#!/usr/bin/env node

'use strict';

const assert = require('assert');
const Decimal = require('decimal.js');
const type = require('../');

(function() {
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

  //test-3 data
  class D extends Date {
    constructor(d) {
      d ? super(d) : super();
    }
  }

  // like
  const like = type.like;
  assert.strictEqual(like([], true), 'array'); // 'like(array:[])'
  assert.strictEqual(like([]), 'Array'); // 'like(array:[])'
  assert.strictEqual(like(false), 'Boolean'); // 'like(boolean:false)'
  assert.strictEqual(like(true), 'Boolean'); // 'like(boolean:true)'
  assert.strictEqual(like(new Date()), 'Date'); // 'like(date:new Date())'
  assert.strictEqual(like(Decimal(1 / 2)), 'Object'); // 'like(Decimal:1/2)'
  assert.strictEqual(like(1 / 3), 'Number'); // 'like(float:1/3)'
  assert.strictEqual(like(Math.PI), 'Number'); // 'like(Math.PI)'
  assert.strictEqual(like(null), 'Null'); // 'like(null)'
  assert.strictEqual(like(1), 'Number'); // 'like(number)'
  assert.strictEqual(like({}), 'Object'); // 'like({})'
  assert.strictEqual(like(''), 'String'); // 'like("")'
  assert.strictEqual(like(undefined), 'Undefined'); // 'like(undefined)'
  assert.strictEqual(like(new A()), 'Object');
  assert.strictEqual(like(new B()), 'Object');
  assert.strictEqual(like(new C(1, 2, 3)), 'Array');
  assert.strictEqual(like(new D()), 'Date');

  // pl
  const pl = function(args) {
    return type.pl(args).map(function(a) {
      return a.constructor.name;
    });
  }
  assert.deepEqual(pl(1), []);
  assert.deepEqual(pl(new Number(1)), ['Number', 'Object']);
  assert.deepEqual(pl(new A()), ['A', 'Object']);
  assert.deepEqual(pl(new B()), ['B', 'A', 'Object']);
  assert.deepEqual(pl(new C(1, 2, 3)), ['C', 'Array', 'Object']);
  assert.deepEqual(pl(new D()), ['D', 'Date', 'Object']);
  assert.deepEqual(pl(D), ['Function', 'Function', 'Object']);
  assert.deepEqual(pl(null), []);

  // as
  const as = type.as;
  assert.ok(as(true).boolean);
  assert.ok(!as(true).object);
  assert.ok(as(new Boolean(true)).boolean);
  assert.ok(as(new Boolean(true)).object);
  assert.ok(as([]).array);
  assert.ok(as([]).object);
  assert.ok(as(Promise.resolve()).promise);
  assert.ok(as(Promise.resolve()).object);

  // al
  const al = type.al;
  assert.ok(al(Promise.resolve(), { pr: true, else: false }));
  assert.ok(al(new Number(1.2), { fl: true, else: false }));
  assert.ok(al(new Number(123), { i: true, else: false }));
  assert.ok(al(new Decimal('1.2'), { fl: true, else: false }));
  assert.ok(al(new Decimal('123'), { i: true, else: false }));
  assert.ok(al(new Decimal('1234'), { n: true, else: false }));
  assert.ok(al(Decimal('1.2'), { fl: true, else: false }));
  assert.ok(al(Decimal('123'), { i: true, else: false }));
  assert.ok(al(Decimal('1234'), { n: true, else: false }));
  assert.ok(al(1.2, { fl: true, else: false }));
  assert.ok(al(123, { i: true, else: false }));
  assert.ok(al(1234, { n: true, else: false }));

  // is
  const is = type.is;
  assert.strictEqual(is([]), 'Array');
  assert.strictEqual(is(false), 'Boolean');
  assert.strictEqual(is(true, {l:true}), 'boolean');
  assert.strictEqual(is(new Date()), 'Date');
  assert.strictEqual(is(null), 'Null');
  assert.strictEqual(is(1), 'Number');
  assert.strictEqual(is({}), 'Object');
  assert.strictEqual(is(new B(), { j: '-->' }), 'Object: B-->A-->Object');
  assert.strictEqual(is(new B(), { r: 2, j: '-->' }), 'Object: B-->A');
  assert.strictEqual(is(B, { j: '-->' }), 'Function: Function-->Function-->Object');
  assert.strictEqual(is(B, { d: false, p: '{%s}', j: '-->' }), 'Function: {Function}-->{Object}');
  assert.strictEqual(is(''), 'String');
  assert.strictEqual(is(undefined), 'Undefined');

  // of
  const of = type.of;
  assert.ok(of([], ['Array']));
  assert.ok(of([], /^Array$/i));
  assert.ok(of([], 'Array'));
  //assert.ok(of([]), 'array');

  // ofs
  const ofs = type.ofs;
  //assert.ok(ofs(['a', 'b', 1], ['number', 'string']));

})();