'use strict';

var app = angular.module('doorsApp', ['ui.bootstrap',
                                      'ui.router',
                                      'ngRoute',
                                      'MarketService']);


app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('goodsList', {
      url: "",
      templateUrl: "goods_list.html",
      controller: "GoodsController",
      controllerAs: 'vm',
      title: 'Купить Дверь'
    });
  }]);


