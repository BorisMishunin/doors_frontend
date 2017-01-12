'use strict';

var app = angular.module('doorsApp', ['ui.bootstrap',
                                      'ui.router',
                                      'ngRoute',
                                      'MarketService',
                                      'FiltersModule',
                                      'ocNgRepeat']);


app.config(['$stateProvider', function ($stateProvider) {

  var FILTERS_URL_PARAMS = "page_size&type&page";

  $stateProvider
    .state('goodsList', {
      url: "/goods?" + FILTERS_URL_PARAMS,
      reloadOnSearch: false,
      templateUrl: "goods_page.html",
      controller: "GoodsController",
      controllerAs: 'vm',
      title: 'Купить Дверь'
    })
    .state('goodCard', {
      url: "/good/:goodId",
      reloadOnSearch: false,
      templateUrl: "good_card.html",
      controller: "GoodCardController",
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


