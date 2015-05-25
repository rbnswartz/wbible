angular.module("app",[]);
angular.module("app").controller("controller",function($scope,$http,$sce){
    $scope.index={};
    $http.get("https://api.unfoldingword.org/uw/txt/2/catalog.json").success(function(data){
        $scope.index=data;
    });
    $scope.getBook=function(book){
        $scope.bookData = "Loading...";
        $http.get(book.src).success(function(data){
            $scope.bookData = data;
        });
    }
});
