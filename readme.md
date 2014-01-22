# imageslider
### What it's about?
[imageSlider](http://imageslider.mck-web.de) is a very simple, easy to use and fast imageslider for every website. Just follow the [instructions](#installation) below and you learn how to install it at your website.

![Preview](https://github.com/ZoC111/imageSlider/raw/master/imageFolder/imageslider_preview.png "Preview")

### Features
* slides a various number of your images in one frame all around
* can add links to your images to use it also as a navigation tool for your frontpage
* has different styles of navigation below - or none, how you'd like it?!
* can add a text and a shown link in every single slide if you want
* works totaly on JavaScript (JQuery)
* everything what's important got an option! So you can change: the speed of sliding, the animation times, the type of navigation, the reaction on links and additional texts

###Demo
Just take a look at the imageslider right [here](http://imageslider.mck-web.de).

### toDo List
- [x] add a slice-style navigation
- [ ] add a preview image navigation
- [ ] add more sliding animations
- [ ] ...

Theres still a lot to do. If you had found issues tell me please!

### Can I use it?
Yes it's free and for everyone who want's to use it. Feel free to add me to your credits or in the impressum.

## Installation

###First step - Copying
Download the package from this side. Unpack it and open the folder.
Important for you are the folders "css" and "scripts". Let's begin with the stlyesheet. Copy __slider.css__ in the folder you want at your project.
The same you can do with __slider.js__ and __options.json__, just remember the path where it's copied.

###Second step - Linking
Open up "index.html" and look whats inside the `<head>`-tag. The following things you have to copy in the `head` of your project. First begin with the stylesheet:
```html
<link rel="stylesheet" type="text/css" href="YOUR_PATH/slider.css" media="all" />
```
Change the `href`-tag with the path where you copied the __slider.css__ file.

Second you copied the __jQuery__ `<script>`-tags into your project:
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
```
There is nothing to change.

Next starting with the slider scripts themselves:
```html
<script>
    var images=[
        {
            "path": "YOUR_PATH/1.jpg",
            "text": "Imageslider",
            "link": "http://www.mck-web.de"
        },
        {
            "path": "YOUR_PATH/2.jpg"
        },
        {
            "path": "YOUR_PATH/3.png",
            "text": "Fancy Image"
        }
    ];
        
</script>
<script src="YOUR_PATH/options.json"></script>
<script src="YOUR_PATH/slider.js"></script>
```
Be sure to notice the right order of the commands. Don't change the order! Be also sure to set the right paths into the second and the last `<script>`-tag!
Now you've finished the linking.

###Third step - Adding the Slider
The last step is like transplanting the heart of the __imageslider__! Copy this passage out of __index.html__ and set it wherever you want in your html file.
```html
  <div id="slideContainer">
      <img id="slidingImage" border="0" src="" data-actid="">
      <div id="infoText"><p></p><a id="linkReferer"></a></div>
      <div id="navigation">
      </div>
  </div>
````
Also here is nothing to change. Enjoy, the installation is complete!

#Options
###Adding images and make it fuzz
####Adding images
The heart of the _image library_ is this part:
```javascript
    var images=[
        {
            "path": "YOUR_PATH/1.jpg",
            "text": "Imageslider",
            "link": "http://www.mck-web.de"
        },
        {
            "path": "YOUR_PATH/2.jpg"
        },
        {
            "path": "YOUR_PATH/3.png",
            "text": "Fancy Image"
        }
    ];
```
Every `{}`-brackets describes one image in your slider. You can copy and paste this brackets and add that much that you want in this part:
```javascript
{
    "path": "YOUR_PATH/3.png",
    "text": "Fancy Image"
}
```
Just be sure that there is always an `,` after each '{}'-Bracket, but not after the last.
####Changing image options
As you see there are three options possible in each `{}`-Bracket.
* __"path"__:It's is always nessesarry! Just enter the path where the image lies that you want to use.
* __"text"__: Is added under the image as description. Can also be turned generally off (more later). _optional_
* __"link"__: Adds a link to the description (if it's enabled). If you have switched it on, it also follows the link by clickling the image. _optional_

###options.json
In __options.json__ you can change general options like fading time, or animation delay. Just take a look in the file, it's all commended.
