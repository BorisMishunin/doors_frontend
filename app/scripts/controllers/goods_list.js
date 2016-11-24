'use strict';

angular.module('doorsApp')
.app.controller('GoodsController', GoodsController);

AuctionsController.$inject = [ '$scope', 'MarketItem' ];

function AuctionsController( $scope, MarketItem ) {
   var vm = this;

  vm.goods = MarketItem
    .get_goods_list().$promise
    .then(
      function (result) {
        return  result;
        
      }
    )
};
