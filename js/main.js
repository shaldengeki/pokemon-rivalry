function showBattles(battles, player) {
  $('#battle-box').hide();
  $('#battles ol').empty();

  // append battles to list.
  $(battles).filter(function(index, battle) {
    return battle.winner === player;
  }).each(function(index, battle) {
    var battleElt = $('<li></li>').text(battle.date + ": " + battle.location);
    $('#battles ol').append(battleElt);
  });

  if ($('#battles ol').children().length > 0) {
    $('#battle-box').show();
  }
}

$(document).ready(function() {
  var battles = [];
  var players = [];

  // TODO: show something before datafiles have loaded.

  $.when($.getJSON('data/players.json', function(data) {
    players = data;
  }), $.getJSON('data/battles.json', function(data) {
    battles = data;
  })).done(function() {
    // create basic structure of the page.
    var scoreBoxElt = $('<section></section>').attr('id', 'score-box');
    var scoresElt = $('<div></div>').attr('id', 'scores').attr('class', 'section-inner');
    scoresElt.append($('<ul></ul>'));
    scoreBoxElt.append(scoresElt);
    $('body').append(scoreBoxElt);

    var battleBoxElt = $('<section></section>').attr('id', 'battle-box');
    var battlesElt = $('<div></div>').attr('id', 'battles').attr('class', 'section-inner');
    battlesElt.append($('<ol></ol>'));
    battleBoxElt.append(battlesElt);
    $('body').append(battleBoxElt);

    // count wins per player.
    $(battles).each(function(index, battle) {
      $(players).filter(function(index, player) {
        return player.name === battle.winner;
      })[0].wins++;
    });

    // generate score list in dom.
    $(players).each(function(name, player) {
      var playerElt = $('<li></li>').attr('class', 'player').attr('id', player.name);

      // color text on hover.
      $(playerElt).hover(function() {
        $(this).css("color", "#" + player.color);
      }, function() {
        $(this).css("color", "white");
      });

      // assemble list of battles that this player has won.
      $(playerElt).click(function() {
        // get the player name from this element's ID.
        var player = $(this).attr('id');
        showBattles(battles, player);
      });

      var scoreElt = $('<div></div>').attr('class', 'score').text(player.wins);
      var nameElt = $('<div></div>').attr('class', 'name').text(player.name);

      playerElt.append(scoreElt);
      playerElt.append(nameElt);
      $('#scores ul').append(playerElt);
    });
  }, function() {
    // one or more of the calls failed.
    // TODO: show an error message.
  });
});