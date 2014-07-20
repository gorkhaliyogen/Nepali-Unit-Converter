app.service("mathService",function(){
	this.round=function(val,n){
		var num=1;
		for( i=1;i<=n;i++)
		{
			num=num*10;
		}
		return Math.round(val*num)/num;
	}
	
});
