document.write('<script type="text/javascript" src="scripts/touchswipe.js"></script>');


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

if(options.overallMode!=null)
    var overallMode=options.overallMode;
else
    overallMode="normal";

if(options.colorTheme!=null)
    var colorTheme=options.colorTheme;
else
    colorTheme="white";

var ratio=imgx/imgy;

function changeLogo() {
    var el=$("#slidingImage");
    var actId=parseInt(el.attr("data-actid"));
    var nextId=actId+1;
    
    if(nextId>=arrLen)
        nextId=0;   
    
    el.fadeOut(fadeOutTime,function() {
        
       el.attr("src",images[nextId]['path']);
       el.attr("data-actid",nextId);
       el.load(function() { //WAITS FOR LOADING THE IMAGE
            captureImage(el,function() {
                el.fadeIn(fadeInTime);
            });  
       });
       
       
       toggleInfoText(nextId);
       toggleLink(nextId);
    });
    
    toggleMenuElement(nextId);
    
}

function showLogo(logoId) {
    

    var el=$("#slidingImage");
        el.fadeOut(fadeOutTime,function(){
                el.attr("src",images[logoId]['path']);
                el.attr("data-actid",logoId);
                el.load(function() { //WAITS FOR LOADING THE IMAGE
                    captureImage(el,function() {
                        el.fadeIn(fadeInTime);
                    });  
                });
                
                toggleInfoText(logoId);
                toggleLink(logoId);
            });


    toggleMenuElement(logoId);
}

function lastLogo() {
    var el=$("#slidingImage");
    var actId=parseInt(el.attr("data-actid"));
    var nextId=actId-1;
    
    if(nextId<0)
        nextId=arrLen-1;   
    
    el.fadeOut(fadeOutTime,function() {
       el.attr("src",images[nextId]['path']);
       el.attr("data-actid",nextId);
       el.load(function() { //WAITS FOR LOADING THE IMAGE
            captureImage(el,function() {
                el.fadeIn(fadeInTime);
            });  
        });
                
       toggleInfoText(nextId);
       toggleLink(nextId);
    });
    
    toggleMenuElement(nextId);
    
}

