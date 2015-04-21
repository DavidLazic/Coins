'use strict';

RESOLVER.AI_MODULE = (function(){

    return {

        /**
         * AI method.
         *
         * @param {Integer} | total - current total amount of coins.
         * @return {Integer}
         */
        playSmart: function(total){
            var random      = Math.floor((Math.random() * 3) + 1);
            var breakpoints = this.getBreakpoints(4);
            var picks       = this.getPicks(3);
            var map         = this.getMap(breakpoints, picks);

            return (map[total]) ? map[total] : random;
        },

        /**
         * Get pick breakpoints.
         *
         * @param {Integer} | max - maximum number and value of breakpoints.
         * @return {Array}
         */
        getBreakpoints: function(max){
            var breakpoints = new Array(max);
            var breakpoint  = 0;

            for(var i = 0; i < max; i++){

                breakpoint += 4;

                breakpoints[i] = breakpoint;
            }

            return breakpoints.reverse();
        },

        /**
         * Get picks.
         *
         * @param {Integer} | max - maximum number and value of picks.
         * @return {Array}
         */
        getPicks: function(max){
            var picks = new Array(max);

            for(var i = 0; i < max; i++){

                picks[i] = i + 1;
            }

            return picks.reverse();
        },

        /**
         * Make object map for the breakpoints and picks.
         *
         * @param {Array} | breakpoints - pick breakpoints.
         * @param {Array} | picks       - picks value.
         * @return {Object}
         */
        getMap: function(breakpoints, picks){
            var o = {};

            for(var bp in breakpoints){

                if(breakpoints.hasOwnProperty(bp)){

                    var index = breakpoints[bp];

                    for(var i = 0; i < picks.length; i++){

                        o[index] = picks[i];

                        index--;
                    }
                }
            }

            return o;
        }
    };

})();

