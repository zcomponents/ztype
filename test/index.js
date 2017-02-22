#!/usr/bin/env node

'use strict';

const assert = require('assert');
//const Decimal = require('decimal.js'); // npm install decimal.js --save
const zt = require('../');

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

  // like
  assert.strictEqual(zt.like([], true), 'array'); // 'like(array:[])'
  assert.strictEqual(zt.like([]), 'Array'); // 'like(array:[])'
  assert.strictEqual(zt.like(false), 'Boolean'); // 'like(boolean:false)'
  assert.strictEqual(zt.like(true), 'Boolean'); // 'like(boolean:true)'
  assert.strictEqual(zt.like(new Date()), 'Date'); // 'like(date:new Date())'
  //assert.strictEqual(zt.like(Decimal(1 / 2)), 'Object'); // 'like(Decimal:1/2)'
  assert.strictEqual(zt.like(1 / 3), 'Number'); // 'like(float:1/3)'
  assert.strictEqual(zt.like(Math.PI), 'Number'); // 'like(Math.PI)'
  assert.strictEqual(zt.like(null), 'Null'); // 'like(null)'
  assert.strictEqual(zt.like(1), 'Number'); // 'like(number)'
  assert.strictEqual(zt.like({}), 'Object'); // 'like({})'
  assert.strictEqual(zt.like(''), 'String'); // 'like("")'
  assert.strictEqual(zt.like(undefined), 'Undefined'); // 'like(undefined)'
  assert.strictEqual(zt.like(new A()), 'Object');
  assert.strictEqual(zt.like(new B()), 'Object');
  assert.strictEqual(zt.like(new C(1, 2, 3)), 'Array');
  assert.strictEqual(zt.like(new D()), 'Date');

  // pl
  const pl = function(args) {
    return zt.protoList(args).map(function(a) {
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
  assert.ok(zt.as(true).boolean);
  assert.ok(!zt.as(true).object);
  assert.ok(zt.as(new Boolean(true)).boolean);
  assert.ok(zt.as(new Boolean(true)).object);
  assert.ok(zt.as([]).array);
  assert.ok(zt.as([]).object);
  assert.ok(zt.as(Promise.resolve()).promise);
  assert.ok(zt.as(Promise.resolve()).object);

  // al
  const al = zt.al;
  assert.ok(al(Promise.resolve(), { pr: true, else: false }));
  assert.ok(al(new Number(1.2), { fl: true, else: false }));
  assert.ok(al(new Number(123), { i: true, else: false }));
  //assert.ok(al(new Decimal('1.2'), { fl: true, else: false }));
  //assert.ok(al(new Decimal('123'), { i: true, else: false }));
  //assert.ok(al(new Decimal('1234'), { n: true, else: false }));
  //assert.ok(al(Decimal('1.2'), { fl: true, else: false }));
  //assert.ok(al(Decimal('123'), { i: true, else: false }));
  //assert.ok(al(Decimal('1234'), { n: true, else: false }));
  assert.ok(al(1.2, { fl: true, else: false }));
  assert.ok(al(123, { i: true, else: false }));
  assert.ok(al(1234, { n: true, else: false }));
  assert.ok(al(new A(), { cid_A: true, else: false }));
  assert.ok(al(new B(), { cid_A: false, cid_B: true, else: false }));

  // is
  const is = zt.is;
  assert.strictEqual(is([]), 'Array');
  assert.strictEqual(is(false), 'Boolean');
  assert.strictEqual(is(true, {l:true}), 'boolean');
  assert.strictEqual(is(new Date()), 'Date');
  assert.strictEqual(is(null), 'Null');
  assert.strictEqual(is(1), 'Number');
  assert.strictEqual(is({}), 'Object');
  assert.strictEqual(is(new B(), { j: true }), 'Object: B-->A-->Object');
  assert.strictEqual(is(new B(), { r: 2, j: true }), 'Object: B-->A');
  assert.strictEqual(is(B, { j: true }), 'Function: Function-->Function-->Object');
  assert.strictEqual(is(B, { d: false, p: '{%s}', j: '.' }), 'Function: {Function}.{Object}');
  assert.strictEqual(is(''), 'String');
  assert.strictEqual(is(undefined), 'Undefined');
  assert.strictEqual(is((new e()), { j: true }), 'Array: e-->C-->Array-->Object');
  assert.strictEqual(is((new C()), { j: true }), 'Array: C-->Array-->Object');
  assert.strictEqual(is((new e()).__proto__, { j: true }), 'Object: C-->Array-->Object');

  // of
  const of = zt.of;
  assert.ok(of([], ['Array']));
  assert.ok(of([], /^Array$/i));
  assert.ok(of([], 'Array'));
  assert.ok(!of([]));

  // ofs
  const ofs = zt.ofs;
  assert.ok(ofs(['a', 'b', 1, new e()], ['Number', 'String', 'e']));

})();