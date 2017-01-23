'use strict';

/*

 var x = new Promise(function(){});
 console.log(of(/asd/i));
 console.log(is(x, ' --> ', ''));
 console.log(of(x));
 console.log(of(x).class('promise'));
 console.log(of(x).super('promise'));
 console.log(of(x).class('object'));
 console.log(of(x).super('object'));

 */
function A (a, b){
	let A = a, B = b;
	this.getA = function(){
		return A;
	};
	this.getB = function(){
		return B;
	};
};

class B extends A {
	constructor(a, b, bb){
		super(a, b);
		this.bb = bb;
	}
};

var a = new A(1, 2), oa = of(a);
console.log(oa.type, oa.class);
var b = new Promise(() => 1), ob = of(b);
console.log(ob.type, ob.class);
console.log('---');
/*
 console.log(is(A));
 console.log(is(A.prototype));
 console.log(is(B));
 console.log(is(B.prototype));
 console.log(is(new A(1, 2), {depth: 1}));
 console.log(is(new B(1, 2, 4)));
 /*
 function C(c){
 this.c = c;
 }
 A.prototype.__proto__ = new C();
 //A.__proto__ = new C();
 console.log(that2type(new A(1, 2)));

 console.log('---1');
 console.log(that2type(123), 123);
 console.log(that2type(Number(123)), Number(123));
 console.log(that2type('123'), '123');
 console.log(that2type(String(123)), String(123));
 console.log(that2type(undefined), undefined);
 console.log(that2type(null), null);
 console.log(that2type([]), []);
 console.log(that2type({}), {});
 console.log('---2');
 console.log(that2type(true), true);
 console.log(that2type(false), false);
 console.log('---3');
 console.log(that2type(A), A);
 console.log(that2type(B), B);
 var a = new A(123, '123');
 var b = new B(123, '123', new Date());
 console.log('---4');
 console.log(that2type(a));
 console.log(a);
 console.log(that2type(b));
 console.log(b);
 console.log(b.getA()+1);
 console.log(b.getB()+1);
 console.log('---5');
 */
