app.service("areaService", function () {
    this.area = function () {
        return {
            ropani: "",
            aana: "",
            paisa: "",
            daam: "",
            sqFt: "",
            sqM: "",
            bigaha: "",
            kathha: "",
            dhur: ""
        }
    }
	this.BKDToSqM=function(bigaha,kathha,dhur)
	{
	
			var area = 0;
			area += bigaha * 6772.631616;
			area += kathha * 338.6315808;
			area += dhur * 16.93157904;
			return area;
	}
	this.BKDToSqFt=function(bigaha,kathha,dhur)
	{
			var area = 0;
			area += bigaha * 72900.0000;
			area += kathha * 3645.0000;
			area += dhur * 182.2500;
			return area;
	}
	this.RAPDToSqFt=function(ropani,aana,paisa,daam)
	{
		var area = 0;
		area += ropani * 5476.0000;
		area += aana * 342.2500;
		area += paisa * 85.5625;
		// if (parseFloat(daam) < 4) {
		area += daam * 21.390625;
		//s }
		return area;
	}
	this.RAPDToSqMt=function(ropani,aana,paisa,daam){
		var area = 0;
		area += ropani * 508.73704704;
		area += aana * 31.79606544;
		area += paisa * 7.94901636;
		//if (parseFloat(daam) < 4) {
		area += daam * 1.98725409;
		//}
		return area;
	}
	this.SqftToRAPD=function(sqFt)
	{
		var totalDaam = sqFt / 21.390625;
		var paisa = parseInt(totalDaam / 4);
		var daam = totalDaam % 4;
		var aana = parseInt(paisa / 4);
		paisa %= 4;
		var ropani = parseInt(aana / 16);
		aana = aana % 16;
		if (daam > 3.999) {
			daam = 0;
			paisa += 1;
		}
		if (paisa > 3) {
			paisa = 0;
			aana += 1;
		}
		if (aana > 15) {
			aana = 0;
			ropani += 1;
		}
		
		var area = this.area();
		area.daam = daam;
		area.ropani = ropani;
		area.paisa = paisa;
		area.aana = aana;
		return area;
	}
	this.SqMtToRAPD=function(sqMt){
		var totalDaam = sqMt / 1.98725409;
		var paisa = parseInt(totalDaam / 4);
		var daam = totalDaam % 4;
		var aana = parseInt(paisa / 4);
		paisa = paisa %= 4;
		var ropani = parseInt(aana / 16);
		aana = aana % 16;
		if (daam > 3.999) {
			daam = 0;
			paisa += 1;
		}
		if (paisa > 3) {
			paisa = 0;
			aana += 1;
		}
		if (aana > 15) {
			aana = 0;
			ropani += 1;
		}
		var area = this.area();
		area.daam = daam;
		area.ropani = ropani;
		area.paisa = paisa;
		area.aana = aana;
		return area;
	}
	this.SqFtToBKD=function(sqFt){
		var totalBigaha = sqFt / 72900;
		var totalDhur = totalBigaha * 400;
		var kathha = parseInt(totalDhur / 20);
		var dhur = totalDhur % 20;
		var bigaha = parseInt(kathha / 20);
		kathha = kathha %= 20;
		if (dhur > 19.999) {
			dhur = 0;
			kathha += 1;
		}
		if (kathha > 19) {
			kathha = 0;
			bigaha += 1;
		}
		var area = this.area();
		area.dhur = dhur;
		area.kathha = kathha;
		area.bigaha = bigaha;
		return area;
	}
	this.SqMtToBKD=function(sqMt){
		var totalBigaha = sqMt / 6772.631616;
		var totalDhur = totalBigaha * 400;
		var kathha = parseInt(totalDhur / 20);
		var dhur = totalDhur % 20;
		var bigaha = parseInt(kathha / 20);
		kathha = kathha %= 20;
		if (dhur > 19.999) {
			dhur = 0;
			kathha += 1;
		}
		if (kathha > 19) {
			kathha = 0;
			bigaha += 1;
		}
		var area = this.area();
		area.dhur = dhur;
		area.kathha = kathha;
		area.bigaha = bigaha;
		return area;
	}
})
