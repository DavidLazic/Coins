'use strict';

/**
 * Method for creating new Game instance.
 *
 * @param {String} | player - currently chosen player.
 * @return {Object}
 */
var startGame = function(player){

    if(!gGame){

        gGame = new Game({
            total           : 20,
            currentPlayer   : player
        });
    }

    gGame.setCurrentPlayer(player);
    gGame.startRound.apply(gGame, null);
};

/**
 * Method for game restart.
 *
 * @param {Array} | arr - array of DOM container objects.
 * @return void
 */
var restartGame = function(arr){
    var log         = document.querySelector('.js-log');
    var question    = document.querySelector('.js-question');

    if(gGame.isThinking || gGame.turnActive){

        RESOLVER.DISPLAY_MODULE.turnActive({isActive: true});

        return false;
    }

    gGame.newGame = false;
    gGame.isThinking = false;

    gGame.setTotal(20);

    RESOLVER.DISPLAY_MODULE.resolveMultiClass(arr);

    question.innerHTML = 'How many coins will you take?';

    log.innerHTML = '';
};

(function(){
    var elems           = document.querySelectorAll('.js-turn-set');
    var initWrapper     = document.querySelector('.js-init-wrapper');
    var roundWrapper    = document.querySelector('.js-round-wrapper');
    var link            = document.querySelector('.js-link');
    var elemsLength     = elems.length;
    var restart         = document.querySelector('.js-restart');
    var display         = RESOLVER.DISPLAY_MODULE;

    document.addEventListener('click', function(e){

        if(e.target === restart) restartGame([initWrapper, roundWrapper]);

        if(e.target === link) window.location.href = link.getAttribute('href');

        for(var i = 0; i < elemsLength; i++){

            if(e.target === elems[i]){

                var player = elems[i].getAttribute('data-player');

                display.resolveMultiClass([initWrapper, roundWrapper]);
                startGame(player);

            } else{

                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
})();
