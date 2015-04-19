'use strict';

var gGame = gGame || null;

var RESOLVER = RESOLVER || {};

var Game = function(cfg){
    this.total          = cfg.total;
    this.currentPlayer  = cfg.currentPlayer;
    this.isThinking     = false;
    this.newGame        = true;
    this.display        = RESOLVER.DISPLAY_MODULE;
    this.AI             = RESOLVER.AI_MODULE;

    this.userTurn = function(e){
        var me                  = this;
        var gameOver            = this.gameOver();
        var question            = document.querySelector('.js-question');
        var pick                = document.querySelectorAll('.js-pick');
        var pickLength          = pick.length;
        var isCurrentPlayer     = this.isCurrentPlayer();
        var playerContainers    = this.getPlayerContainers();

        this.display.updateTotalMessage(this.total);

        var resolveActiveClass = this.display.resolvePlayerActiveClass(this.currentPlayer);
        resolveActiveClass(playerContainers);

        if(gameOver) return false;

        if(e){

            for(var i = 0; i < pickLength; i++){

                if(isCurrentPlayer && e.target === pick[i]){

                    var value       = pick[i].getAttribute('data-value');
                    var total       = me.getTotal();
                    var newValue    = total - value;

                    me.display.playerPickMessage(me.currentPlayer, me.total, value);
                    me.setTotal(newValue);
                    me.setCurrentPlayer('pc');
                    me.pcTurn();
                }
            }
        }
    };

    this.pcTurn = function(){
        var me                  = this;
        var gameOver            = this.gameOver();
        var total               = this.getTotal();
        var value               = this.AI.playSmart(total);
        var newValue            = total - value;
        var playerContainers    = this.getPlayerContainers();

        this.display.updateTotalMessage(this.total);

        var resolveActiveClass = this.display.resolvePlayerActiveClass(this.currentPlayer);
        resolveActiveClass(playerContainers);

        if(gameOver) return false;

        this.isThinking = true;

        setTimeout(function(){

            if(me.currentPlayer === 'user') return false;

            me.display.playerPickMessage(me.currentPlayer, me.total, value);
            me.setTotal(newValue);
            me.setCurrentPlayer('user');
            me.userTurn();
            me.isThinking = false;
            me.display.isThinking({isThinking: false});

        }, 1500);
    };

    this.gameOver = function(){
        var total   = this.getTotal();
        var winner  = this.getCurrentPlayer();

        return (total <= 0) ? (this.display.showWinnerMessage(winner), true) : false;
    };

    this.isCurrentPlayer = function(){
        return this.currentPlayer === 'user';
    };

    this.getPlayerContainers = function(){
        var players     = ['pc', 'user'];
        var containers  = new Array(2);

        for(var i = 0; i < players.length; i++){

            var selector = ['.js-turn-', players[i]].join('');
            var item = document.querySelector(selector);

            containers[i] = item;
        }

        return containers;
    };

    this.startRound = function(){
        var me      = this;
        var newGame = this.newGame;

        var turn = {
            'user'  : this.userTurn,
            'pc'    : this.pcTurn
        };

        if(newGame){

            document.addEventListener('click', function(e){

                if(me.isCurrentPlayer) turn[me.currentPlayer].apply(me, [e]);

            });

            (turn[this.currentPlayer]) ? turn[this.currentPlayer].apply(this, null) : false;
        }
    };
};

Game.prototype.getTotal = function(){
    return this.total;
}

Game.prototype.getCurrentPlayer = function(){
    return this.currentPlayer;
}

Game.prototype.setTotal = function(total){
    this.total = total;
}

Game.prototype.setCurrentPlayer = function(currentPlayer){
    this.currentPlayer = currentPlayer;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
