$(function(){
    let clickedG = 0;
    $("#game").on("click",function(event){
        if(clickedG==0){
            $("#gameNav").css("height","500px");
            $("#gameNav").css("padding","20px");
            $("#contactArea").css("height","0px");
            $("#contactArea").css("padding","0px");
            clickedG = 1;
            clickedC = 0;
        } else {
            $("#gameNav").css("height","0px");
            $("#gameNav").css("padding","0px");
            clickedG = 0;
        }
        console.log("hahahah")
    })

    let clickedC = 0;
    $("#contact").on("click",function(event){
        if(clickedC==0){
            $("#contactArea").css("height","450px");
            $("#contactArea").css("padding","20px");
            $("#gameNav").css("height","0px");
            $("#gameNav").css("padding","0px");
            clickedC = 1;
            clickedG = 0;
        } else {
            $("#contactArea").css("height","0px");
            $("#contactArea").css("padding","0px");
            clickedC = 0;
        }
        console.log("hahahah")
    })
})