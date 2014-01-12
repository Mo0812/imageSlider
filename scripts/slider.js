

//var imgArray=["imageFolder/1.jpg","imageFolder/3.jpg","imageFolder/4.jpg"];
var arrLen=imgArray.length;

//JSON OPTIONS
if(options.delay!=null)
    var delay=options.delay;
else
    var delay=10000;
    
if(options.fadeInTime!=null)
    var fadeInTime=options.fadeInTime;
else
    var fadeInTime=500;

if(options.fadeOutTime!=null)
    var fadeOutTime=options.fadeOutTime;
else
    var fadeOutTime=500;

function changeLogo() {
    var el=$("#slidingImage");
    var actId=parseInt(el.attr("data-actid"));
    var nextId=actId+1;
    
    if(nextId>=arrLen)
        nextId=0;
    
    el.fadeOut(fadeOutTime,function() {
       el.attr("src",imgArray[nextId]);
       el.attr("data-actid",nextId).fadeIn(fadeInTime);
    });
    
    $(".bubble").each(function() {
        if($(this).hasClass("active") && $(this).data("id")!=nextId)
            $(this).removeClass("active");
        else if($(this).data("id")==nextId)
            $(this).addClass("active");
    });
    
}

function showLogo(logoId) {
    

    var el=$("#slidingImage");
        el.fadeOut(fadeOutTime,function(){
                el.attr("src",imgArray[logoId]).fadeIn(fadeInTime);
            });


    $(".bubble").each(function() {
        if($(this).hasClass("active") && $(this).data("id")!=logoId)
            $(this).removeClass("active");
        else if($(this).data("id")==logoId)
            $(this).addClass("active");
    });
}

$(document).ready(function() {
    
        //INITALIZE
        for(var i in imgArray) {
            if(i==0) {
                $("#bubbles").append('<p class="bubble active" data-id="'+i+'" data-src="'+imgArray[i]+'"></p>');
                $("#slidingImage").attr("data-actid",i);
                $("#slidingImage").attr("src",imgArray[i]);
            }
            else
                $("#bubbles").append('<p class="bubble" data-id="'+i+'" data-src="'+imgArray[i]+'"></p>');
            
        }
        $("#bubbles").css("width",arrLen*30+"px");
        

        $("#slidingImage").click(function(e) {
            changeLogo();
        });  

        $(".bubble").click(function (e) {
            var logoId=$(this).data("id");
            showLogo(logoId);
        })

        var timer=setInterval(changeLogo,delay);
        $('#slidingImage').hover(function(ev){
            clearInterval(timer);
        }, function(ev){
            timer = setInterval( changeLogo, delay);
        });

});