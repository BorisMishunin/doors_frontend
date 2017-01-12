(function() {
  'use strict';

angular.module('doorsApp').controller('BaseController', BaseController);

BaseController.$inject = ['vm', '$scope', 'MarketItem', 'goodslistItemsService'];

function BaseController(vm, $scope, MarketItem, goodslistItemsService) {

    vm.goods = [];
    vm.itemsLoaded = false;
    vm.totalItems = 0;
    vm.pageMax = 20;
    vm.getItems = getItems;
    vm.getItemsType = getItemsType;
    vm.goods_types = [];
  
    function getItems(){
      goodslistItemsService
        .getItems(vm.filters)
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
  
  getItemsType();

    function getItemsType(){
      goodslistItemsService
        .getItemsType()
        .then(
          function (result) {
            console.log(vm.filters);
            vm.goods_types = result;
          },
          function (result) {
            vm.goods_types = [];
          }
        )
    };

  };

})();
