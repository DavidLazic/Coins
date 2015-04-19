'use strict';

RESOLVER.CONVERTER_MODULE = (function(){

    return {

        getLogElement: function(selector){
            var str         = document.querySelector(selector).innerHTML;
            var htmlObject  = document.createElement('div');

            return function(player, value){

                var regex       = new RegExp(['::', 'value', '::'].join(''), 'g');
                var newStr      = str.replace(regex, value);
                var coinValue   = (value !== 1) ? ' coins.' : ' coin.';

                htmlObject.innerHTML = [player.capitalizeFirstLetter(), ' took ', newStr, coinValue].join('');

                return htmlObject;
            };
        }
    };

})();

