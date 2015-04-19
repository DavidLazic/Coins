'use strict';

RESOLVER.DISPLAY_MODULE = (function(converter){

    return {

        resolveMultiClass: function(arr){

            for(var item in arr){

                if(arr.hasOwnProperty(item)) {

                    (arr[item].classList.contains('active')) ? arr[item].classList.remove('active') : arr[item].classList.add('active');
                }
            }
        },

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

        playerPickMessage: function(player, total, value){
            var selector    = '#js-player-pick';
            var parent      = document.querySelector('.js-log');
            var child       = converter.getLogElement(selector)(player, total, value);

            parent.appendChild(child);
        },

        updateTotalMessage: function(total){
            var elem    = document.querySelector('.js-total');
            var total   = total;

            if(total < 0) total = 0;

            var message = this.getTotalMessage(total);

            elem.innerHTML = message;
        },

        getTotalMessage: function(total){

            var message = {
                '1': ['There is ', total, ' coin left.'].join('')
            };

            return (message[total]) ? message[total] : ['There are ', total, ' coins left.'].join('');
        },

        showWinnerMessage: function(winner){
            var elem = document.querySelector('.js-question');

            elem.innerHTML = [winner.capitalizeFirstLetter(), ' is the winner!'].join('');
        },

        showRestart: function(){
            var elem = document.querySelector('.js-restart');

            elem.classList.add('btn-active');
        }
    };

})(RESOLVER.CONVERTER_MODULE);