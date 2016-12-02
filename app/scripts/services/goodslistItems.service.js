(function() {
  'use strict';

  angular
    .module('doorsApp')
    .factory('goodslistItemsService', goodslistItemsService);

    goodslistItemsService.$inject = [ 'MarketItem',
                                    '$state', '$q'];

    function goodslistItemsService(
      MarketItem, $state, $q ) {


      var service = {
        getItems: getItems,
        getItemsType: getItemsType,
      };

      return service;

      function getItems(filters) {
        return MarketItem
          .get_goods_list(filters).$promise
          .then(
            function (result) {
              return result;
            },
            function (result) {
              return $q.reject();
            }
          )
      };

      function getItemsType() {
        return MarketItem
          .get_good_types().$promise
          .then(
            function (result) {
              return result;
            },
            function (result) {
              return $q.reject();
            }
          )
      };


    }

})();
