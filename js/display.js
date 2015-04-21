'use strict';

RESOLVER.DISPLAY_MODULE = (function(converter){

    return {

        /**
         * Active class resolver method for single object.
         *
         * @param {Object} | elem - single DOM object.
         */
        resolveSingleClass: function(elem){

            (elem.classList.contains('active')) ? elem.classList.remove('active') : elem.classList.add('active');
        },

        /**
         * Active class resolver method for multiple objects.
         *
         * @param {Array} | arr - DOM objects' array.
         */
        resolveMultiClass: function(arr){

            for(var item in arr){

                if(arr.hasOwnProperty(item)) {

                    (arr[item].classList.contains('active')) ? arr[item].classList.remove('active') : arr[item].classList.add('active');
                }
            }
        },

        /**
         * Active class resolver for current player's DOM container.
         *
         * @param {String} | player - current player.
         */
        resolvePlayerActiveClass: function(player){
            var selector    = ['.js-turn-', player].join('');
            var elem        = document.querySelector(selector);

            return function(arr){

                for(var item in arr){

                    if(arr.hasOwnProperty(item)){

                        arr[item].classList.remove('active');

                        if(arr[item] === elem){

                            arr[item].classList.add('active');
                        }
                    }
                }
            };
        },

        /**
         * Active class resolver method for log messages.
         */
        resolveActiveLog: function(){
            var elems   = document.querySelectorAll('.js-log div');
            var length  = elems.length;
            var arr     = new Array(elems.length);

            for(var i = 0; i < length; i++){

                elems[i].classList.remove('active');

                arr[i] = elems[i];

                if(arr.indexOf(arr[i]) === (length - 1)){

                    arr[i].classList.add('active');
                }
            }
        },

        /**
         * Active class resolver method for animating thinking dots.
         */
        resolveThinkAnimation: function(){
            var elems   = document.querySelectorAll('.js-dot');
            var length  = elems.length;

            for(var i = 0; i < length; i++){
                // Remove active class from each element.
                if(elems[i].classList.contains('active')) elems[i].classList.remove('active');
                // Increase timeout for each element respectively.
                this.animTimeout(elems[i], i*400);
            }
        },

        /**
         * Timeout helper method.
         *
         * @param {Object}  | item  - current DOM element.
         * @param {Integer} | delay - timeout delay.
         */
        animTimeout: function(item, delay){

            setTimeout(function(){

                item.classList.add('active');

            }, delay);
        },

        /**
         * Resolver method for restart button text in case of turn still being active.
         *
         * @param {Object} | turn - game turn object. | {Integer}
         */
        turnActive: function(turn){
            var item = document.querySelector('.js-restart');

            (turn.isActive) ? item.innerHTML = 'Wait' : item.innerHTML = 'Restart';
        },

        /**
         * Message logger method.
         * Appends new DOM objects to the log container.
         *
         * @param {String}  | player    - current player.
         * @param {Integer} | total     - total coins amount.
         * @param {Integer} | value     - currently taken amount.
         *
         */
        playerPickMessage: function(player, total, value){
            var selector    = '#js-player-pick';
            var parent      = document.querySelector('.js-log');
            var child       = converter.getLogElement(selector)(player, total, value);

            parent.appendChild(child);

            setTimeout(function(){
                RESOLVER.DISPLAY_MODULE.resolveActiveLog();
            }, 1);
        },

        /**
         * Method for updating current total amount of coins.
         *
         * @param {Integer} | total - total coins amount.
         */
        updateTotalMessage: function(total){
            var elem    = document.querySelector('.js-total');
            var total   = total;
            // If total is a negative number, set it to zero.
            if(total < 0) total = 0;

            var message = this.getTotalMessage(total);

            elem.innerHTML = message;
        },

        /**
         * Resolver method for coins message singular or plural based on the total amount of coins left.
         *
         * @param {Integer} | total - total coins amount.
         * @return {String}
         */
        getTotalMessage: function(total){

            var message = {
                '1': [total, ' coin left.'].join('')
            };

            return (message[total]) ? message[total] : [total, ' coins left.'].join('');
        },

        /**
         * Method for announcing the winner.
         * Switches DOM question text with winner announcement text.
         *
         * @param {String} | winner - winner player.
         */
        showWinnerMessage: function(winner){
            var elem = document.querySelector('.js-question');

            elem.innerHTML = [winner.capitalizeFirstLetter(), ' is the winner!'].join('');
        }
    };

})(RESOLVER.CONVERTER_MODULE);