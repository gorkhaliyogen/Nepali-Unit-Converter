app.directive("dateConverter", function () {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: 'Scripts/App/Templates/date-converter-template.html',
        controller: function ($scope) {
            $scope.b2aMode = true;
            $scope.result = false;
            $scope.hideResult = function () {
                $scope.result = false;
            }
            $scope.getBtnText = function () {
                if ($scope.b2aMode) {
                    return "Convert To AD";
                }
                else {
                    return  "Convert To BS";
                }
            }
            $scope.convertTo = ["BS to AD", "AD to BS"];
            $scope.convert = $scope.convertTo[0];
            $scope.changeConvertTo = function () {
                $scope.toggleMode();
            }
            $scope.btnText = $scope.getBtnText();
    
            $scope.getMonths = function () {
                if ($scope.b2aMode) {
                    var monthArray=
                    [
                    { text: '\u092C\u0948\u0936\u093E\u0916', value: '1' },
                    { text: '\u091C\u0947\u0937\u094D\u0920', value: '2' },
                    { text: '\u0906\u0937\u093E\u0922\u093C', value: '3' },
                    { text: '\u0936\u094D\u0930\u093E\u0935\u0923', value: '4' },
                    { text: '\u092D\u093E\u0926\u094D\u0930', value: '5' },
                    { text: '\u0906\u0936\u094D\u0935\u093F\u0928', value: '6' },
                    { text: '\u0915\u093E\u0930\u094D\u0924\u093F\u0915', value: '7' },
                    { text: '\u092E\u093E\u0930\u094D\u0917', value: '8' },
                    { text: '\u092A\u094C\u0937', value: '9' },
                    { text: '\u092E\u093E\u0918', value: '10' },
                    { text: '\u092B\u093E\u0932\u094D\u0917\u0941\u0928', value: '11' },
                    { text: '\u091A\u0948\u0924\u094D\u0930', value: '12' },
                    ];
                    return monthArray;
                }
                else {
                    var monthArray=
                    [
                    { text: 'January', value: '1' },
                    { text: 'February', value: '2' },
                    { text: 'March', value: '3' },
                    { text: 'April', value: '4' },
                    { text: 'May', value: '5' },
                    { text: 'June', value: '6' },
                    { text: 'July', value: '7' },
                    { text: 'August', value: '8' },
                    { text: 'September', value: '9' },
                    { text: 'October', value: '10' },
                    { text: 'November', value: '11' },
                    { text: 'December', value: '12' },
                    ];
                    return monthArray;
                }
            }
            $scope.months = $scope.getMonths();
            $scope.engWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.nepWeeks = ['आइतबार','सोमबार','मंगलबार','बुधबार','बिहिबार','शुक्रबार','शनिबार'];
            $scope.years = [];
            $scope.getYears = function () {
                if ($scope.b2aMode) {
                    var beginYear = 1950;
                    for (var i = beginYear; i <= 2100; i++) {
                        $scope.years.push(i);
                    }
                }
                else {
                    var beginYear = 1894;
                    for (var i = beginYear; i <= 2043; i++) {
                        $scope.years.push(i);
                    }
                }
        
            }
            $scope.days = [];
            $scope.getDays = function () {
                for (var i = 1; i <= 32; i++) {
                    $scope.days.push(i);
                }
            }
            $scope.todayDate = function (type) {
                var tDate = new Date();
                if ($scope.b2aMode) {
                    var Format = tDate.getMonth() + 1 + "/" + tDate.getDate() + "/" + tDate.getFullYear();
                    var nepDate = ConvertToNepali(Format);
                    $scope.day = $scope.days[(parseInt(nepDate.substr(8, 2)) - 1)];
                    $scope.month = $scope.months[(parseInt(nepDate.substr(5, 2)) - 1)];
                    $scope.year = $scope.years[$scope.years.indexOf(parseInt(nepDate.substr(0, 4)))];
                }
                else {
                    $scope.day = $scope.days[tDate.getDate()-1];
                    $scope.month = $scope.months[tDate.getMonth()];
                    $scope.year=$scope.years[$scope.years.indexOf(tDate.getFullYear())];
                }
            }
            $scope.convertDate = function () {
        
                if ($scope.b2aMode) {
                    var choosed_Date = $scope.year + "-" + $scope.month.value + "-" + $scope.day;
                    var engDate = ConvertToEnglish(choosed_Date);
                    $scope.result = true;
                    $scope.resultMonth = get_english_month(parseInt(engDate.substr(0, 2))-1);
                    $scope.resultDay = parseInt(engDate.substr(3, 2));
                    $scope.resultYear = parseInt(engDate.substr(6, 4));
                    var myDate = new Date(eval('"' + engDate + '"'))
                    $scope.resultWeekDay = $scope.engWeeks[myDate.getDay()]
                }
                else {
                    var choosed_Date = $scope.month.value + "/" + $scope.day + "/" + $scope.year;
                    var nepDate = ConvertToNepali(choosed_Date);
                    $scope.result = true;
                    $scope.resultMonth = get_nepali_month_nep(parseInt(nepDate.substr(5, 2))-1);
                    $scope.resultDay = parseInt(nepDate.substr(8, 2));
                    $scope.resultYear = parseInt(nepDate.substr(0, 4));
                    var myDate = new Date(eval('"' + choosed_Date + '"'))
                    $scope.resultWeekDay = $scope.nepWeeks[myDate.getDay()]
                }
            }
            $scope.toggleMode = function () {
                $scope.b2aMode = !$scope.b2aMode;
                $scope.months = $scope.getMonths();
                $scope.getYears();
                $scope.todayDate();
                $scope.btnText = $scope.getBtnText();
                $scope.result = false;
            };
            $scope.getYears();
            $scope.getDays();
            $scope.month = 0;
            $scope.day = 0;
            $scope.year = 0;
            $scope.todayDate();
        }
    }
});
