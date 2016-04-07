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
                if (currentTag.tag !== "" && currentTag.tag !== null){
                    if ($scope.renderLibrary[currentTag.tag] === undefined){
                        $scope.render+=$scope.renderLibrary["default"].render(currentTag);
                        $scope.renderFinal=$sce.trustAsHtml($scope.render);
                    }else{
                        $scope.render+=$scope.renderLibrary[currentTag.tag].render(currentTag);
                        $scope.renderFinal=$sce.trustAsHtml($scope.render);
                    }
                }
            });

        });
    };
    $scope.parseUSFM = function(input){
        var pattern = /^(\S+) *([\d|-]*) *([\s\S]*)$/;
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
    $scope.renderLibrary = {
        default: {
            render:function(input){
                console.log(input);
                return input.text;
            }
        },
        c:{
            render:function(input){
                return "<br/><span class=\"chapter\">" + input.number + "</span> ";
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
        h:{
            render:function(input){
                return "<h3>" + input.text + "</h3>";
            }
        },

    };
});
