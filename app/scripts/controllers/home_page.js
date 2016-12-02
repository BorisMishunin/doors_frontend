(function() {
  'use strict';

angular.module('doorsApp').controller('HomePageController', HomePageController);

HomePageController.$inject = [ '$scope', 'DoorsMarketplace', '$controller', 'goodslistItemsService' ];

function HomePageController( $scope, DoorsMarketplace, $controller, goodslistItemsService ) {
    var vm = this;

    vm.actions = [];
    vm.goods_types = [];

    getActions();

    function getActions(){
      DoorsMarketplace
        .get_actions(vm.filters).$promise
        .then(
          function (result) {
            vm.actions = result;
          },
          function (result) {
            vm.actions = [];
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
