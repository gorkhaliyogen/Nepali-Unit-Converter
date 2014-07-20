var app = angular.module("app",[])
.run(function($rootScope){
	$rootScope.noDecimal=["1","2","3","4","5","6"];
	$rootScope.noAfterDecimal=$rootScope.noDecimal[3];
});

