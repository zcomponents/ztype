# ztype

<p><strong>const zt = require('ztype');</strong></p>

<p>
<ul>
<li>zt.inherit(object, protoLength) -> [proto, proto, ...]</li>
<li>zt.like(element, nameLowerCase) -> elementName</li>
<li>zt.likeAs(element, nameLowerCase) -> elementLikeAsObject</li>
<li>zt.likeAsBack(element, callbackList) -> callbackItem</li>
<li>zt.likeIs(element, options) -> elementNameIs</li>
<li>zt.likeOf(element, name, options) -> elementIsLikeName</li>
<li>zt.likeOfs(elements, name, options) -> elementsAreLikeName</li>
<li>zt.self -> (argument) => argument</li>
<li>zt.in -> zt.inherit</li>
<li>zt.as -> zt.likeAs</li>
<li>zt.ab -> zt.likeAsBack;</li>
<li>zt.is -> zt.likeIs;</li>
<li>zt.of -> zt.likeOf;</li>
</ul>
</p>




Example:

zt.like([]) --> 'array'
zt.like(false) --> 'boolean'
zt.like(true) --> 'boolean'
zt.like(new Date()) --> 'date'
zt.like(null) --> 'null'
zt.like(123) --> 'number'
zt.like({}) --> 'object'
zt.like(/.*/ig) --> 'regexp'
zt.like('text') --> 'string'
zt.like() --> 'undefined'
zt.is(someThing, options) --> (string)'type of someThing'
zt.as(someThing, options) --> (object)
zt.ab(someThing, options) --> (function | value)
zt.of(someThing, options) --> (mixed)
zt.ofs(someThing, options) --> (mixed)

