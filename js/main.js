var players = [
  {
    name: "seraphzero",
    color: "E14546",
    wins: 0
  },
  {
    name: "shaldengeki",
    color: "80E7E3",
    wins: 0
  }
];

var battles = [
  {
    winner: "seraphzero",
    date: new Date(2014, 11, 22),
    location: "After getting PSS"
  }
];

$(document).ready(function() {
  // count wins for each player.
  $(battles).each(function(index, battle) {
    $(players).filter(function(index, player) {
      return player.name === battle.winner;
    })[0].wins++;
  });

  // generate score list in dom.
  $(players).each(function(name, player) {
    console.log(player);
    var playerElt = $('<li></li>').attr('class', 'player').attr('id', player.name);

    // color text on hover.
    $(playerElt).hover(function() {
      $(this).css("color", "#" + player.color);
    }, function() {
      $(this).css("color", "white");
    });

    // assemble list of battles that this player has won.
    $(playerElt).click(function() {
      $('#battle-box').hide();
      $('#battles ol').empty();
      // get the player name from this element's ID.
      var player = $(this).attr('id');

      // append battles to list.
      $(battles).filter(function(index, battle) {
        return battle.winner === player;
      }).each(function(index, battle) {
        var battleElt = $('<li></li>').text(battle.date.getMonth() + "/" + battle.date.getDate() + "/" + battle.date.getFullYear() + ": " + battle.location);
        $('#battles ol').append(battleElt);
      });

      if ($('#battles ol').children().length > 0) {
        $('#battle-box').show();
      }
    });

    var scoreElt = $('<div></div>').attr('class', 'score').text(player.wins);
    var nameElt = $('<div></div>').attr('class', 'name').text(player.name);

    playerElt.append(scoreElt);
    playerElt.append(nameElt);
    $('#scores ul').append(playerElt);
  });
});