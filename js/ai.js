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

            var o = {
                '10': 1,
                '8' : 3,
                '7' : 2,
                '6' : 1,
                '4' : 3,
                '3' : 2,
                '2' : 1,
            };

            if(o[total]){

                return o[total];

            } else{

                return (Math.floor((Math.random() * 3) + 1));
            }
        }
    };

})();

