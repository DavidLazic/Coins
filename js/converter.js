'use strict';

RESOLVER.CONVERTER_MODULE = (function(){

    return {

        /**
         * Converter method for string -> HTML object.
         *
         * @param {String} | selector - DOM selector.
         * @return {Object}
         */
        getLogElement: function(selector){
            var str         = document.querySelector(selector).innerHTML;
            var htmlObject  = document.createElement('div');
            // Create abstract DOM element.
            return function(player, total, value){

                var regex = new RegExp(['::', 'value', '::'].join(''), 'g');
                var value = value;
                // If taken coins value is greater than total amount, calculate the total that can be taken.
                if(value > total) value = value - total;
                // Replace DOM string with new value.
                var newStr = str.replace(regex, value);
                // Semantics.
                var coinValue = (value !== 1) ? ' coins.' : ' coin.';
                // Set newly created object's inner HTML.
                htmlObject.innerHTML = [player.capitalizeFirstLetter(), ' took ', newStr, coinValue].join('');

                return htmlObject;
            };
        }
    };

})();

