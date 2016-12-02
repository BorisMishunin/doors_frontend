(function(){
  'use strict';

  angular
    .module('doorsApp')
    .directive('goodList', goodList);

    function goodList() {
      var directive = {
        restrict: 'EA',
        templateUrl: function(el, attrs){
          return attrs.templateUrl;
        },
        scope: {
          filters: '=',
          type: '='
        },
        controller: GoodsListController,
        controllerAs: 'vm',
        bindToController: true,
        link: function(scope, el, attrs) {
        }
      }

      return directive;
    }


    GoodsListController.$inject = ['$scope', '$state', '$controller'];

    function GoodsListController($scope, $state, $controller) {

      /////////////////////////////////////////////
      // Init
      /////////////////////////////////////////////

      var vm = this;
      vm.goods = [];

      $controller('BaseController', { vm : vm, $scope : $scope });

      activate();

      function activate() {
        if (vm.type)
          vm.filters.type=vm.type;
        vm.getItems();
      }

    }
})();
