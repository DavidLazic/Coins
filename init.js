'use strict';

var gGame = gGame || null;

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

var restartGame = function(arr){
    var log         = document.querySelector('.js-log');
    var question    = document.querySelector('.js-question');

    if(gGame.isThinking){

        RESOLVER.DISPLAY_MODULE.isThinking({isThinking: true});

        return false;
    }

    localStorage.setItem('newGame', true);

    gGame.setTotal(20);

    RESOLVER.DISPLAY_MODULE.resolveMultiClass(arr);

    question.innerHTML = 'How many coins will you take?';

    log.innerHTML = '';
};

(function(){
    var elems           = document.querySelectorAll('.js-turn-set');
    var initWrapper     = document.querySelector('.js-init-wrapper');
    var roundWrapper    = document.querySelector('.js-round-wrapper');
    var elemsLength     = elems.length;
    var restart         = document.querySelector('.js-restart');
    var display         = RESOLVER.DISPLAY_MODULE;

    localStorage.removeItem('newGame');

    document.addEventListener('click', function(e){

        if(e.target === restart) restartGame([initWrapper, roundWrapper]);

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
