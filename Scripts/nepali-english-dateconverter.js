/******************************************************************
        GCU LocalCalendard for js
version info
2010-11-11  huangwei 00120833   0.01 support nepali calendar
2010-11-17  huangwei 00120833   0.02 support persian calendar
******************************************************************/
/******************************************************************
interface functions
******************************************************************/

/******************************************************************
convert gergorian to local calendar
input:
    type: calendar to output 0=gregorian, 1=persian, 2=islamic 3=nepali
    year: date of the year, number as YYYY
	month:date of the month, number as MM
	day:  date of the day, number as DD
return & error handle:
    as input & ouput specifications
******************************************************************/
function gregorianToLocal(type, year, month, day)
{
	year = parseInt(year, 10);
	month = parseInt(month, 10)-1;
	day = parseInt(day, 10);

	if (isNaN(day)||isNaN(month)||isNaN(year)){
            return {
                result:0,
                year:"0000",
                month:"00",
                day:"00"
            };
	}

    var ret = {};
    var datestr;
    switch(parseInt(type, 10))
    {
    case  0:/*gergorian*/
        ret.result = 1;
        ret.year  = year;
        ret.month = month;
        ret.day   = day;
        return ret;

    case 1:/*persian*/
        var persian_ret = gregorianToPersian(year, month, day);
        ret.result      = persian_ret.result;
        ret.year        = persian_ret.year;
        ret.month       = persian_ret.month + 1;
        ret.day         = persian_ret.day;
        // ret.local_month = get_Persian_Month(ret.month);
        // ret.local_date  = ret.year + '-'+ret.local_month+'-' + ret.day;
        return ret;

    case 2:/*islamic */
        ret.result = 0;
        return ret;

    case 3: /*nepali*/
        var nepret = gregorianToNepali(year, month, day);
        if (nepret.result === 0) {
            return {
                result: 0,
                local_date: "0000-00-00",
                year: "0000",
                month: "00",
                day: "00",
                local_month: "",
                latin_month: "",
                monthdays: 0
            };
        } else {
            ret.result = nepret.result;
            ret.year = nepret.year;
            ret.month = nepret.month + 1;
            var nepmth = ret.month.toString();
            if (nepmth.length == 1) {
                nepmth = "0" + nepmth;
            }
            ret.month = nepmth;
            
            var nepday = nepret.day.toString();
            if (nepday.length == 1) {
                nepday = "0" + nepday;
            }
            ret.day = nepday;
            return ret;
        }
        break;

    default:
        return {
            result:0,
            local_date:"0000-00-00",
            year:"0000",
            month:"00",
            day:"00"
        };
    }
}

/******************************************************************
convert local calendar to gregorian
input
    type: calendar of input 0=gregorian, 1=persian, 2=islamic 3=nepali
    year: date of the year, number as YYYY
	month:date of the month, number as MM
	day:  date of the day, number as DD
return & error handle:
    as input & ouput specifications
*******************************************************************/
function localToGregorian(type,year, month, day)
{
	year = parseInt(year, 10);
	month = parseInt(month, 10)-1;
	day = parseInt(day, 10);

	if (isNaN(day)||isNaN(month)||isNaN(year)){
            return {
                result:0,
                year:"0000",
                month:"00",
                day:"00"
            };
	}

    switch(parseInt(type, 10))
    {
    case 0: /*gregorian*/
        return date;

    case 1: /*persian */
        return persianToGregorian(year, month, day);

    case 2: /* islamic */
        return islamicToGreGorian(year, month, day);

    case 3: /* nepali */
        var out = nepaliToGregorian(year, month, day);
        if (out.result === 0) {
            return {
                result: 0,
                year: "0000",
                month: "00",
                day: "00"
            };
        } else {
            out.month = out.month + 1;
            
            var outmonth = out.month.toString();
            if (outmonth.length == 1) {
                out.month = "0" + outmonth;
            }
            return out;
        }
        break;
    default:
        /*no operation*/
    }

    return "0000-00-00";
}
/******************************************************************
convert local calendar to gregorian
input
    type: calendar of input 0=gregorian, 1=persian, 2=islamic 3=nepali
    year: date of the year, number as YYYY
	month:date of the month, number as MM, based on 0.
return & error handle:
    ouput:the days number of this month
*******************************************************************/

