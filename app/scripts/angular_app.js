'use strict';

var app = angular.module('doorsApp', ['ui.bootstrap',
                                      'ui.router',
                                      'ngRoute',
                                      'MarketService',
                                      'FiltersModule']);


app.config(['$stateProvider', function ($stateProvider) {

  var FILTERS_URL_PARAMS = "page";

  $stateProvider
    .state('goodsList', {
      url: "/:goodType?" + FILTERS_URL_PARAMS,
      reloadOnSearch: false,
      templateUrl: "goods_list.html",
      controller: "GoodsController",
      controllerAs: 'vm',
      title: 'Купить Дверь'
    });
  }]);


