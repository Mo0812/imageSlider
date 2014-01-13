

//var imgArray=["imageFolder/1.jpg","imageFolder/3.jpg","imageFolder/4.jpg"];
var arrLen=images.length;

//JSON OPTIONS
if(options.delay!=null)
    var delay=options.delay;
else
    delay=10000;

if(options.imgx!=null)
    var imgx=options.imgx;
else
    imgx=900;

if(options.imgy!=null)
    var imgy=options.imgy;
else
    imgy=675;
    
if(options.fadeInTime!=null)
    var fadeInTime=options.fadeInTime;
else
    fadeInTime=500;

if(options.fadeOutTime!=null)
    var fadeOutTime=options.fadeOutTime;
else
    fadeOutTime=500;

if(options.infoTextEnabled!=null)
    var infoTextEnabled=options.infoTextEnabled;
else
    infoTextEnabled=false;

function changeLogo() {
    var el=$("#slidingImage");
    var actId=parseInt(el.attr("data-actid"));
    var nextId=actId+1;
    
    if(nextId>=arrLen)
        nextId=0;
    
    el.fadeOut(fadeOutTime,function() {
       el.attr("src",images[nextId]['path']);
       el.attr("data-actid",nextId).fadeIn(fadeInTime);
       toggleInfoText(nextId);
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
                el.attr("src",images[logoId]['path']).fadeIn(fadeInTime);
            });


    $(".bubble").each(function() {
        if($(this).hasClass("active") && $(this).data("id")!=logoId)
            $(this).removeClass("active");
        else if($(this).data("id")==logoId)
            $(this).addClass("active");
    });
}

function hasInfoText(imageId) {
    if(images[imageId]['text']==null) {
        return false;
    } else
        return true;
}

function toggleInfoText(imageId) {
    if(hasInfoText(imageId) && infoTextEnabled) {
           $("#infoText").find("p").text(images[imageId]['text']);
           $("#infoText").show();
       }
       else {
           $("#infoText").hide();
       }
}

$(document).ready(function() {
    
        //INITALIZE
        $("#slideContainer").css("width",imgx);
        $("#slideContainer").css("height",imgy);
        $("#slidingImage").css("width",imgx);
        $("#slidingImage").css("height",imgy);
        
        for(var i=0;i<arrLen;i++) {
            if(i==0) {
                $("#bubbles").append('<p class="bubble active" data-id="'+i+'" ></p>');
                $("#slidingImage").attr("data-actid",i);
                $("#slidingImage").attr("src",images[i]['path']);
                toggleInfoText(i);
            }
            else
                $("#bubbles").append('<p class="bubble" data-id="'+i+'" ></p>');
            
        }
        $("#bubbles").css("width",arrLen*30+"px");
        
        //EVENTHANDLING
        $("#slidingImage").click(function(e) {
            changeLogo();
        });  

        $(".bubble").click(function (e) {
            var logoId=$(this).data("id");
            showLogo(logoId);
        })
        
        //TIMERSETTINGS
        var timer=setInterval(changeLogo,delay);
        $('#slidingImage').hover(function(ev){
            clearInterval(timer);
        }, function(ev){
            timer = setInterval( changeLogo, delay);
        });

});