'use strict';

RESOLVER.AI_MODULE = (function(){

    return {

        playSmart: function(total){
            var o = {
                '10': 1,
                '9' : 2,
                '8' : 3,
                '7' : 2,
                '6' : 1,
                '5' : 2,
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

