# ztype

const zt = require('ztype');

zt.inherit(object, protoLength) -> [proto, proto, ...]
zt.like(element, nameLowerCase) -> elementName
zt.likeAs(element, nameLowerCase) -> elementLikeAsObject
zt.likeAsBack(element, callbackList) -> callbackItem
zt.likeIs(element, options) -> elementNameIs
zt.likeOf(element, name, options) -> elementIsLikeName
zt.likeOfs(elements, name, options) -> elementsAreLikeName
zt.self -> (argument) => argument
zt.in -> zt.inherit
zt.as -> zt.likeAs
zt.ab -> zt.likeAsBack;
zt.is -> zt.likeIs;
zt.of -> zt.likeOf;



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

