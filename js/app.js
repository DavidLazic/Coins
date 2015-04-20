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

    /**
     * User's turn method.
     */
    this.userTurn = function(e){
        var me                  = this;
        var gameOver            = this.gameOver();
        var question            = document.querySelector('.js-question');
        var pick                = document.querySelectorAll('.js-pick');
        var pickLength          = pick.length;
        var isCurrentPlayer     = this.isCurrentPlayer();
        var playerContainers    = this.getPlayerContainers();
        // Update total amount of coins DOM message.
        this.display.updateTotalMessage(this.total);
        // Resolve players' DOM containers' active classes.
        var resolveActiveClass = this.display.resolvePlayerActiveClass(this.currentPlayer);
        resolveActiveClass(playerContainers);

        if(gameOver) return false;
        // If click event is present continue.
        if(e){

            for(var i = 0; i < pickLength; i++){
                // Match event target with DOM items and get selected value.
                if(isCurrentPlayer && e.target === pick[i]){

                    var value       = pick[i].getAttribute('data-value');
                    var total       = me.getTotal();
                    var newValue    = total - value;

                    me.display.resolveSingleClass(e.target.parentNode);

                    setTimeout(function(){

                        me.display.resolveSingleClass(e.target.parentNode);
                        me.display.playerPickMessage(me.currentPlayer, me.total, value);
                        me.setTotal(newValue);
                        me.setCurrentPlayer('pc');
                        me.pcTurn();

                    }, 800);
                }
            }
        }
    };

    /**
     * PC's turn method.
     */
    this.pcTurn = function(){
        var me                  = this;
        var gameOver            = this.gameOver();
        var total               = this.getTotal();
        var value               = this.AI.playSmart(total);
        var newValue            = total - value;
        var playerContainers    = this.getPlayerContainers();
        // Update total amount of coins DOM message.
        this.display.updateTotalMessage(this.total);
        // Resolve players' DOM containers' active classes.
        var resolveActiveClass = this.display.resolvePlayerActiveClass(this.currentPlayer);
        resolveActiveClass(playerContainers);

        if(gameOver) return false;
        // Set property to true if it's PC's turn.
        this.isThinking = true;
        // Simulate thinking behaviour with setTimeout.
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

    /**
     * Method for checking game over state.
     *
     * @return {Integer}
     */
    this.gameOver = function(){
        var total   = this.getTotal();
        var winner  = this.getCurrentPlayer();
        // Check if total amount of coins is less or equal to zero and show winner message.
        return (total <= 0) ? (this.display.showWinnerMessage(winner), true) : false;
    };

    /**
     * Method for checking if user is the current player.
     *
     * @return {Integer}
     */
    this.isCurrentPlayer = function(){
        return this.currentPlayer === 'user';
    };

    /**
     * Getter for players' DOM containers.
     *
     * @return {Array}
     */
    this.getPlayerContainers = function(){
        var players     = ['pc', 'user'];
        var containers  = new Array(2);

        for(var i = 0; i < players.length; i++){
            // Create dynamic DOM selector for each item.
            var selector = ['.js-turn-', players[i]].join('');
            var item     = document.querySelector(selector);
            // Add current item to the predefined array.
            containers[i] = item;
        }

        return containers;
    };

    /**
     * Start round method.
     */
    this.startRound = function(){
        var me      = this;
        var newGame = this.newGame;

        var turn = {
            'user'  : this.userTurn,
            'pc'    : this.pcTurn
        };
        // Add click event listener once.
        if(newGame){

            document.addEventListener('click', function(e){
                // If user is the current player, apply corresponding method on click.
                if(me.isCurrentPlayer) turn[me.currentPlayer].apply(me, [e]);

            });
            // Invoke corresponding method on init.
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
