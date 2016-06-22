define([
    "dojo/_base/declare",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/text!/my/LibraryItemTemplate.html",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dijit/layout/ContentPane",
    "dijit/registry",
    "dojo/_base/lang",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/on",
    "dojo/request/xhr",
    "dojo/domReady!",
], function(declare, parser, _WidgetBase, _TemplatedMixin, template, itemTemplate, domClass, domConstruct,
            ContentPane, registry, lang, _WidgetsInTemplateMixin, on, xhr){

    var xhrData = [{"name":"Forms","icon":"https://cdn2.iconfinder.com/data/icons/picol-vector/32/document_text-64.png","path":"/strype-templates/global/Forms","strypes":[{"name":"Contact form","path":"/strype-templates/global/Forms/contact-form-1"},{"name":"Contact form 2","path":"/strype-templates/global/Forms/contact-form-2"},{"name":"Contact form 3","path":"/strype-templates/global/Forms/contact-form-3"}]},{"name":"Galleries","icon":"https://cdn4.iconfinder.com/data/icons/miu/24/editor-images-pictures-photos-collection-glyph-64.png","path":"/strype-templates/global/Galleries","strypes":[{"name":"Cool gallery","path":"/strype-templates/global/Galleries/gallery-1"},{"name":"Even cooler gallery","path":"/strype-templates/global/Galleries/gallery-2"},{"name":"Even cooler gallery","path":"/strype-templates/global/Galleries/gallery-3"}]}]

    var MenuItem =  declare("MenuItem", [_WidgetBase, _TemplatedMixin], {

        templateString : itemTemplate,
        name : '',
        iconUrl : '',

        constructor : function(name, iconUrl) {
            this.name = name;
            this.iconUrl = iconUrl;
        }

    });

    return declare("StrypeLibrary", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,
        activeElement : '',

        constructor: function() {
            console.log(arguments);
        },

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
            for (var i = 0; i < xhrData.length; i++) {
                var newMenuItem = new MenuItem(xhrData[i].name,xhrData[i].icon);
                newMenuItem.placeAt(this.menuWrapperDom);
            }

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

            this.activeElement = menuSwiper.slides[menuSwiper.activeIndex];


        },


        initializeSwiperForNode: function(node){
            console.log("initializing swpier for ",node);
            var menuSwiper = new Swiper(node, {
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
            this.contentPaneWidget.set("innerHTML",'<div class="swiper-container">'+ targetDomNode.innerHTML+'</div>');
            this.initializeSwiperForNode(this.contentPaneWidget.innerHTML);
        }
    });




    //parser.parse();
});