function getMonthDays(type, year, month)
{
	year = parseInt(year, 10);
	month = parseInt(month, 10)-1;

    switch(parseInt(type,10))
    {
    case 0: /*gregorian*/
        return get_gregorian_month_day(year, month);

    case 1: /*persian */
        return get_persian_month_day(year, month);

    case 2: /* islamic */
        return 0;

    case 3: /* nepali */
        return get_nepali_month_day(year, month);

    default:return 0;
    }
}
/*****************************************************************
interface functions end
*****************************************************************/

/*****************************************************************
public data and functions
*****************************************************************/
/*****************************************************************
test the input year is leap year or not
*****************************************************************/
function is_leap_year(year)
{
    var vara = year;
    if (vara % 100 === 0) {
        if (vara % 400 === 0) {
            return true;
        } else {
            return false;
        }

    } else {
        if (vara % 4 === 0) {
            return true;
        } else {
            return false;
        }
    }
}

/*****************************************************************
get days in every month of a specific year
Note:month is based on 0 to 11
*****************************************************************/
function get_gregorian_month_day(year, month)
{
	/*****************************************************************
	days in every month of non-leap year
	*****************************************************************/
	var monthday = [31,28,31,30,31,30,
				  31,31,30,31,30,31];
	/*****************************************************************
	days in every month of leap year
	*****************************************************************/
	var lmonthday = [31,29,31,30,31,30,
					31,31,30,31,30,31];

    var varyear = year;
    var varmonth = month;

    if(is_leap_year(varyear)){
        return(lmonthday[varmonth]);
	}
    else {
        return(monthday[varmonth]);
	}
}

/*****************************************************************
get total days from jan 1 to last day of last month in specific year;
Note:month is based on 0 to 11
*****************************************************************/
function get_gregorian_month_days( year, month)
{
	/*****************************************************************
	total days from jan 1 to last day of last month in non-leap year
	*****************************************************************/
	var monthdays = [31, 59, 90,120,151,181,
						212,243,273,304,334,365];
	/*****************************************************************
	total days from jan 1 to last day of last month in leap year
	*****************************************************************/
	var lmonthdays = [31, 60, 91, 121,152,182,
					  213,244,274,305,335,366];

    var vary = parseInt(year,10);

    var varm = parseInt(month,10);

    if(is_leap_year(vary)){
        return(lmonthdays[varm]);
	}
    else {
        return(monthdays[varm]);
	}
}
/*****************************************************************
public functions end
*****************************************************************/

