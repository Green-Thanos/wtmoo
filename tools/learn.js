module.exports = function ({app}) {
  function redirect(endpoint, url) {
    app.get(endpoint, (req, res) => {
      res.redirect(url);
    });
  }
  
  redirect('/learn/js', 'https://javascript.info/');
  redirect('/learn/javascript', '/learn/js');

  redirect('/learn/programming', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');

  redirect('/learn/css', 'https://css-tricks.com/where-do-you-learn-html-css-in-2020/');
  redirect('/learn/css/grid', 'https://css-tricks.com/snippets/css/complete-guide-grid/');
  redirect('/learn/css/flex', '/learn/css/flexbox');
  redirect('/learn/css/flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/');

  app.get('/learn/ai', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send('still being determined');
  });

  app.get('/learn/sql', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send('still being determined');
  });

  // TODO: may change in the future
  redirect('/learn/regex', 'https://regex101.com/');

  // TODO: official guide may not always be the best tutorial
  redirect('/learn/elixir', 'https://elixir-lang.org/getting-started/introduction.html');
  redirect('/learn/ex', '/learn/elixir');
  redirect('/learn/exs', '/learn/elixir');

  redirect('/learn/haskell', 'http://learnyouahaskell.com/chapters');
  redirect('/learn/hs', '/learn/haskell');

  redirect('/learn/interpreter', 'http://craftinginterpreters.com/contents.html');

  redirect('/learn/compiler/haskell', 'https://www.stephendiehl.com/llvm/'); // 'http://dev.stephendiehl.com/fun/');
  redirect('/learn/compiler/hs', '/learn/compiler/haskell');
  redirect('/learn/compiler/llvm', 'http://llvm.org/docs/tutorial/');

  redirect('/learn/softwareverification', 'https://softwarefoundations.cis.upenn.edu/');
  redirect('/learn/verification', '/learn/softwareverification');

  redirect('/learn/pltheory', 'https://plfa.github.io/');

  redirect('/learn/lean', 'https://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/');

  redirect('/learn/wat', 'https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format');
}