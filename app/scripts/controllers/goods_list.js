'use strict';

app =  angular.module('doorsApp')

app.controller('GoodsController', ['$scope', 'MarketItem', function($scope, MarketItem){
  
  $scope.good_object = new MarketItem();
  
  $scope.good_object
    .$get_goods_list()
    .then(
      function (goods) {
        $scope.goods = goods;        
      }  
    );

}]);