function captureImage(el,fnCallback) {
    var elx=0;
    var ely=0;

    if(ratio>=1) {
        elx=el.width();
        ely=el.height();
        var elratio=elx/ely;
        
        if(ratio<=elratio && elratio>=1) { //Bild breit - Bild breiter als Container
            el.css("width","");
            el.css("height",imgy);

            var diffx=(el.width()-imgx)/2;
            var diffy=0;
            el.css("margin-top",diffy);
            el.css("margin-left","-"+diffx);
        } else if(ratio>elratio && elratio>=1) { //Bild breit - Bild höher als Container 
            el.css("width",imgx);
            el.css("height","");

            diffx=0;
            diffy=(el.height()-imgy)/2;
            el.css("margin-top","-"+diffy);
            el.css("margin-left",diffx);
        } else if(elratio<1) { //Bild hoch
            el.css("width","");
            el.css("height",imgy);

            diffx=(imgx-el.width())/2;
            diffy=0;
            el.css("margin-top",diffy);
            el.css("margin-left",diffx);
        }
    } else {
        elx=el.width();
        ely=el.height();
        var elratio=ely/elx;
        if(ratio<=elratio && elratio>=1) { //Bild hoch - Bild breiter als Container
            el.css("width",imgx);
            el.css("height","");

            var diffx=0;
            var diffy=(el.height()-imgy)/2;;
            el.css("margin-top","-"+diffy);
            el.css("margin-left",diffx);
        } else if(ratio>elratio && elratio>=1) { //Bild breit - Bild höher als Container 
            el.css("width","");
            el.css("height",imgy);

            diffx=(el.width()-imgx)/2;;
            diffy=0;
            el.css("margin-top",diffy);
            el.css("margin-left","-"+diffx);
        } else if(elratio<1) { //Bild breit
            el.css("width",imgx);
            el.css("height","");

            diffx=0;
            diffy=(imgy-el.height())/2;
            el.css("margin-top",diffy);
            el.css("margin-left",diffx);
        }
    }
    if(fnCallback)
        fnCallback();
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
    if(overallMode=="normal") {
        for(var i=0;i<arrLen;i++) {
            if(i==0) {
                var menuEl=$('<p class="menu active" data-id="'+i+'" ></p>').appendTo("#navigation");
                menuEl.addClass(navigationType);
               
                $("#slidingImage").attr("data-actid",i);
                $("#slidingImage").attr("src",images[i]['path']);
                $("#slidingImage").load(function() { //WAITS FOR LOADING THE IMAGE
                    captureImage($(this),function() {
                        $(this).fadeIn(fadeInTime);
                    });  
                });
                //captureImage(el);
                toggleInfoText(i);
                toggleLink(i);
            }
            else {
                var menuEl=$('<p class="menu" data-id="'+i+'" ></p>').appendTo("#navigation");
                menuEl.addClass(navigationType);
            }
            if(linkClickEnabled) {
                $("#slidingImage").css("cursor","pointer");
            }
        }
        
        if(navigationType=="slice") {
            $("#navigation").css("width","100%");
            $("#navigation").css("margin","0");
            $(".slice").css("width",(imgx/arrLen)+"px");
        }
        else if(navigationType=="bubble" || navigationType=="modernBubble") {
            $("#navigation").css("width",arrLen*30+"px");
            if(colorTheme=="black")
                $(".menu").addClass("black");
            
        }
        else if(navigationType=="button") {
            $("#navigation").hide();
            var leftButton=$('<p class="button leftButton"></p>').appendTo("#slideWrapper");
            var rightButton=$('<p class="button rightButton"></p>').appendTo("#slideWrapper");
            
            $('<div class="leftArrow"></div>').appendTo(leftButton);
            $('<div class="rightArrow"></div>').appendTo(rightButton);
            
            leftButton.css("left",0);
            leftButton.css("top",(imgy/2)-40);
            rightButton.css("left",imgx-50);
            rightButton.css("top",(imgy/2)-40);
        }
    } else if(overallMode=="background") {
        $("#navigation").hide();
        $("body").css("margin","0");
        $("body").css("padding","0");
    }
}

$(document).ready(function() {
    
        //INITALIZE
        if(overallMode=="normal") {
            $("#slideContainer").css("width",imgx);
            $("#slideContainer").css("height",imgy);
            $("#slideWrapper").css("width",imgx);
            $("#slideWrapper").css("height",imgy);
        } else {
            $("#slideContainer").css("width","100%");
            $("#slideContainer").css("height","100%");
            $("#slideWrapper").css("width","100%");
            $("#slideWrapper").css("height","100%");
        }
        
        initializeMenu();
        
        //EVENTHANDLING
        $("#slidingImage").click(function(e) {
            if(linkClickEnabled) {
                var imageId=$(this).attr("data-actid");
                openLink(imageId);
            }
        }); 

        $("."+navigationType).click(function (e) {
            if(navigationType!="button") {
                var logoId=$(this).data("id");
                showLogo(logoId);
            }
        });
        
        $(".leftButton").click(function (e) {
           lastLogo(); 
        });
        
        $(".rightButton").click(function (e) {
           changeLogo(); 
        });
        
        $("#slideWrapper").hover(function(e){
           $(".button").each(function() {
               $(this).stop().fadeIn(50); 
           });
        },function() {
            $(".button").each(function() {
                $(this).stop().fadeOut(50);
            });
        });
        
        //TIMERSETTINGS
        if(navigationType!="button") {
            var timer=setInterval(changeLogo,delay);
            $('#slideContainer').hover(function(ev){
                clearInterval(timer);
            }, function(ev){
                timer = setInterval( changeLogo, delay);
            });
        }
        
        $("#slideContainer").touchwipe({
            wipeLeft: function() {changeLogo();},
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: false
        });

});