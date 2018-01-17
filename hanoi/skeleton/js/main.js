const HanoiGame = require("./game");
const HanoiView = require("./hanoi_view");

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