/*******************************************************************************
nepali convert
*******************************************************************************/
/*******************************************************************************
date of nepali calednar
    the 1st field is year of nepali
    the 2nd-13th field is days in every month
    the 14th field is total days of this year;
    the 15th field is total days from 2000-1-1 to last day of last year
*******************************************************************************/
var vardaynum = [
         //0   1  2  3  4  5  6  7  8  9 10 11 12  13 14
		[1950,31,31,31,32,31,31,29,30,29,30,29,31,365,0],
		[1951,31,31,32,31,31,31,30,29,30,29,30,30,365,365],
		[1952,31,31,32,32,31,30,30,29,30,29,30,30,365,730],
		[1953,31,32,31,32,31,30,30,30,29,29,30,31,366,1095],
		[1954,31,31,31,32,31,31,29,30,30,29,30,30,365,1461],
		[1955,31,31,32,31,31,31,30,29,30,29,30,30,365,1826],
		[1956,31,31,32,32,31,30,30,29,30,29,30,30,365,2191],
		[1957,31,32,31,32,31,30,30,30,29,29,30,31,366,2556],
		[1958,31,31,31,32,31,31,29,30,30,29,30,30,365,2922],
		[1959,31,31,32,31,31,31,30,29,30,29,30,30,365,3287],
		[1960,31,32,31,32,31,30,30,29,30,29,30,30,365,3652],
		[1961,31,32,31,32,31,30,30,30,29,30,29,31,366,4017],
		[1962,31,31,31,32,31,31,30,29,30,29,30,30,365,4383],
		[1963,31,31,32,31,31,31,30,29,30,29,30,30,365,4748],
		[1964,31,32,31,32,31,30,30,30,29,29,30,30,365,5113],
		[1965,31,32,31,32,31,30,30,30,29,30,29,31,366,5478],
		[1966,31,31,32,31,31,31,30,29,30,29,30,30,365,5844],
		[1967,31,31,32,31,31,31,30,29,30,29,30,30,365,6209],
		[1968,31,32,31,32,31,30,30,30,29,29,30,30,365,6574],
		[1969,31,32,31,32,31,30,30,30,29,30,29,31,366,6939],
		[1970,31,31,32,31,31,31,30,29,30,29,30,30,365,7305],
		[1971,31,31,32,31,32,30,30,29,30,29,30,30,365,7670],
		[1972,31,32,31,32,31,30,30,30,29,29,30,31,366,8035],
		[1973,30,32,31,32,31,30,30,30,29,30,29,31,365,8401],
		[1974,31,31,32,31,31,31,30,29,30,29,30,30,365,8766],
		[1975,31,31,32,32,31,30,30,29,30,29,30,30,365,9131],
		[1976,31,32,31,32,31,30,30,30,29,29,30,31,366,9496],
		[1977,30,32,31,32,31,31,29,30,29,30,29,31,365,9862],
		[1978,31,31,32,31,31,31,30,29,30,29,30,30,365,10227],
		[1979,31,31,32,32,31,30,30,29,30,29,30,30,365,10592],
		[1980,31,32,31,32,31,30,30,30,29,29,30,31,366,10957],
		[1981,31,31,31,32,31,31,29,30,30,29,30,30,365,11323],
		[1982,31,31,32,31,31,31,30,29,30,29,30,30,365,11688],
		[1983,31,31,32,32,31,30,30,29,30,29,30,30,365,12053],
		[1984,31,32,31,32,31,30,30,30,29,29,30,31,366,12418],
		[1985,31,31,31,32,31,31,29,30,30,29,30,30,365,12784],
		[1986,31,31,32,31,31,31,30,29,30,29,30,30,365,13149],
		[1987,31,32,31,32,31,30,30,29,30,29,30,30,365,13514],
		[1988,31,32,31,32,31,30,30,30,29,29,30,31,366,13879],
		[1989,31,31,31,32,31,31,30,29,30,29,30,30,365,14245],
		[1990,31,31,32,31,31,31,30,29,30,29,30,30,365,14610],
		[1991,31,32,31,32,31,30,30,30,29,29,30,30,365,14975],
		[1992,31,32,31,32,31,30,30,30,29,30,29,31,366,15340],
		[1993,31,31,31,32,31,31,30,29,30,29,30,30,365,15706],
		[1994,31,31,32,31,31,31,30,29,30,29,30,30,365,16071],
		[1995,31,32,31,32,31,30,30,30,29,29,30,30,365,16436],
		[1996,31,32,31,32,31,30,30,30,29,30,29,31,366,16801],
		[1997,31,31,32,31,31,31,30,29,30,29,30,30,365,17167],
		[1998,31,31,32,31,31,31,30,29,30,29,30,30,365,17532],
		[1999,31,32,31,32,31,30,30,30,29,29,30,31,366,17897],
		[2000,30,32,31,32,31,30,30,30,29,30,29,31,365,18263],
		[2001,31,31,32,31,31,31,30,29,30,29,30,30,365,18628],
		[2002,31,31,32,32,31,30,30,29,30,29,30,30,365,18993],
		[2003,31,32,31,32,31,30,30,30,29,29,30,31,366,19358],
		[2004,30,32,31,32,31,30,30,30,29,30,29,31,365,19724],
		[2005,31,31,32,31,31,31,30,29,30,29,30,30,365,20089],
		[2006,31,31,32,32,31,30,30,29,30,29,30,30,365,20454],
		[2007,31,32,31,32,31,30,30,30,29,29,30,31,366,20819],
		[2008,31,31,31,32,31,31,29,30,30,29,29,31,365,21185],
		[2009,31,31,32,31,31,31,30,29,30,29,30,30,365,21550],
		[2010,31,31,32,32,31,30,30,29,30,29,30,30,365,21915],
		[2011,31,32,31,32,31,30,30,30,29,29,30,31,366,22280],
		[2012,31,31,31,32,31,31,29,30,30,29,30,30,365,22646],
		[2013,31,31,32,31,31,31,30,29,30,29,30,30,365,23011],
		[2014,31,31,32,32,31,30,30,29,30,29,30,30,365,23376],
		[2015,31,32,31,32,31,30,30,30,29,29,30,31,366,23741],
		[2016,31,31,31,32,31,31,29,30,30,29,30,30,365,24107],
		[2017,31,31,32,31,31,31,30,29,30,29,30,30,365,24472],
		[2018,31,32,31,32,31,30,30,29,30,29,30,30,365,24837],
		[2019,31,32,31,32,31,30,30,30,29,30,29,31,366,25202],
		[2020,31,31,31,32,31,31,30,29,30,29,30,30,365,25568],
		[2021,31,31,32,31,31,31,30,29,30,29,30,30,365,25933],
		[2022,31,32,31,32,31,30,30,30,29,29,30,30,365,26298],
		[2023,31,32,31,32,31,30,30,30,29,30,29,31,366,26663],
		[2024,31,31,31,32,31,31,30,29,30,29,30,30,365,27029],
		[2025,31,31,32,31,31,31,30,29,30,29,30,30,365,27394],
		[2026,31,32,31,32,31,30,30,30,29,29,30,31,366,27759],
		[2027,30,32,31,32,31,30,30,30,29,30,29,31,365,28125],
		[2028,31,31,32,31,31,31,30,29,30,29,30,30,365,28490],
		[2029,31,31,32,31,32,30,30,29,30,29,30,30,365,28855],
		[2030,31,32,31,32,31,30,30,30,29,29,30,31,366,29220],
		[2031,30,32,31,32,31,30,30,30,30,29,29,31,365,29586],
		[2032,31,31,32,31,31,31,30,29,30,29,30,30,365,29951],
		[2033,31,31,32,32,31,30,30,29,30,29,30,30,365,30316],
		[2034,31,32,31,32,31,30,30,30,29,29,30,31,366,30681],
		[2035,30,32,31,32,31,31,29,30,30,29,29,31,365,31047],
		[2036,31,31,32,31,31,31,30,29,30,29,30,30,365,31412],
		[2037,31,31,32,32,31,30,30,29,30,29,30,30,365,31777],
		[2038,31,32,31,32,31,30,30,30,29,29,30,31,366,32142],
		[2039,31,31,31,32,31,31,29,30,30,29,30,30,365,32508],
		[2040,31,31,32,31,31,31,30,29,30,29,30,30,365,32873],
		[2041,31,31,32,32,31,30,30,29,30,29,30,30,365,33238],
		[2042,31,32,31,32,31,30,30,30,29,29,30,31,366,33603],
		[2043,31,31,31,32,31,31,29,30,30,29,30,30,365,33969],
		[2044,31,31,32,31,31,31,30,29,30,29,30,30,365,34334],
		[2045,31,32,31,32,31,30,30,29,30,29,30,30,365,34699],
		[2046,31,32,31,32,31,30,30,30,29,30,29,31,366,35064],
		[2047,31,31,31,32,31,31,30,29,30,29,30,30,365,35430],
		[2048,31,31,32,31,31,31,30,29,30,29,30,30,365,35795],
		[2049,31,32,31,32,31,30,30,30,29,29,30,30,365,36160],
		[2050,31,32,31,32,31,30,30,30,29,30,29,31,366,36525],
		[2051,31,31,31,32,31,31,30,29,30,29,30,30,365,36891],
		[2052,31,31,32,31,31,31,30,29,30,29,30,30,365,37256],
		[2053,31,32,31,32,31,30,30,30,29,29,30,30,365,37621],
		[2054,31,32,31,32,31,30,30,30,29,30,29,31,366,37986],
		[2055,31,31,32,31,31,31,30,29,30,29,30,30,365,38352],
		[2056,31,31,32,31,32,30,30,29,30,29,30,30,365,38717],
		[2057,31,32,31,32,31,30,30,30,29,29,30,31,366,39082],
		[2058,30,32,31,32,31,30,30,30,29,30,29,31,365,39448],
		[2059,31,31,32,31,31,31,30,29,30,29,30,30,365,39813],
		[2060,31,31,32,32,31,30,30,29,30,29,30,30,365,40178],
		[2061,31,32,31,32,31,30,30,30,29,29,30,31,366,40543],
		[2062,31,31,31,32,31,31,29,30,29,30,29,31,365,40909],
		[2063,31,31,32,31,31,31,30,29,30,29,30,30,365,41274],
		[2064,31,31,32,32,31,30,30,29,30,29,30,30,365,41639],
		[2065,31,32,31,32,31,30,30,30,29,29,30,31,366,42004],
		[2066,31,31,31,32,31,31,29,30,30,29,29,31,365,42370],
		[2067,31,31,32,31,31,31,30,29,30,29,30,30,365,42735],
		[2068,31,31,32,32,31,30,30,29,30,29,30,30,365,43100],
		[2069,31,32,31,32,31,30,30,30,29,29,30,31,366,43465],
		[2070,31,31,31,32,31,31,29,30,30,29,30,30,365,43831],
		[2071,31,31,32,31,31,31,30,29,30,29,30,30,365,44196],
		[2072,31,32,31,32,31,30,30,29,30,29,30,30,365,44561],
		[2073,31,32,31,32,31,30,30,30,29,30,29,31,366,44926],
		[2074,31,31,31,32,31,31,30,29,30,29,30,30,365,45292],
		[2075,31,31,32,31,31,31,30,29,30,29,30,30,365,45657],
		[2076,31,32,31,32,31,30,30,30,29,29,30,30,365,46022],
		[2077,31,32,31,32,31,30,30,30,29,30,29,31,366,46387],
		[2078,31,31,31,32,31,31,30,29,30,29,30,30,365,46753],
		[2079,31,31,32,31,31,31,30,29,30,29,30,30,365,47118],
		[2080,31,32,31,32,31,30,30,30,29,29,30,30,365,47483],
		[2081,31,32,31,32,31,30,30,30,29,30,29,31,366,47848],
		[2082,31,31,31,32,31,31,30,29,30,29,30,30,365,48214],
		[2083,31,31,32,31,31,31,30,29,30,29,30,30,365,48579],
		[2084,31,32,31,32,31,30,30,30,29,29,30,31,366,48944],
		[2085,30,32,31,32,31,30,30,30,29,30,29,31,365,49310],
		[2086,31,31,32,31,31,31,30,29,30,29,30,30,365,49675],
		[2087,31,31,32,32,31,30,30,29,30,29,30,30,365,50040],
		[2088,31,32,31,32,31,30,30,30,29,29,30,31,366,50405],
		[2089,30,32,31,32,31,30,30,30,29,30,29,31,365,50771],
		[2090,31,31,32,31,31,31,30,29,30,29,30,30,365,51136],
		[2091,31,31,32,32,31,30,30,29,30,29,30,30,365,51501],
		[2092,31,32,31,32,31,30,30,30,29,29,30,31,366,51866],
		[2093,31,31,31,32,31,31,29,30,29,30,29,31,365,52232],
		[2094,31,31,32,31,31,31,30,29,30,29,30,30,365,52597],
		[2095,31,31,32,32,31,30,30,29,30,29,30,30,365,52962],
		[2096,31,32,31,32,31,30,30,30,29,29,30,31,366,53327],
		[2097,31,31,31,32,31,31,29,30,30,29,30,30,365,53693],
		[2098,31,31,32,31,31,31,30,29,30,29,30,30,365,54058],
		[2099,31,32,31,32,31,30,30,29,30,29,30,30,365,54423],
		[2100,31,32,31,32,31,30,30,30,29,29,30,31,366,54788],
		[2101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,365,55154]
];
var minNepalYear = 1950;
var maxNepalYear = 2100;
var nepalmindate = 2412565;	//1893-4-11 (before 1950-1-1 nepal one day)

