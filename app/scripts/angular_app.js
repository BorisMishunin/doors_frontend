var app = angular.module('doorsApp', ['ui.bootstrap']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
});

/*app.directive('goods_hover', function(){
        return function($scope, $element){
            alert('hh');
            $element.on('click',function(){
                alert('hh');
          //$(this).children().toggle();
        });
    };
});*/

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

app.controller('GoodCardController', function($scope, $http){
    $http.get('/api/goods/360.json').success(function(data){
        $scope.good = data;
    });
});

app.controller('DoorsController', function($scope, $http){
    $http.get('/api/goods.json').success(function(data){
       $scope.goods = data;
    });
    $http.get('/api/actions.json').success(function(data){
       $scope.actions = data;
    });
    
    $scope.filters = [];
    
    $http.get('/api/properties.json').success(function(data){
       $scope.filters = data;
    });
    
    $http.get('/api/goods_colors.json').success(function(data){
       $scope.colors = data;
    });
    
    $scope.maxSize = 5;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.entryLimit = 9;
    /*var filter = {};
    filter.name = 'Цвета';
    filter.property_values = [];
    _.each($scope.colors, function(color){
        filter.property_values.push({
            value: color.color 
        });
    });
    
    $scope.filters.push(filter);
    
    console.log($scope.filters);*/
    
    $scope.doorHover = function($event){
        target = $event.target
        if (target.className.indexOf('good_card')<0)
            target = target.offsetParent;
        descfield = angular.element(target.querySelector('.desc'));
        if ($event.type=="mouseover")
            descfield.removeClass('good-desc');
        else
            descfield.addClass('good-desc');            
    };
    
    
    
     $scope.$watch(function(){
            $scope.filteredItems = $scope.$eval("goods|GoodsFilter:filters");
            $scope.totalItems = $scope.filteredItems.length;
        });
    
    
});

app.filter('PanginationFilter', function($scope){
    return function(goods, currPage, scope){
        console.log(scope.bigTotalItems);
        return goods;
    };
});

app.filter('GoodsFilter', function(){
    return function(goods, filters){
        var filtered = [];
        
        var include_filters = _.filter(filters, function(filter){
            return _.any(filter.property_values, {'IsIncluded':true})
        });
        
        
        
        _.each(goods, function(good){
            var is_included = true;
            _.each(include_filters, function(filter){
                var properties = _.filter(good.goods_properties, {'property': filter.name}); 
                if(! _.any(properties, function(prop){return _.any(filter.property_values, {'value': prop.value, 'IsIncluded':true});})){
                    is_included = false;
                };
            });
            if (is_included){
                filtered.push(good);
            }
        });
        
        
        return filtered;
    };
});

app.controller('ColorsController', function($scope, $http){
    $scope.showImage = function(color_id){   
        $http.get('/api/goods_images/'+color_id+'.json').success(function(data){
            $scope.mainImage = data[0].image;
        }); 
    };
});

app.directive('goodCard', function($scope){
    
});