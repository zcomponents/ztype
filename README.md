# ztype

const ztype = require('ztype');
const like = ztype.like;
const is = ztype.is;
const as = ztype.as;
const al = ztype.al;
const of = ztype.of;
const ofs = ztype.ofs;

like(someThing, options) --> (string)'type of someThing'
@options.lower = options.l = (boolean)true
<ul>
	<li>like([]) --> 'array'</li>
	<li>like(false) --> 'boolean'</li>
	<li>like(true) --> 'boolean'</li>
	<li>like(new Date()) --> 'date'</li>
	<li>like(null) --> 'null'</li>
	<li>like(123) --> 'number'</li>
	<li>like({}) --> 'object'</li>
	<li>like(/.*/ig) --> 'regexp'</li>
	<li>like('text') --> 'string'</li>
	<li>like() --> 'undefined'</li>
</ul>

is(someThing, options) --> (string)'type of someThing'

as(someThing, options) --> (object)

al(someThing, options) --> (function | value)

of(someThing, options) --> (mixed)

ofs(someThing, options) --> (mixed)