/*****************************************************************
ouput the name of nepali month in english & local language.
Note:month is based on 0 to 11
*****************************************************************/
function   get_nepali_latin_month( varm) {
    var nepali_months_eng  =
    [
        "Baishakh","Jestha","Ashad","Shravan",
        "Bhadra","Aswin","Kartik","Mangsir",
        "Paush","Magh","Phalgun","Chaitra"
    ];
    return nepali_months_eng[varm];
}

//Note:month is based on 0 to 11
function get_nepali_month_nep(month)
{
    var nepali_native_month_name = [
    "\u092C\u0948\u0936\u093E\u0916",
    "\u091C\u0947\u0937\u094D\u0920",
    "\u0906\u0937\u093E\u0922\u093C",
    "\u0936\u094D\u0930\u093E\u0935\u0923",
    "\u092D\u093E\u0926\u094D\u0930",
    "\u0906\u0936\u094D\u0935\u093F\u0928",
    "\u0915\u093E\u0930\u094D\u0924\u093F\u0915",
    "\u092E\u093E\u0930\u094D\u0917",
    "\u092A\u094C\u0937",
    "\u092E\u093E\u0918",
    "\u092B\u093E\u0932\u094D\u0917\u0941\u0928",
    "\u091A\u0948\u0924\u094D\u0930"];
    return nepali_native_month_name[month];
}
//Note:month is based on 0 to 11
function   get_english_month( varm) {
    var gregorian_month_name = [ "January","February", "March","April","May", "June",
    "July", "August", "September", "October","November", "December" ];

    return gregorian_month_name[varm];
}

