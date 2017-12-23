var mainApp = angular.module("angularApp", ['ngSanitize']);

mainApp.controller("theInfoBase", function ($scope) {

  //load info items and org items
  if (typeof projectFullViews != "undefined") {
    $scope.projects = projectFullViews.projects;
    $scope.currentProjectId = $scope.projects[0].projectId;
  }

  if (typeof reviewFullViews != "undefined") {
    $scope.reviews = reviewFullViews.reviews;
    $scope.currentReviewId = $scope.reviews[0].reviewId;
  }
 
  if (typeof foodHierarchies != "undefined") {
    $scope.types = foodHierarchies.types;
  }
 
  if (typeof foodAssociations != "undefined") {
    $scope.associations = foodAssociations.associations;  }
 
  if (typeof foodSequences != "undefined") {
    $scope.sequences = foodSequences.foods;
  }

  if (typeof foodIndexes != "undefined") {
    $scope.indexes = foodIndexes.foods;
  }



  //set the initial values of page display variables we use
  $scope.items = ["projects","reviews"];
  $scope.projectTypes = ["Data Engineer","Data Science","Mobile Development","Visualization"];
  $scope.reviewTypes = ["Movie","TV Series","Music","Product"];
  $scope.pageType = "home";
  $scope.currentProjectType = "all";
  $scope.currentReviewType = "all";

  //define page display functions
  $scope.setCurrentPageType = function (pageType) {
    $scope.pageType = pageType;
  };

  $scope.setCurrentProjectType = function (projectType) {
    $scope.currentProjectType = projectType;
  };

  $scope.setCurrentReviewType = function (reviewType) {
    $scope.currentReviewType = reviewType;
  };

  $scope.setCurrentProjectAndType = function (projectId,projectType) {
    $scope.currentProjectId = projectId;
    $scope.currentProjectType = projectType;
  }

  $scope.setCurrentReviewAndType = function (reviewId,reviewType) {
    $scope.currentReviewId = reviewId;
    $scope.currentReviewType = reviewType;
  }

  $scope.setCurrentNavType = function (navType) {
    $scope.navType = navType;
  };

  
  $scope.setCurrentPageAndProjectID = function (pageType,projectId) {
    $scope.pageType = pageType;
    $scope.currentProjectId = projectId;
  };

  $scope.setCurrentPageAndReviewID = function (pageType,reviewId) {
    $scope.pageType = pageType;
    $scope.currentReviewId = reviewId;
  };


  $scope.setCurrentPageAndNav = function (pageType,navType) {
    $scope.pageType = pageType;
    $scope.navType = navType;
  };

  $scope.addProjectFullView = function(project){
    $('.fullView').empty();
    $('.fullView').append("<h1></h1>");
    $('.fullView').append('<p class="fullViewDesc"></p>');
    $('.fullView').append('<div class="fullViewPic"></div>');
    $('.fullView h1').html(project.projectName);
    $('.fullView .fullViewDesc').html(project.projectDesc);
    $('.fullViewPic').css("background-image",'url('+project.projectImg+')');
    console.log(project.projectId);
  }

  $scope.addReviewFullView = function(review){
    $('.fullView').empty();
    $('.fullView').append("<h1></h1>")
    $('.fullView').append('<div class="fullViewPic"></div>')
    $('.fullView h1').html(review.reviewName);
    $('.fullViewPic').css("background-image",'url('+review.reviewImg+')');
    console.log(review.reviewId);
  }

  $scope.drawTimelineHeader = function(){
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


});
