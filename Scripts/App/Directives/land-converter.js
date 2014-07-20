app.directive("landConverter", function () {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: 'Scripts/App/Templates/land-converter-template.html',
        controller: function ($scope,areaService,mathService) {
            $scope.ropani = "";
            $scope.aana = "";
            $scope.paisa = "";
            $scope.daam = "";
            $scope.sqFeet = "";
            $scope.sqMeter = "";
            $scope.bigaha = "";
            $scope.kathha = "";
            $scope.dhur = "";
			$scope.hector="";
			$scope.acre="";
            $scope.putRAPD = function (rapdArea) {
                $scope.ropani = rapdArea.ropani;
                $scope.aana = rapdArea.aana;
                $scope.paisa = rapdArea.paisa;
                $scope.daam = rapdArea.daam;
            }
            $scope.putBKD = function (bkdArea) {
                $scope.bigaha = bkdArea.bigaha;
                $scope.kathha = bkdArea.kathha;
                $scope.dhur = bkdArea.dhur;
            }
            $scope.convertRAPDToSqFt = function (ropani, aana, paisa, daam) {
                var area=areaService.RAPDToSqFt(ropani, aana, paisa, daam);
                return mathService.round(area,$scope.noAfterDecimal);
            }
			$scope.convertRAPDToAcre = function (ropani, aana, paisa, daam) {
                var area=areaService.RAPDToSqFt(ropani, aana, paisa, daam);
				area=area/43560;
                return mathService.round(area,$scope.noAfterDecimal);
            }
            $scope.convertRAPDToSqM = function (ropani, aana, paisa, daam) {
				var area=areaService.RAPDToSqMt(ropani, aana, paisa, daam);
                return mathService.round(area,$scope.noAfterDecimal);
            }
			$scope.convertRAPDToHector = function (ropani, aana, paisa, daam) {
				var area=areaService.RAPDToSqMt(ropani, aana, paisa, daam);
				area=area/10000;
                return mathService.round(area,$scope.noAfterDecimal);
            }
            $scope.convertBKDToSqFt = function (bigaha, kathha, dhur) {
                var area=areaService.BKDToSqFt(bigaha, kathha, dhur); //Converts BKD system to Sq. Feet
                return mathService.round(area,$scope.noAfterDecimal); // and rounds off to required no
            }
            $scope.convertBKDToSqM = function (bigaha, kathha, dhur) {
				var area=areaService.BKDToSqM(bigaha, kathha, dhur); //Converts BKD system to Sq. Meter
                return mathService.round(area,$scope.noAfterDecimal); // and rounds off to required no
            }
			$scope.convertBKDToHector = function (bigaha, kathha, dhur) {
				var area=areaService.BKDToSqM(bigaha, kathha, dhur); //Converts BKD system to Sq. Meter
				area=area/10000;
                return mathService.round(area,$scope.noAfterDecimal); // and rounds off to required no
            }
			$scope.convertBKDToAcre = function (bigaha, kathha, dhur) {
				var area=areaService.BKDToSqFt(bigaha, kathha, dhur); //Converts BKD system to Sq. Feet
				area=area/43560;
                return mathService.round(area,$scope.noAfterDecimal); // and rounds off to required no
            }
            $scope.convertSqftToRAPD = function (sqFt) {
				var area=areaService.SqftToRAPD(sqFt);
				area.daam = mathService.round(area.daam,$scope.noAfterDecimal);
                return area;
            }
			$scope.convertHectorToRAPD=function(hector){
				var sqMt=hector*10000;
				var area=areaService.SqMtToRAPD(sqMt);
				area.daam = mathService.round(area.daam ,$scope.noAfterDecimal);
				return area;
			}
			$scope.convertAcreToRAPD=function(acre){
				var sqFt=acre*43560;
				var area=areaService.SqftToRAPD(sqFt);
				area.daam = mathService.round(area.daam ,$scope.noAfterDecimal);
				return area;
			}
            $scope.convertSqMtToRAPD = function (sqMt) {
                var area=areaService.SqMtToRAPD(sqMt);
				area.daam = mathService.round(area.daam ,$scope.noAfterDecimal);
				return area;
            }
            $scope.convertSqftToBKD = function (sqFt) {
                var area=areaService.SqFtToBKD(sqFt);
				area.dhur = mathService.round(area.dhur,$scope.noAfterDecimal);
				return area;
            }
            $scope.convertSqMtToBKD = function (sqMt) {
                var area=areaService.SqMtToBKD(sqMt);
				area.dhur = mathService.round(area.dhur,$scope.noAfterDecimal);
				return area;
            }
			$scope.convertHectorToBKD=function(hector){
				var sqMt=hector*10000;
				var area=areaService.SqMtToBKD(sqMt);
				area.dhur = mathService.round(area.dhur,$scope.noAfterDecimal);
				return area;
			
			}
			$scope.convertAcreToBKD=function(acre){
				var sqFt=acre*43560;
				var area=areaService.SqFtToBKD(sqFt);
				area.dhur = mathService.round(area.dhur,$scope.noAfterDecimal);
				return area;
			
			}
            $scope.convertSqFtToSqM = function (sqFt) {
                var sqM = sqFt / 10.76391041670972;
                return mathService.round(sqM,$scope.noAfterDecimal );
            }
            $scope.convertSqMtToSqFt = function (sqMt) {
                var sqFt = sqMt * 10.76391041670972;
				return mathService.round(sqFt,$scope.noAfterDecimal);
            }
			$scope.convertSqMtToHector=function(sqMt){
				var hector=sqMt/10000;
				return mathService.round(hector,$scope.noAfterDecimal);
			}
			$scope.convertSqMtToAcre=function(sqMt){
				var acre=sqMt/4046.8564224;
				return mathService.round(acre,$scope.noAfterDecimal);
			}
			$scope.convertSqFtToHector=function(sqFt){
				var hector=sqFt/107639.1041670972;
				return mathService.round(hector,$scope.noAfterDecimal);
			}
			$scope.convertSqFtToAcre=function(sqFt){
				var acre=sqFt/43560;
				return mathService.round(acre,$scope.noAfterDecimal);
			}
			$scope.convertHectorToSqMt=function(hector){
				var sqMt=hector*10000;
				return mathService.round(sqMt,$scope.noAfterDecimal);
			}
			$scope.convertHectorToSqFt=function(hector){
				var sqFt=hector*107639.1041670972;
				return mathService.round(sqFt,$scope.noAfterDecimal);
			}
			$scope.convertAcreToSqMt=function(acre){
				var sqMt=acre*4046.8564224;
				return mathService.round(sqMt,$scope.noAfterDecimal);
			}
			$scope.convertAcreToSqFt=function(acre){
				var sqFt=43560*acre;
				return mathService.round(sqFt,$scope.noAfterDecimal);
			}
			
			$scope.covertHectorAcre=function(type,value){
				if(type=="H")
				{
					return mathService.round(2.471053814671653*value,$scope.noAfterDecimal);
				}
				else if(type=="A")
				{
					return mathService.round(0.40468564224*value,$scope.noAfterDecimal);
				}
				else{
					return 0;
				}
			}
			
            $scope.calculateFromRAPD = function () {
                var ropani = $scope.ropani;
                var aana = $scope.aana;
                var paisa = $scope.paisa;
                var daam = $scope.daam;
                $scope.sqFeet = $scope.convertRAPDToSqFt(ropani, aana, paisa, daam);
                $scope.sqMeter = $scope.convertRAPDToSqM(ropani, aana, paisa, daam);
				$scope.hector = $scope.convertRAPDToHector(ropani, aana, paisa, daam);
                $scope.acre = $scope.convertRAPDToAcre(ropani, aana, paisa, daam);
                var bkdArea = $scope.convertSqftToBKD($scope.sqFeet);
                $scope.putBKD(bkdArea);
            }
            $scope.calculateFromSqFeet = function () {
                var sqFt = $scope.sqFeet;
                $scope.sqMeter = $scope.convertSqFtToSqM(sqFt);
                var rapdArea = $scope.convertSqftToRAPD(sqFt);
                $scope.putRAPD(rapdArea);
                var bkdArea = $scope.convertSqftToBKD(sqFt);
                $scope.putBKD(bkdArea);
				$scope.hector=$scope.convertSqFtToHector(sqFt);
				$scope.acre=$scope.convertSqFtToAcre(sqFt);
            }
            $scope.calculateFromSqMeter = function () {
                var sqMt = $scope.sqMeter;
                $scope.sqFeet = $scope.convertSqMtToSqFt(sqMt);
                var rapdArea = $scope.convertSqMtToRAPD(sqMt);
                $scope.putRAPD(rapdArea);
                var bkdArea = $scope.convertSqMtToBKD(sqMt);
                $scope.putBKD(bkdArea);
				$scope.hector=$scope.convertSqMtToHector(sqMt);
				$scope.acre=$scope.convertSqMtToAcre(sqMt);
            }
			// Change BKD to other area unit system
            $scope.calculateFromBKD = function () {
                var bigaha = $scope.bigaha;
                var kathha = $scope.kathha;
                var dhur = $scope.dhur;
                $scope.sqFeet = $scope.convertBKDToSqFt(bigaha, kathha, dhur);
                $scope.sqMeter = $scope.convertBKDToSqM(bigaha, kathha, dhur);
				$scope.hector=$scope.convertBKDToHector(bigaha, kathha, dhur);
				$scope.acre=$scope.convertBKDToAcre(bigaha, kathha, dhur);
                var rapdArea = $scope.convertSqftToRAPD($scope.sqFeet);
                $scope.putRAPD(rapdArea);
            }
			$scope.calculateFromHector=function(){
				var hector=$scope.hector;
				$scope.sqMeter=$scope.convertHectorToSqMt(hector);
				$scope.sqFeet=$scope.convertHectorToSqFt(hector);
				var rapdArea = $scope.convertHectorToRAPD(hector);
                $scope.putRAPD(rapdArea);
				var bkdArea = $scope.convertHectorToBKD(hector);
                $scope.putBKD(bkdArea);
				$scope.acre=$scope.covertHectorAcre("H",hector);
			}
			$scope.calculateFromAcre=function(){
				var acre=$scope.acre;
				$scope.sqMeter=$scope.convertAcreToSqMt(acre);
				$scope.sqFeet=$scope.convertAcreToSqFt(acre);
				var rapdArea = $scope.convertAcreToRAPD(acre);
                $scope.putRAPD(rapdArea);
				var bkdArea = $scope.convertAcreToBKD(acre);
                $scope.putBKD(bkdArea);
				$scope.hector=$scope.covertHectorAcre("A",acre);
			}
        }
    }
});