//Note:month is based on 0 to 11
function   is_range_eng( varyy,  varmm,  vardd) {
    //if (varyy < minNepalYear || varyy > maxNepalYear) {
    //        varthis->debug_info = "Supported only between 1944-2022";
    //    return false;
    //}

    if (varmm < 0 || varmm > 11) {
        return false;
    }

    if (vardd < 1 || vardd > 31) {
        return false;
    }

    if(vardd > get_gregorian_month_day(varyy,varmm))
    {
        return false;
    }
    return true;
}
//Note:month is based on 0 to 11
function  is_range_nep( varyy,  varmm,  vardd) {
    if (varyy < minNepalYear || varyy > maxNepalYear) {
        return false;
    }

    if (varmm < 0 || varmm > 11) {
        return false;
    }

    if (vardd < 1 || vardd > 32) {
        return false;
    }
    if(vardd > get_nepali_month_day(varyy, varmm))
    {
        return false;
    }
    return true;
}

/**
 * currently can only calculate the date between AD 1944-2033...
 *
 *  param integer varyy
 *  param integer varmm	Note:month is based on 0 to 11
 *  param integer vardd
 *  return DateInfo
 *
 */
function gregorianToNepali(varyy, varmm, vardd) {
    var varnep_date = {};
    if(is_range_eng(varyy, varmm, vardd) === false)
    {
        varnep_date.result = 0;
        return  varnep_date;
    }
    var g_days = gregorianToJulianDay(varyy, varmm, vardd);

    g_days = g_days - nepalmindate;

    var n_days = 0;
    var i = Math.floor(g_days / 365)- 1;
    while(vardaynum[i+1][14] < g_days)
    {
        i++;
    }
    n_days = vardaynum[i][14];

    var j = 1;
    while(vardaynum[i][j] < g_days - n_days)
    {
        n_days += vardaynum[i][j];
        j++;
    }

    varnep_date.result = 1;
    varnep_date.year = minNepalYear + i;//vardaynum[i][0];
    varnep_date.month = j - 1;
    varnep_date.day = g_days - n_days;

    //varnep_date.local_month = get_nepali_month_nep(varnep_date.month);
    //varnep_date.latin_month = get_nepali_latin_month(varnep_date.month);
    //varnep_date.local_date  = varnep_date.year + '-' + varnep_date.local_month + '-' +varnep_date.day;
    return varnep_date;
}

