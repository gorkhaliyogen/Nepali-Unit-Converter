
function ConvertToNepali(date) {
    var engDate = date.split("/");
    if (engDate.length == 3) {
        var mth = parseInt(engDate[0].replace(/^0+/, ''));
        var day = parseInt(engDate[1].replace(/^0+/, ''));
        var year = parseInt(engDate[2].replace(/^0+/, ''));

        var nepDate = gregorianToLocal(3, year, mth, day);
        var convertedDate = nepDate.year + "-" + nepDate.month + "-" + nepDate.day;
        return convertedDate;
    }
    return "";
}

function ConvertToEnglish(date) {
    var nepDate = date.split("-");
    if (nepDate.length == 3) {
        var year = nepDate[0];
        var mth = nepDate[1];
        var day = nepDate[2];
        var engDate = localToGregorian(3, year, mth, day);
        var convertedDate = engDate.month + "/" + engDate.day + "/" + engDate.year;
        return convertedDate;
    }
    return "";
}

function getEngMonth(month) {
    var monthEng;
    switch (month) {
        case "01":
            {
                monthEng = "Baishakh";
                break;
            }
        case "02":
            {
                monthEng = "Jestha";
                break;
            }
        case "03":
            {
                monthEng = "Ashadh";
                break;
            }
        case "04":
            {
                monthEng = "Shrawan";
                break;
            }
        case "05":
            {
                monthEng = "Bhadra";
                break;
            }
        case "06":
            {
                monthEng = "Ashwin";
                break;
            }
        case "07":
            {
                monthEng = "kartik";
                break;
            }
        case "08":
            {
                monthEng = "Mangsir";
                break;
            }
        case "09":
            {
                monthEng = "Poush";
                break;
            }
        case "10":
            {
                monthEng = "Magh";
                break;
            }
        case "11":
            {
                monthEng = "Falgun";
                break;
            }
        case "12":
            {
                monthEng = "Chaitra";
                break;
            }
        default:
            {
                alert("Nepali month is out of range");
                break;
            }
    }
    return monthEng;
}

function getNepMonth(month) {
    var monthNep;
    switch (month) {
        case "01":
            {
                monthNep = "बैशाख";
                break;
            }
        case "02":
            {
                monthNep = "जेष्ठ";
                break;
            }
        case "03":
            {
                monthNep = "आशाद";
                break;
            }
        case "04":
            {
                monthNep = "ष्रवन";
                break;
            }
        case "05":
            {
                monthNep = "भाद्र";
                break;
            }
        case "06":
            {
                monthNep = "आस्विन";
                break;
            }
        case "07":
            {
                monthNep = "कार्तिक";
                break;
            }
        case "08":
            {
                monthNep = "मङ्सिर";
                break;
            }
        case "09":
            {
                monthNep = "पौष";
                break;
            }
        case "10":
            {
                monthNep = "माघ";
                break;
            }
        case "11":
            {
                monthNep = "फाल्गुन";
                break;
            }
        case "12":
            {
                monthNep = "चैत्र";
                break;
            }
        default:
            {
                alert("Nepali month is out of range");
                break;
            }
    }
    return monthNep;
}
