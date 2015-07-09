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
            $scope.render = "";
            $scope.renderFinal = $sce.trustAsHtml($scope.render);
            $scope.lines = $scope.bookData.split("\\");
            $scope.parsedLines=[];
            $scope.lines.map(function(data){
                var currentTag = $scope.parseUSFM(data.trim());
                console.log(currentTag);
                if ($scope.renderers[currentTag.tag] === undefined){
                    $scope.render=$scope.default(currentTag);
                    $scope.renderFinal=$sce.trustAsHtml($scope.render);
                }else{
                    $scope.render=$scope.renderers[currentTag.tag](currentTag);
                    $scope.renderFinal=$sce.trustAsHtml($scope.render);
                }
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
    $scope.renderers = {
        default: {
            render:function(input){
                return input.text;
            }
        },
        c:{
            render:function(input){
                return "<span class=\"chapter\">" + input.number + "</span>";
            }
        },
        v:{
            render:function(input){
                return "<span class = \"verse\">" + input.number + "</span>" + input.text + " ";
            }
        },
        id:{
            render:function(input){
                return "";
            }
        },
        ide:{
            render:function(input){
                return "";
            }
        },
        toc1:{
            render:function(input){
                return "";
            }
        },
        toc2:{
            render:function(input){
                return "";
            }
        },
        toc3:{
            render:function(input){
                return "";
            }
        },
        mt1:{
            render:function(input){
                return "";
            }
        },

    };
});
