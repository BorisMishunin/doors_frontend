(function() {
  'use strict';

angular.module('doorsApp').controller('GoodsController', GoodsController);

GoodsController.$inject = [ '$scope', '$controller' ];

function GoodsController( $scope, $controller ) {
    var vm = this;
    vm.filters = [];
      
  };

})();
