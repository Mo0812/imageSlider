

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

if(options.linkClickEnabled!=null)
    var linkClickEnabled=options.linkClickEnabled;
else
    linkClickEnabled=false;

if(options.linkTotalEnabled!=null)
    var linkTotalEnabled=options.linkTotalEnabled;
else
    linkTotalEnabled=false;

if(options.navigationType!=null)
    var navigationType=options.navigationType;
else
    navigationType="bubbles";

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
       toggleLink(nextId);
    });
    
    toggleMenuElement(nextId);
    
}

function showLogo(logoId) {
    

    var el=$("#slidingImage");
        el.fadeOut(fadeOutTime,function(){
                el.attr("src",images[logoId]['path']);
                el.attr("data-actid",logoId).fadeIn(fadeInTime);
                toggleInfoText(logoId);
                toggleLink(logoId);
            });


    toggleMenuElement(logoId);
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

function hasLink(imageId) {
    if(images[imageId]['link']==null) {
        return false;
    } else
        return true;
}

function openLink(imageId) {
    if(hasLink(imageId)) {
        location.href=images[imageId]['link'];
     } else {
        changeLogo();
     }
}

function toggleLink(imageId) {
    if(hasLink(imageId) && linkTotalEnabled) {
        $("#infoText").find("a#linkReferer").attr("href",images[imageId]['link']).text(cutLink(images[imageId]['link']));
    }
    else {
        $("#infoText").find("a#linkReferer").text("");
    }
}

function cutLink(link) {
    link=String(link);
    var linkArr=link.split('/');
    return linkArr[0]+"//"+linkArr[2];
    
    
}

function toggleMenuElement(imageId) {
    $("."+navigationType).each(function() {
        if($(this).hasClass("active") && $(this).data("id")!=imageId)
            $(this).removeClass("active");
        else if($(this).data("id")==imageId)
            $(this).addClass("active");
    });
} 

function initializeMenu() {
    if(navigationType=="slice") {
        $("#navigation").css("width","100%");
        $("#navigation").css("margin","0");
        $(".slice").css("width",(imgx/3)+"px");
    }
    else if(navigationType=="bubble") {
        $("#navigation").css("width",arrLen*30+"px");
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
                var menuEl=$('<p class="menu active" data-id="'+i+'" ></p>').appendTo("#navigation");
                menuEl.addClass(navigationType);
                $("#slidingImage").attr("data-actid",i);
                $("#slidingImage").attr("src",images[i]['path']);
                toggleInfoText(i);
                toggleLink(i);
            }
            else {
                var menuEl=$('<p class="menu" data-id="'+i+'" ></p>').appendTo("#navigation");
                menuEl.addClass(navigationType);
            }
            
        }
        
        initializeMenu();
        
        //EVENTHANDLING
        $("#slidingImage").click(function(e) {
            if(linkClickEnabled) {
                var imageId=$(this).attr("data-actid");
                openLink(imageId);
            } /*else
                changeLogo();*/
        }); 

        $("."+navigationType).click(function (e) {
            var logoId=$(this).data("id");
            showLogo(logoId);
        });
        
        //TIMERSETTINGS
        var timer=setInterval(changeLogo,delay);
        $('#slideContainer').hover(function(ev){
            clearInterval(timer);
        }, function(ev){
            timer = setInterval( changeLogo, delay);
        });
        
        $("#slideContainer").touchwipe({
            wipeLeft: function() { changeLogo(); },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: false
        });

});