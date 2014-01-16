<html>
    <head>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <link rel="stylesheet" type="text/css" href="css/slider.css" media="all" />
        <script>
            
            var images=[
                {
                    "path": "imageFolder/1.jpg",
                    "text": "Imageslider",
                    "link": "http://www.mck-web.de"
                },
                {
                    "path": "imageFolder/3.jpg"
                },
                {
                    "path": "imageFolder/4.jpg"
                }
            ];
                
        </script>
        <script src="scripts/options.json"></script>
        <script src="scripts/slider.js"></script>
        
    </head>
    
    <body>	

        <div id="slideContainer">
            <img id="slidingImage" border="0" src="" data-actid="">
            <div id="infoText"><p></p><a id="linkReferer"></a></div>
            <div id="bubbles">
            </div>
        </div>
                                
    </body>	
</html>