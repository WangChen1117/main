//When evey DOM tree is loaded
$(document).ready(
	drawTimelineHeader
);

function drawTimelineHeader(){
	//File path
	var file_name = "data/events.csv"

	//When file is loaded
	d3.csv(file_name, function(error, data) {

		//If no data
		if (error) throw error;

		console.log(data);

		var types = Array.from(new Set(data.map(function(data){return data.eventType})))
		console.log(types)
		
		//Step 1. Define margin
		var margin = {top: 50, right: 10, bottom: 95, left: 10};
		var vis_width = $('#timelineContainer').width() - margin.left - margin.right;
		var vis_height = $('#timelineContainer').height() - margin.top - margin.bottom;

		//Step 2. Append SVG to .visualization
		var svg_timeline = d3.select('#timelineContainer')
			.append('svg').attr('width',$('#timelineContainer').width()).attr('height',$('#timelineContainer').height())
			.append('g').attr("transform", "translate(0,0)");


		//Step 3. Define x, y scales
		var y_scale = d3.scaleTime()
						.domain([new Date(2016,4,1),new Date(2018,3,1)])
						.range([vis_height, 0]);

		y_scale.ticks(d3.timeYear.every(1))

		//define color scale
		var color1 = d3.scaleOrdinal()
	        .domain(["school","work","news","fun"])
	        .range(["#efedf5","#fee6ce","#deebf7","#e5f5e0"])

	    var color2 = d3.scaleOrdinal()
	        .domain(["school","work","news","fun"])
	        .range(["#bcbddc","#fdae6b","#9ecae1","#a1d99b"])

	    var color3 = d3.scaleOrdinal()
	        .domain(["school","work","news","fun"])
	        .range(["#756bb1","#e6550d","#3182bd","#31a354"])

		// x_scale.domain(data.map(function(d) { return d.letter; }));
		
		// var y_scale = d3.scale.linear().range([vis_height,0]);
		// y_scale.domain([0, d3.max(data, function(d) { return d.frequency; })]);
		// console.log(y_scale(d3.max(data, function(d) { return d.frequency; })))
		// //Step 4. Define axes
		// var y_axis = d3.svg.axis().scale(y_scale).orient("left").ticks(10)

		// //Step 5. Append axes
		svg_timeline.append("text")
			.attr("id","timelineTitle")
			.attr("x",40)
			.attr("y",35)
			.text("Moments")
			.style("fill","white")
			.style("font-size","16px")

		svg_timeline.append("g")
			.attr("class", "yAxis")
			.attr("transform", "translate(25,"+margin.top+")")
			.call(d3.axisLeft(y_scale)
				    .ticks(d3.timeYear,1)
					.tickFormat(d3.timeFormat("%y")))
			.selectAll("text");
		
		for (var i = types.length - 1; i >= 0; i--) {
			svg_timeline.append("circle")
				.attr("cx",25)
				.attr("cy",430+i*15)
				.attr("r",5)
				.attr("fill",color2(types[i]))

			svg_timeline.append("text")
				.attr("x",40)
				.attr("y",435+i*15)
				.text(types[i])
				.attr("fill",color2(types[i]))
		}


		// Step 6. Append events circles
		svg_timeline.selectAll(".eventCircles")
			.data(data)
			.enter().append("circle")
			.attr("class","eventCircles")
			.attr("transform", "translate("+margin.left+","+margin.top+")")
			.attr("id",function(d){return "event"+d.eventId})
			.attr("cx",15)
			.attr("cy",function(d){return y_scale(getDate(d.eventDate))})
			.attr("r",5)
			.attr("fill",function(d){return color2(d.eventType)})
			// .attr("stroke","gold")
			.on("mouseover", function(d){
				d3.select(this).attr("r",10);
				// $('#banner').css("background-image",'url('+d.eventPic+')');
			})
			.on("mouseout",function(){
				d3.select(this).attr("r",5)
			})


		svg_timeline.selectAll(".eventNames")
			.data(data)
			.enter().append("text")
			.attr("class","eventNames")
			.attr("transform", "translate("+margin.left+","+margin.top+")")
			.attr("x",30)
			.attr("y",function(d){return y_scale(getDate(d.eventDate))+3.5})
			.text(function(d){return d.eventLabel})
			.style("fill",function(d){return color2(d.eventType)})
			.style("cursor","pointer")
			.style("font-size","11px")
			.on("mouseover", function(d){
				$("#event"+d.eventId).attr("r",10);
				// $('#banner').css("background-image",'url('+d.eventPic+')');
			})
			.on("mouseout",function(d){
				$("#event"+d.eventId).attr("r",5);
				// $("#eventContainer").css("background","rgb(0, 0, 0)")
				$("#eventContainer").css("opacity","0.8")
				
			})
			.on("click",function(d){
				$('#banner').css("background-image",'url('+d.eventPic+')');
				$("#eventContainer").css("opacity","1")
				$("#eventContainer").css("background","rgba(0, 0, 0, .6)")
				$("#eventContainer").css("height","215px")
				$("#eventContainer").empty();
				$("#eventContainer").append("<h2>"+d.eventName+"</h2>")
				$("#eventContainer").append("<p>"+d.eventDesc+"</p>")
					
			})
	});
}

function getDate(date_str){
	year = 20+date_str.split('/')[2];
	month = +date_str.split('/')[0]-1;
	day = +date_str.split('/')[1];
	return new Date(year,month,day);
}