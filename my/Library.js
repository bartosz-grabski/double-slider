define([
    "dojo/_base/declare",
    "dojo/parser",     
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/on",
    "dojox/gesture/swipe",
    "dojox/mobile",
    "dojox/mobile/parser",
    "dojox/mobile/Carousel",
    "dojo/domReady!",
    ], function(declare, parser, _WidgetBase, _TemplatedMixin, template){


        var menuCssSelector = 'swipe-container';
        var contentCssSelector = 'library-content';


        return declare([_WidgetBase, _TemplatedMixin], {

            templateString: template,


            postCreate: function() {

                var menuSwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    slidesPerView: 3,
    spaceBetween: 30,
    
    
})        

            }
        });
        
      //parser.parse();
  });