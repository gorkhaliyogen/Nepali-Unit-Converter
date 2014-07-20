app.directive("massOtherConverter",function(){
	return{
		restrict:'A',
		replace:false,
		scope:true,
		templateUrl:'Scripts/App/Templates/mass-other-converter-template.html',
		controller:function($scope,mathService){
			$scope.paauToGram=200;
			$scope.paau="";
			$scope.bisauli="";
			$scope.dharni="";
			$scope.sher="";
			$scope.gram="";
			$scope.kiloGram="";
			$scope.calculateFromGram=function(){
				var gram=$scope.gram;
				$scope.kiloGram=gram/1000;
				$scope.paau=mathService.round(gram/$scope.paauToGram,$scope.noAfterDecimal);
				$scope.bisauli=mathService.round(gram/($scope.paauToGram*6),$scope.noAfterDecimal);
				$scope.sher=mathService.round(gram/($scope.paauToGram*4),$scope.noAfterDecimal);
				$scope.dharni=mathService.round(gram/($scope.paauToGram*12),$scope.noAfterDecimal);
			}
			$scope.calculateFromKiloGram=function(){
				var kiloGram=$scope.kiloGram;
				$scope.gram=kiloGram*1000;
				$scope.paau=mathService.round((kiloGram*1000)/$scope.paauToGram,$scope.noAfterDecimal);
				$scope.bisauli=mathService.round((kiloGram*1000)/($scope.paauToGram*6),$scope.noAfterDecimal);
				$scope.sher=mathService.round((kiloGram*1000)/($scope.paauToGram*4),$scope.noAfterDecimal);
				$scope.dharni=mathService.round((kiloGram*1000)/($scope.paauToGram*12),$scope.noAfterDecimal);
			}
		}
		
	}
});
