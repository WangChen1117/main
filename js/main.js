$(function () {
    var $win = $(window);
    var winWidth = $win.width();

    if(winWidth<688){
            $("#navig").css("width","0%");
            $("#content").css("width","100%");
        }
        else{
            $("#navig").css("width","30%");
            $("#content").css("width","70%");
        }

        if (winWidth>996) {
            $("#descArea").css("width","60%");
            $("#profileArea").css("width","40%");
            $("#descArea").css("float","left");
            $("#profile").css("left","20px");
            // $("#profileArea").css("float","left");
        } else {
            $("#descArea").css("width","100%");
            $("#profileArea").css("width","100%");
            $("#descArea").css("float","");
            $("#profileArea").css("float","");
            $("#profile").css("left","0px");
        }

    $win.scroll(function () {
        if ($win.scrollTop() == 0) {
            $("#leftOpening").css("width","60%");
            $("#rightOpening").css("width","40%");
            $("#content").css("width","0px");
            $("#navig").css("width","0px")
        }

        else{
            $("#leftOpening").css("width","0px");
            $("#rightOpening").css("width","0px");
            $("#navig").css("width","30%");
            $("#content").css("width","70%");
        }

        if($win.width()<688){
            $("#navig").css("width","0%");
            $("#content").css("width","100%");
        }
    });

    $win.resize(function(){
        var winWidth = $win.width();

        if(winWidth<688){
            $("#navig").css("width","0%");
            $("#content").css("width","100%");
        }
        else{
            $("#navig").css("width","30%");
            $("#content").css("width","70%");
        }

        if (winWidth>996) {
            $("#descArea").css("width","60%");
            $("#profileArea").css("width","40%");
            $("#descArea").css("float","left");
            $("#profile").css("left","20px")
            // $("#profileArea").css("float","left");
        } else {
            $("#descArea").css("width","100%");
            $("#profileArea").css("width","100%");
            $("#descArea").css("float","");
            $("#profileArea").css("float","");
            $("#profile").css("left","0px")
        }
    })

    var navs = $('.nav');
    for (var i = navs.length - 1; i >= 0; i--) {
        navs[i].addEventListener("click",function(){
            $(".nav.active").removeClass("active");
            this.className += " active"
        })
    }

    var projectNavs = $('.titleBox');
    for (var i = projectNavs.length - 1; i >= 0; i--) {
        projectNavs[i].addEventListener("click",function(){
            $(".titleBox.active").removeClass("active");
            this.className += " active"
        })
    }
    // for (var i = 0; i < navs.length; i++) {
    //     navs[i].addEventListener("click",function(){
    //         var currentNav = $()
    //     })
    // }

    $('body').scrollspy({target: "#navig", offset: 50});   

  // Add smooth scrolling on all links inside the navbar
    $("#navig a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
      // Prevent default anchor click behavior
        event.preventDefault();

      // Store hash
        var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top-200
        }, 800);
      }  // End if
    });

    createInitAni();

    createIntroAni();

    // Add hover effect to Experiences description
    $(".jobDesc").hover(function(){
        $(this).height(300);
    },function(){
        $(this).height(70);
    })

    $(".projectHe").click(function(){
        console.log($(this)[0].innerHTML)
    })



    
        

});

function createInitAni(){
    var x=0;
    var textList = ["SMART !","SEXY !","YOU AND ME !"];
    function changeText(){
        x = (x === textList.length - 1) ? 0 : x + 1;
        $("#changeText").text(textList[x])
    }

    setInterval(changeText,2048)
}


function createIntroAni() {
    var rotation1 = 45;
    var rotation2 = 0;
    function rotate(){
        rotation1 += 45;
        rotation2 -= 45;
        $("#rect1").css({
            '-webkit-transform' : 'rotate('+ rotation1 +'deg)',
            '-moz-transform' : 'rotate('+ rotation1 +'deg)',
            '-ms-transform' : 'rotate('+ rotation1 +'deg)',
            'transform' : 'rotate('+ rotation1 +'deg)'
        })
        $("#rect2").css({
            '-webkit-transform' : 'rotate('+ rotation2 +'deg)',
            '-moz-transform' : 'rotate('+ rotation2 +'deg)',
            '-ms-transform' : 'rotate('+ rotation2 +'deg)',
            'transform' : 'rotate('+ rotation2 +'deg)'
        })
    }
    setInterval(rotate,1700)

    var introSvg = d3.select("#introAni")
        .append("svg")
        .attr("height",$("#introAni").height())
        .attr("width",$("#introAni").width())

    introSvg
        .append("text")
        .attr("class","deepshadow")
        .attr("x",152.5)
        .attr("y",237.5)
        .text("W")
        .style("fill","white")
        .style("font-size",100)
        .style("font-weight","bold")

    var clicked = 0;
    $("#rect2").click(function(){
        if (clicked==0) {
            $("#rect2").css("width",300);
            $("#rect2").css("height",300);
            $("#rect2").css("top",50);
            $("#rect2").css("left",50);
            $("#rect1").css("width",300);
            $("#rect1").css("height",300);
            $("#rect1").css("top",50);
            $("#rect1").css("left",50);
            clicked = 1;
        }
        else{
            $("#rect2").css("width",200);
            $("#rect2").css("height",200);
            $("#rect2").css("top",100);
            $("#rect2").css("left",100);
            $("#rect1").css("width",200);
            $("#rect1").css("height",200);
            $("#rect1").css("top",100);
            $("#rect1").css("left",100);
            clicked = 0;
        }
    })
    
}