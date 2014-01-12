<html>
    <head>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <link rel="stylesheet" type="text/css" href="css/slider.css" media="all" />
        <script>
            var imgArray=["imageFolder/1.jpg","imageFolder/3.jpg","imageFolder/4.jpg"];
            
            var options={
                "delay": 10000,
                "fadeInTime": 500,
                "fadeInAnimation": "",
                "fadeOutTime": 500,
                "fadeOutAnimation": ""
            }
        </script>
        <script src="scripts/slider.js"></script>
        
    </head>
    
    <body>	

        <div id="slideContainer">
            <img id="slidingImage" border="0" src="" data-actid="">
            <div id="bubbles">
            </div>
        </div>
                                
    </body>	
</html>