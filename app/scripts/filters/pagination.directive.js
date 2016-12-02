(function(){
  'use strict';

  angular
    .module('FiltersModule')
    .directive('dPagination', dPagination);

    function dPagination() {
      var directive =  {
        restrict: 'EA',
        templateUrl: function(el, attrs){
          return attrs.templateUrl;
        },

        scope: {
          lang: '=',
          filters: '=',
          pageMax: '=',
          totalItems: '=',
          updateFilterCallback: '&',
        },

        controller: PaginationController,
        controllerAs: 'vm',
        bindToController: true,
        link: function(scope, el, attrs) {
        }
      };

      return directive;
    }


    PaginationController.$inject = [
      '$scope', '$state', '$location', 'DEFAULTS'
    ];

      function PaginationController($scope, $state, $location, DEFAULTS) {

      var vm = this;
      vm.updateFilter = updateFilter;
      vm.changePageSize = changePageSize;


      function updateFilter() {
        $state.go($state.current, vm.filters);
        console.log(vm.filters);
        console.log($state);
        vm.updateFilterCallback();
      }


      function changePageSize(newValue) {
        var oldItemsCount = vm.filters.page * vm.filters.page_size;

        if (oldItemsCount >= vm.totalItems && newValue > vm.totalItems)
          return;

        vm.filters.page = Math.floor(oldItemsCount / newValue) ||
                          DEFAULTS.DEFAULT_PAGINATION_PAGE;
        vm.filters.page_size = newValue;
        updateFilter();
      }

    }

})();
