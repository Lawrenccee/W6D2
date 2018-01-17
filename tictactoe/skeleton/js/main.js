const View = require('./ttt-view');// require appropriate file
const Game = require('../../solution/game');// require appropriate file

$( () => {
  // Your code here
  const game = new Game();
  let $figure = $('figure.ttt');
  let view = new View(game, $figure);
  // let $view = view.setupBoard();
  // $figure.append($view);
  // console.log($view);
});
