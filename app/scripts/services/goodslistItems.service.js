(function() {
  'use strict';

  angular
    .module('doorsApp')
    .factory('goodslistItemsService', goodslistItemsService);

    goodslistItemsService.$inject = [ 'MarketItem',
                                    '$state', '$q', '$stateParams'];

    function goodslistItemsService(
      MarketItem, $state, $q, $stateParams) {


      var service = {
        getItems: getItems,
        getItemsType: getItemsType,
        getItemData: getItemData
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

      function getItemData() {
        return MarketItem
          .get_good({ id: $stateParams.goodId}).$promise
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
