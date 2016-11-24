'use strict';

var marketService = angular.module("MarketService", ['ngResource']);

marketService.factory('MarketItem', ['$resource', function ($resource) {
  return $resource(
    "/api/goods/:action/:id",
    {
      action: '@action',
      id: '@id'
    },
    {
      get_goods_list: {
        method: 'GET',
        isArray: false,
        params: {
          action: 'getItems'
        }
      },

      get_good: {
        method: 'GET',
        params: {
          action: 'getItem'
        }
      }
    },
    {
      stripTrailingSlashes: false
    }
  )
}]);
