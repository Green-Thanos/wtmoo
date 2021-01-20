module.exports = (function () {
  const learn = new require('express').Router();
  function redirect(endpoint, url) {
    learn.get(endpoint, (req, res) => {
      res.redirect(url);
    });
  }

  redirect('/js', 'https://javascript.info/');
  redirect('/javascript', '/js');

  redirect('/programming', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');
  redirect('/program', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');
  redirect('/coding', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');
  redirect('/code', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');
  
  // Changed from aplet's thing since not all the challenges are up ~grian
  // TODO: change to actual something, this is morre or less placeholder
  redirect('/ctf', 'https://play.picoctf.org/practice');

  redirect('/css', 'https://css-tricks.com/where-do-you-learn-html-css-in-2020/');  
  redirect('/css/grid', 'https://css-tricks.com/snippets/css/complete-guide-grid/');
  redirect('/css/flex', '/css/flexbox');
  redirect('/css/flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/');

  learn.get('/ai', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send('still being determined');
  });

  learn.get('/sql', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send('still being determined');
  });

  // TODO: may change in the future
  redirect('/regex', 'https://regex101.com/');

  // TODO: official guide may not always be the best tutorial
  redirect('/elixir', 'https://elixir-lang.org/getting-started/introduction.html');
  redirect('/ex', '/elixir');
  redirect('/exs', '/elixir');

  redirect('/haskell', 'http:/youahaskell.com/chapters');
  redirect('/hs', '/haskell');

  redirect('/interpreter', 'http://craftinginterpreters.com/contents.html');

  redirect('/compiler/haskell', 'https://www.stephendiehl.com/llvm/'); // 'http://dev.stephendiehl.com/fun/');
  redirect('/compiler/hs', '/compiler/haskell');
  redirect('/compiler/llvm', 'http://llvm.org/docs/tutorial/');

  redirect('/softwareverification', 'https://softwarefoundations.cis.upenn.edu/');
  redirect('/verification', '/softwareverification');

  redirect('/pltheory', 'https://plfa.github.io/');

  redirect('/lean', 'https://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/');

  redirect('/wasm', 'https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format');
  redirect('/wat', '/wasm');

  redirect('/s6', 'https://skarnet.org/software/s6-rc/faq.html');
  redirect('/s6-rc', '/s6');
  redirect('/s6rc', '/s6');
  redirect('/latex', 'https://www.overleaf.com/latex/Tutorials');

  return learn;
})();
