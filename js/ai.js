'use strict';

RESOLVER.AI_MODULE = (function(){

    return {

        /**
         * AI method.
         * Plays with predetermined choices when total gets to specific value.
         *
         * @param {Integer} | total - current total amount of coins.
         * @return {Integer}
         */
        playSmart: function(total){
            var ai = null;

            if(total = 10) ai = total - 9;
            if(total <= 8 && total >= 6) ai = total - 5;
            if(total <= 4 && total >= 2) ai = total - 1;

            return (ai) ? ai : (Math.floor((Math.random() * 3) + 1));
        }
    };

})();

