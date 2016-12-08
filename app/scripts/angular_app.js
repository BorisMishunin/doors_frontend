'use strict';

var app = angular.module('doorsApp', ['ui.bootstrap',
                                      'ui.router',
                                      'ngRoute',
                                      'MarketService',
                                      'FiltersModule',
                                      'ocNgRepeat']);


app.config(['$stateProvider', function ($stateProvider) {

  var FILTERS_URL_PARAMS = "page";

  $stateProvider
    .state('goodsList', {
      url: "/:goodType?" + FILTERS_URL_PARAMS,
      reloadOnSearch: false,
      templateUrl: "goods_page.html",
      controller: "GoodsController",
      controllerAs: 'vm',
      title: 'Купить Дверь'
    })
  .state('homePage', {
      url: "",
      reloadOnSearch: false,
      templateUrl: "home_page.html",
      controller: "HomePageController",
      controllerAs: 'vm',
      title: 'Купить Дверь'
    });
  }]);


