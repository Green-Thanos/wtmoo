/* globals html, title, text, heading, subheading, list, block, c, link */
html(
title`wtmoo is wtc`,
text`wtc is a simple language. that is all`,
heading`types`,
list(
// TODO: link
text(c.type`Bool`, ` - boolean. this is an enum, we just need it so we can have equality in the stdlib`),
text(c.type`Int`, ` - 64 bit integer`),
text(c.type`Char`, ` - ascii character. utf-8 is a lot of added complexity`),
text(c.type`List(T)`, ` - a generic type for ordered collections`),
text(c.type`Dict(TKey, TVal)`, ` - a generic type for collections looked up by key`),
)
)