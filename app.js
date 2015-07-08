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
            $scope.lines = $scope.bookData.split("\\");
            $scope.parsedLines=[];
            $scope.lines.map(function(data){
                var tmp = $scope.parseUSFM(data.trim());
                console.log(tmp);
                $scope.parsedLines.push(tmp);
            });
        });
    };
    $scope.parseUSFM = function(input){
        var pattern = /^(\S+) *(\d*) *([\s\S]*)$/;
        var result = pattern.exec(input);
        if (result === null){
            return {
                tag: null,
                number: null,
                text: null 
            };
        }else{
        
        }
        return {
            tag: result[1],
            number: result[2],
            text: result[3]
        };
    };
});
