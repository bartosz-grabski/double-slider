define([
    "dojo/_base/declare",
    "dojo/parser",     
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/dom-class",
    "dojo/on",
    "dojox/gesture/swipe",
    "dojox/mobile",
    "dojox/mobile/parser",
    "dojox/mobile/Carousel",
    "dojo/domReady!",
    ], function(declare, parser, _WidgetBase, _TemplatedMixin, template, domClass){


        var menuCssSelector = 'swipe-container';
        var contentCssSelector = 'library-content';


        return declare([_WidgetBase, _TemplatedMixin], {

            templateString: template,

            activateMenuItem : function(swiper) {
                console.log(swiper.activeIndex % 3);

                //swiper.

            },

            disableMenuItem : function(swiper) {
                console.log(swiper);
            },


            postCreate: function() {

                var menuSwiper = new Swiper ('.swiper-container', {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
    
                centeredSlides : true,
                slidesPerView: 3,
                spaceBetween: 30,
                onSlideChangeEnd: this.menuItemChanged,
                onSliderMove: this.disableActiveMenuItem
})        

            }
        });
        
      //parser.parse();
  });