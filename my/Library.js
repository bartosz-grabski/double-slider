define([
    "dojo/_base/declare",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!/my/LibraryTemplate.html",
    "dojo/text!/my/LibraryItemTemplate.html",
    "dojo/text!/my/LibraryStrypeItemTemplate.html",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dijit/layout/ContentPane",
    "dijit/registry",
    "dojo/_base/lang",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/on",
    "dojo/request/xhr",
    "dojo/dom-attr",
    "dojo/domReady!",
], function(declare, parser, _WidgetBase, _TemplatedMixin, template, itemTemplate, strypeTemplate, domClass, domConstruct,
            ContentPane, registry, lang, _WidgetsInTemplateMixin, on, xhr, domAttr){

    var xhrData = [{"name":"Forms","icon":"https://cdn2.iconfinder.com/data/icons/picol-vector/32/document_text-64.png",
        "path":"/strype-templates/global/Forms","strypes":[{"name":"Contact form","thumbnail":
            "https://cdn4.iconfinder.com/data/icons/office-20/128/OFFice-05-128.png","path":"/strype-templates/global/Forms/contact-form-1"},
            {"name":"Contact form 2","thumbnail":"https://cdn4.iconfinder.com/data/icons/office-21/128/office-04-128.png",
                "path":"/strype-templates/global/Forms/contact-form-2"},{"name":"Contact form 3","thumbnail":
                "https://cdn4.iconfinder.com/data/icons/office-vol-4/128/office-04-128.png",
                "path":"/strype-templates/global/Forms/contact-form-3"}]},
        {"name":"Galleries","icon":"https://cdn4.iconfinder.com/data/icons/miu/24/editor-images-pictures-photos-collection-glyph-64.png",
            "path":"/strype-templates/global/Galleries","strypes":
            [{"name":"Cool gallery","thumbnail":"https://cdn1.iconfinder.com/data/icons/ilive-by-wwalczyszyn/128/Windows_Live_Gallery.png",
                "path":"/strype-templates/global/Galleries/gallery-1"},{"name":"Even cooler gallery",
                "thumbnail":"https://cdn0.iconfinder.com/data/icons/Android-R2-png/128/Gallery-Android-R.png",
                "path":"/strype-templates/global/Galleries/gallery-2"},{"name":"Even cooler gallery","thumbnail":
                "https://cdn3.iconfinder.com/data/icons/musthave/128/Picture.png",
                "path":"/strype-templates/global/Galleries/gallery-3"},
                {"name":"Even cooler gallery","thumbnail":
                    "https://cdn0.iconfinder.com/data/icons/IS_CMS/128/gallery.png",
                    "path":"/strype-templates/global/Galleries/gallery-4"}]}];

    var MenuItem =  declare("MenuItem", [_WidgetBase, _TemplatedMixin], {
        templateString : itemTemplate,
        name : '',
        iconUrl : '',
        order: '',

        constructor : function(name, iconUrl, order) {
            this.name = name;
            this.iconUrl = iconUrl;
            this.order = order;
        }
    });
    
    var StrypeItem = declare("StrypeItem", [_WidgetBase, _TemplatedMixin], {
        templateString: strypeTemplate,
        iconUrl: '',
        constructor: function(iconUrl){
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
                var newMenuItem = new MenuItem(xhrData[i].name,xhrData[i].icon, i);
                newMenuItem.placeAt(this.menuWrapperDom);
            }

            var menuSwiper = this.initializeSwiperForNode('.swiper-container', {
                onSlideChangeEnd: lang.hitch(this, this.slideFinished),
                onTransitionStart: lang.hitch(this, this.slideStarted)
            })
            this.activeElement = menuSwiper.slides[menuSwiper.activeIndex];

        },
        initializeSwiperForNode: function(node, obj){
            var menuSwiper = new Swiper(node, {
                direction: 'horizontal',
                loop: true,
                freeMode: true,
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 100,
                onSlideChangeEnd: obj.onSlideChangeEnd,
                onTransitionStart: obj.onTransitionStart
            });
            return menuSwiper;
        },
        loadPane: function(node){
            this.contentPaneWidget.destroyDescendants();
            var order = domAttr.get(node, "data-widget-order");
            var strypes = xhrData[order].strypes;
            for (var i = 0; i < strypes.length; i++) {
                var strypeItem = new StrypeItem(strypes[i].thumbnail);
                strypeItem.placeAt(this.contentPaneWidget);
            }
             this.initializeSwiperForNode(".strypes-items-wrapper",{});
        }
    });
});