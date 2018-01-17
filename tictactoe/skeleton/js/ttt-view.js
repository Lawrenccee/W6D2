class View {
  constructor(game, $el) {
    this.game = game;
    this.display = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('li').on("click", event => {
      if (!this.game.board.isEmptyPos($(event.currentTarget).data('pos'))) {
        alert('Is not valid position!');
      }
      this.makeMove($(event.currentTarget));
    });

  }

  makeMove($square) {
    const mark = this.game.currentPlayer;
    const $div = $('<div></div>');
    $div.text(mark);
    $div.addClass('center');
    this.game.playMove($square.data('pos'));
    $square.removeClass("square-initial");
    $square.addClass("square-clicked");
    $square.append($div);

    if (this.game.isOver()) {
      $('li').off("click");

      const $over = $('<h1></h1>');
      $over.addClass("center");

      if (this.game.winner()) {
        $over.text(`You win, ${mark}!`);

        const $lis = $('li');
        $lis.each((_, li) => {
          console.log($(li).children().eq(0));
          if ($(li).children().eq(0).text() === mark) {
            $(li).removeClass("square-clicked");
            $(li).addClass("square-winner");
          } else {
            $(li).removeClass("square-clicked");
            $(li).addClass("square-loser");
            $(li).removeClass('square-initial');
          }
        });

      } else {
        $over.text("It's a draw!");
        $('li').removeClass("square-clicked");
        $('li').addClass("square-loser");
      }

      this.display.append($over);
    }
  }

  setupBoard() {
    const $ul = $('<ul></ul>');
    $ul.addClass('grid');

    for (let i = 0; i < 3; ++i) {
      for(let j = 0; j < 3; ++j) {
        const $li = $('<li></li>');
        $li.addClass('square-base square-initial');
        $li.data('pos', [i, j]);
        $ul.append($li);
      }
    }

    this.display.append($ul);
  }
}


module.exports = View;


// View.prototype.addRow = function() {
//   const rowIdx = this.$el.find(".row").length;
//   const $row = $("<ul>").addClass("row").addClass("group");
//   for(let colIdx = 0; colIdx < 20; colIdx++) {
//     const $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);
//     $square.on("mouseenter", (e) => {
//       const $square = $(e.currentTarget);
//       $square.css("background-color", window._randomColorString());
//     });
//     $row.append($square);
//   }
//   this.$el.append($row);
// };
