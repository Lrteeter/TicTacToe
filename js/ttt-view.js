var View = function (game, $el) {
  this.$board = $el;
  this.game = game;
  this.setupBoard();
  this.bindEvents();
};
var alerts = function(){
  alert('hi');
};

View.prototype.bindEvents = function () {
  var tiles = this.$board.find('li');
  tiles.on('click', this.clickMade.bind(this));
  tiles.hover(this.mouseIn.bind(this), this.mouseOut.bind(this));

};

View.prototype.makeMove = function ($square) {
  var string = ($square.attr("id")).split(',');
  var array = [parseInt(string[0]), parseInt(string[1])];
  if (this.game.board.isEmptyPos(array)) {
    var mark = this.game.currentPlayer;
    $square.text(mark);
    $square.attr('class', 'marked');
    this.game.playMove(array);
  }
  if (this.game.board.isOver()) {
    this.endGame(mark);
  }
}

View.prototype.endGame = function(mark) {
  if (this.game.board.winner() === null) {
    var $message = $('.message').text('Game over!  Tie game');
  } else {
    var $message = $('.message').text('Game over!  ' + mark.toUpperCase() + '  is the winner!');
  }
  $('li').off();
};


View.prototype.setupBoard = function () {
  _.times(3, function(rowNum){
    console.log(rowNum);
    var $row = $('<ul>');
      _.times(3, function(columnNum){
        var $cell = $('<li>').attr('id', [rowNum, columnNum]);
        $row.append($cell);
      });
    this.$board.append($row);
  }.bind(this));
};

View.prototype.clickMade = function (e) {
  this.makeMove($(e.target));
};

View.prototype.mouseIn = function (e) {
  $(e.target).css('background', 'yellow');
};

View.prototype.mouseOut = function (e) {
  $(e.target).css('background', 'gray');
};




module.exports = View;
