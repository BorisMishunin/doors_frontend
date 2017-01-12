(function() {
  'use strict';

  angular.module('doorsApp').controller('GoodCardController', GoodCardController);

  GoodCardController.$inject = [ '$scope', '$controller', "$location", "goodslistItemsService"];

  function GoodCardController( $scope, $controller, $location, goodslistItemsService) {
    var vm = this;

    vm.good_data =[]

    getItemsType();

    function getItemsType(){
      goodslistItemsService
        .getItemData()
        .then(
          function (result) {
            console.log(vm.filters);
            vm.good_data = result;
          },
          function (result) {
            vm.good_data = [];
          }
        )
    };
  };

})();

