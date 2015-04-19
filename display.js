'use strict';

RESOLVER.DISPLAY_MODULE = (function(converter){

    return {

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
         * Resolver method for restart button text in case of when PC's turn is still ongoing.
         *
         * @param {Object} | pc - current player object. | {Integer}
         */
        isThinking: function(pc){
            var item = document.querySelector('.js-restart');

            (pc.isThinking) ? item.innerHTML = 'Wait' : item.innerHTML = 'Restart';
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
                '1': ['There is ', total, ' coin left.'].join('')
            };

            return (message[total]) ? message[total] : ['There are ', total, ' coins left.'].join('');
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