/**
 * currently can only calculate the date between BS 2000-2089
 *
 *  param unknown_type varyy
 *  param unknown_type varmm Note:month is based on 0 to 11
 *  param unknown_type vardd
 *  return unknown
 */
function nepaliToGregorian(varyy, varmm, vardd) {

    if(is_range_nep(varyy, varmm, vardd) === false)
    {
        var varnep_date = {};
        varnep_date.result = 0;
        return  varnep_date;
    }

    /* days form 1950-1-1(Nepal) to input date */
    var n_days = vardaynum[varyy - minNepalYear][14];
    for(i = 1; i <= varmm; i++)
    {
        n_days += vardaynum[varyy - minNepalYear][i];
    }
    n_days += parseInt(vardd,10);

    var ret = julianDayToGregorian(n_days + nepalmindate);

    ret.result = 1;

    return ret;
}
/*
return day number of a month Note:month is based on 0 to 11
*/
function  get_nepali_month_day(year, month) {
    return vardaynum[year-minNepalYear][month+1];
}

/*******************************************************************************
nepali convert end
*******************************************************************************/

/*******************************************************************************
persian calendar conversion
*******************************************************************************/
/*******************************************************************************
convert persian month to string ( english and lcoal language)
*******************************************************************************/
function get_persian_latin_month(imonth){
    var persian_month_latin = [
    "Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar",
    "Mehr","Aban","Azar","Dey","Bahman","Esfand"];
    return persian_month_latin[imonth];
}

