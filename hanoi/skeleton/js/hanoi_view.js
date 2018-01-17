class View {
  constructor(game, $el) {
    this.game = game;
    this.display = $el;
    this.setupTowers();
    this.render();
    this.startIdx = null;
    this.endIdx = null;

    $('ul').on("click", event => {
      console.log(this.startIdx);
      if (this.startIdx === null) {
        this.startIdx = $(event.currentTarget).data('idx');
      } else {
        this.endIdx = $(event.currentTarget).data('idx');

        if (this.game.move(this.startIdx, this.endIdx)) {
          this.startIdx = null;
          this.endIdx = null;
          this.render();

          if (this.game.isWon()) {
            $('ul').off("click");
          }
        } else {
          alert('Invalid Move, Try Again!');
        }

        this.startIdx = null;
        this.endIdx = null;
      }
    });
  }

  setupTowers() {
    for (let i = 0; i < 3; ++i) {
      const $ul = $('<ul></ul>');
      $ul.data('idx', i);
      for (let j = 0; j < 3; j++) {
        const $li = $('<li></li>');
        $ul.append($li);
      }

      this.display.append($ul);
    }
  }

  render() {
    const $uls = $('ul');

    for (let i = 0; i < this.game.towers.length; ++i) {
      for (let j = 0; j < this.game.towers[i].length; ++j) {
        if (this.game.towers[i][j] !== undefined) {
          const discSize = this.game.towers[i][j]-1;

          switch(discSize) {
            case 0:
              const $small = $('small');
              $small.removeClass('show');
              $small.removeClass('small');
              $small.addClass('none');
              $uls.eq(i).children().eq(discSize).removeClass('none');
              $uls.eq(i).children().eq(discSize).addClass('small');
              $uls.eq(i).children().eq(discSize).addClass('show');
              break;
            case 1:
              const $medium = $('medium');
              $medium.removeClass('show');
              $medium.removeClass('medium');
              $medium.addClass('none');
              $uls.eq(i).children().eq(discSize).removeClass('none');
              $uls.eq(i).children().eq(discSize).addClass('medium');
              $uls.eq(i).children().eq(discSize).addClass('show');
              break;
            case 2:
              const $large = $('large');
              $large.removeClass('show');
              $large.removeClass('large');
              $large.addClass('none');
              $uls.eq(i).children().eq(discSize).removeClass('none');
              $uls.eq(i).children().eq(discSize).addClass('large');
              $uls.eq(i).children().eq(discSize).addClass('show');
              break;
          }
        }
      }
    }
  }
}

module.exports = View;
