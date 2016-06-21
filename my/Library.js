define([
    "dojo/_base/declare",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/dom-class",
    "dijit/layout/ContentPane",
    "dijit/registry",
    "dojo/domReady!",
], function(declare, parser, _WidgetBase, _TemplatedMixin, template, domClass, ContentPane, registry){


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

        },

        loadPane: function(evt){
            var targetDomNode = evt.target;
            console.log(targetDomNode);
            if(registry.byId("mainContentPane") != undefined){
                registry.byId("mainContentPane").set("content",targetDomNode.innerHTML);
            }
            else{
                new ContentPane({
                    content:"<p>Optionally set new content now</p>",
                    style:"height:125px"
                }, "mainContentPane").startup();
            }
        }
    });

    //parser.parse();
});