function get_persian_native_month(imonth){
    var persian_month_native = [
        "\u0641\u0631\u0648\u0631\u062f\u06cc\u0646",
        "\u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a",
        "\u062e\u0631\u062f\u0627\u062f",
        "\u062a\u06cc\u0631",
        "\u0645\u0631\u062f\u0627\u062f",
        "\u0634\u0647\u0631\u06cc\u0648\u0631",
        "\u0645\u0647\u0631",
        "\u0622\u0628\u0627\u0646",
        "\u0622\u0630\u0631",
        "\u062f\u06cc",
        "\u0628\u0647\u0645\u0646",
        "\u0627\u0633\u0641\u0646\u062f"
    ];
    return persian_month_native[imonth];
}

var EPOCH = 1948321;
var ONE_DAY_MILLIS = 24*60*60*1000;	//millian second of one day
var JULIAN_EPOCH_MILLIS = -2440588 * ONE_DAY_MILLIS;			//1970.1.1 Julian days


/*******************************************************************************
 * get persian date from gregorian date
 * input:
        gregorian date (year, month, day)
		Note:month is based on 0 to 11
 * return
        persian date {year, month, day}
 ******************************************************************************/
function gregorianToPersian(yearValue,monthValue,dayValue) {

	//
	var julianDay = gregorianToJulianDay(yearValue, monthValue, dayValue);
	//
	var result = julianToPersian(julianDay);

	return result;
}

 /*******************************************************************************
 * get JulianDays from gregorian date
 * input:
        gregorian date (year, month, day) month is based on 0
 * return
        julian days;
 ******************************************************************************/
function gregorianToJulianDay(year, month, day) {
    var date = new Date(year, month, day, 8, 0, 0);
    var datediff = date - JULIAN_EPOCH_MILLIS;
    return Math.floor(datediff / ONE_DAY_MILLIS);
}


 /*******************************************************************************
 * convert julian days to Persian
 * input: julianDays
 * return persian date
 ******************************************************************************/
