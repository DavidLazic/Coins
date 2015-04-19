'use strict';

var startGame = function(player){
    var game = new Game({
            total           : 20,
            currentPlayer   : player
        });

    game.startRound.apply(game, null);
};

(function(){

    var elems           = document.querySelectorAll('.js-turn-set');
    var initWrapper     = document.querySelector('.js-init-wrapper');
    var roundWrapper    = document.querySelector('.js-round-wrapper');
    var elemsLength     = elems.length;
    var display         = RESOLVER.DISPLAY_MODULE;

    document.addEventListener('click', function(e){

        for(var i = 0; i < elemsLength; i++){

            if(e.target === elems[i]){

                var player = elems[i].getAttribute('data-player');

                display.resolveActiveClass([initWrapper, roundWrapper]);
                startGame(player);

            } else{

                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
})();
