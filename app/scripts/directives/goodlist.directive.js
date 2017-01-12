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
          type: '=',
          price: '='
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
        console.log(vm.filters);
        if (vm.type)
          vm.filters.type=vm.type;
        vm.getItems();
        vm.getItemsType();
      };

      vm.carouselInitializer2 = function(el) {
        $(el.parent()[0]).owlCarousel({
              navigation: true,
              pagination: false,
              rewind: false,
              items:4,
              loop:true,
              margin:10,
              navigationText: [
                "<i class='fa fa-chevron-left fa-2x'></i>",
                "<i class='fa fa-chevron-right fa-2x'></i>"
              ],
            });
      };

      vm.changeType = function changeType(type){
        console.log(type);
        vm.filters.type = type;
        vm.filters.page = 1;
        vm.getItems();
      };

    }
})();
