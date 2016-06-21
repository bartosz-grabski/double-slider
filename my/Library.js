define([
    "dojo/_base/declare",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/dom-class",
    "dijit/layout/ContentPane",
    "dijit/registry",
    "dojo/_base/lang",
    "dojo/domReady!",
], function(declare, parser, _WidgetBase, _TemplatedMixin, template, domClass, ContentPane, registry, lang){


    var menuCssSelector = 'swipe-container';
    var contentCssSelector = 'library-content';


    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,
        activeElement : '',

        slideFinished : function(swiper) {
            swiper.slideTo(swiper.activeIndex);
            this.activeElement = swiper.slides[swiper.activeIndex];
            this.activateMenuItem();
        },

        slideStarted: function(swiper) {
            this.disableMenuItem();
        },

        activateMenuItem : function() {
            if (this.activeElement) {
                domClass.add(this.activeElement,'swiper-active');
                this.loadPane(this.activeElement);
            }
        },

        disableMenuItem : function() {
            if (this.activeElement) {
                domClass.remove(this.activeElement,'swiper-active');
            }

        },

        postCreate: function() {

            var menuSwiper = new Swiper('.swiper-container', {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
                freeMode: true,
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 100,
                onSlideChangeEnd: lang.hitch(this, this.slideFinished),
                onTransitionStart: lang.hitch(this, this.slideStarted)
            });
        },

        loadPane: function(node){
            var targetDomNode = node;
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