function julianToPersian(j) {
	var a = j - persianToJulian(475, 0, 1);
	var b = div(a, 1029983);
	var c = mod(a, 1029983);
	var d = c != 1029982 ? div(2816 * c + 1031337, 1028522) : 2820;
	var year = 474 + 2820 * b + d;
	var f = (1 + j) - persianToJulian(year, 0, 1);
	var month = f > 186 ? Math.ceil((f - 6) / 30) - 1 : Math.ceil(f / 31) - 1;
	var day = j - (persianToJulian(year, month, 1) - 1);

	var persianDate = {};
	persianDate.year = year > 0 ? year : year - 1;
	persianDate.month = month + 1;
	persianDate.day = day;

	persianDate.latin_month = get_persian_latin_month(month);
	persianDate.local_month = get_persian_native_month(month);

	return persianDate;//
}


/*******************************************************************************
 * get gregorian date from persian date
 * input:
        persian date (year, month, day)
		Note:month is based on 0 to 11
 * return
        gregorian date {year, month, day}
 ******************************************************************************/
function persianToGregorian(persiaYear,persiaMonth,persiaDay) {

	//
	var julianDay = persianToJulian(persiaYear > 0 ? persiaYear : persiaYear + 1, persiaMonth, persiaDay);
	//
	var gregorian =	julianDayToGregorian( julianDay );

	return gregorian;
}

 /*******************************************************************************
 * convert persian calendar To Julian
 * input value  date of persian
 * return : julian days;
 ******************************************************************************/
function persianToJulian(y, m, d) {
	var a = y - 474;
	var b = mod(a, 2820) + 474;
	return (EPOCH - 1) + 1029983 * div(a, 2820) + 365 * (b - 1)
			+ div(682 * b - 110, 2816) + (m > 6 ? 30 * m + 6 : 31 * m) + d;
}

/*******************************************************************************
 * convert julian days to Gregorian
 * input: julianDays
 * return Gregorian date
 ******************************************************************************/
function julianDayToGregorian(julianDay) {

	var datetimevalue = JULIAN_EPOCH_MILLIS
			+ julianDay	* ONE_DAY_MILLIS ;
			//+ mod(new Date() - JULIAN_EPOCH_MILLIS,ONE_DAY_MILLIS);

	var current = new Date(datetimevalue);
	var gregorianDate = {};
	gregorianDate.year = current.getFullYear();
	gregorianDate.month = current.getMonth();
	var day = current.getDate().toString();
	
	if (day.length == 1) {
	    day = "0" + day;
	}
	gregorianDate.day = day;
	//gregorianDate.latin_month = get_english_month(current.getMonth()+1);
	//gregorianDate.local_month = get_english_month(current.getMonth()+1);

	return gregorianDate;

}

function div(a, b) {
	return Math.floor(a / b);
}

function mod(a, b) {
	return (a - b * Math.floor(a / b));
}



/*******************************************************************************
when year is leap year return 1 not return 0
 ******************************************************************************/
function is_persian_leap_year(iranYear)
{
    var t = (iranYear + 38) * 31.0 / 128;
    var intPart = Math.floor(t);
    var comValue = intPart + 0.31;
    if (t < comValue) {
        t1 = (iranYear - 1 + 38) * 31.0 / 128;
        intPart1 = Math.floor( t1);
        comValue1 = intPart1 + 0.31;
        if (t1 >= comValue1) {return true;}
    }
    return false;
}
/*******************************************************************************
get month days in persian calendar
month 1-6 =31
month 7-11 = 30
month 12 leap year = 30  nonleap year =  29
Note:month is based on 0 to 11
 ******************************************************************************/
function get_persian_month_day(year, month)
{
    var iran_month_days = [31,31,31,31,31,31,
                         30,30,30,30,30,29];
     var  leap_iran_month_days = [31,31,31,31,31,31,
                         30,30,30,30,30,30];

    if(is_persian_leap_year(year))
    {
        return leap_iran_month_days[month];
    }
    else
    {
        return iran_month_days[month];
    }
}
/*******************************************************************************
persian convert end
*******************************************************************************/

/*******************************************************************************
islamic convert
*******************************************************************************/

/*******************************************************************************
islamic convert end
*******************************************************************************/

