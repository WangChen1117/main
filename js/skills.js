$(function(){
	console.log("hahha");
	//about heading change according to time
	var d = new Date();
	var greeting;
	if (d.getHours()>6 && d.getHours()<12) {
		greeting = "Good Morning, Wang";
	} else if (d.getHours()>=12 && d.getHours()<18) {
		greeting = "Good Afternoon, Wang";
	} else if (d.getHours()>=18 && d.getHours()<24) {
		greeting = "Good Evening, Wang";
	} else {
		greeting = "You should be sleeping now, Wang";
	}

	$("#aboutHead").append(greeting)


	//skills section
	


});