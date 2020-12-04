/* globals html, title, text, heading, subheading, list, block, link */
html(
title`wtmoo is a compiler`,
heading`compilers`,
text`hi this is how to make good compiler
so you have your code as a string and you want to compile it.
but wtmoo??? how???`,
text`there are four main steps in compilation:`,
list(
link('lexing','./lexer'),
link('parsing','./parser'),
link('analyzing','./analyzer'),
link('and generating.','./generator'),
text(link('ide integration','./langserver'), ' is also part of the language but not really part of compilation'),
),
text(`we will be making a simple c-like language. ${link('here', './spec')} is the specification of the language - click there to get started`) 
)
