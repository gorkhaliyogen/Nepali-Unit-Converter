app.directive("massGsConverter",function(){
	return{
		restrict:'A',
		replace:false,
		scope:true,
		templateUrl:'Scripts/App/Templates/mass-gs-converter-template.html',
		controller:function($scope,mathService){
			$scope.tolaToGram=11.66;
			$scope.tola="";
			$scope.gram="";
			$scope.kiloGram="";
			$scope.calculateFromGram=function(){
				var gram=$scope.gram;
				$scope.kiloGram=mathService.round(gram/1000,$scope.noAfterDecimal);
				$scope.tola=mathService.round(gram/$scope.tolaToGram,$scope.noAfterDecimal);
			}
			$scope.calculateFromKiloGram=function(){
				var kiloGram=$scope.kiloGram;
				$scope.gram=mathService.round(kiloGram*1000,$scope.noAfterDecimal);
				$scope.tola=mathService.round((kiloGram*1000)/$scope.tolaToGram,$scope.noAfterDecimal);
			}
			$scope.calculateFromTola=function(){
				var tola=$scope.tola;
				$scope.gram=mathService.round(tola*$scope.tolaToGram,$scope.noAfterDecimal);
				$scope.kiloGram=(tola*$scope.tolaToGram)/1000;
			}
		}
		
	}
});
