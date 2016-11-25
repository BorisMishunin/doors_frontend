(function() {
  'use strict';

angular.module('doorsApp').controller('GoodsController', GoodsController);

GoodsController.$inject = [ '$scope', 'MarketItem' ];

function GoodsController( $scope, MarketItem ) {
    var vm = this;

    vm.goods = [];
    vm.filters = {};
    vm.itemsLoaded = false;
    vm.totalItems = 0;
    vm.pageMax = 20;
    vm.getItems = getItems;

    getItems();

    function getItems(){
      MarketItem
        .get_goods_list(vm.filters).$promise
        .then(
          function (result) {
            console.log(vm.filters);
            vm.goods = result;
            vm.totalItems = result['count'];
            if (!vm.itemsLoaded) vm.itemsLoaded = true;
          },
          function (result) {
            vm.goods = [];
            vm.totalItems = 0;
            if (vm.itemsLoaded) vm.itemsLoaded = false;
          }
        )
    };
  };

})();
