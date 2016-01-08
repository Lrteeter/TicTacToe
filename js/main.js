var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var $board = $('.ttt');
  var newGame = new Game();

  new View(newGame, $board);
});
