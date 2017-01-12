(function() {
  'use strict';

  angular.module('doorsApp').controller('GoodsController', GoodsController);

  GoodsController.$inject = [ '$scope', '$controller', "$location", "goodslistItemsService"];

  function GoodsController( $scope, $controller, $location, goodslistItemsService) {
    var vm = this;
    vm.filters = [];

    vm.filters = $location.search();
    vm.filters.page_size = vm.filters.page_size || 30;
    vm.goods_types = []
    

    

  };

})();

