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
    "dojo/dom-style",
    "dojo/_base/event",
    "dojo/domReady!",
], function(declare, parser, _WidgetBase, _TemplatedMixin, template, itemTemplate, strypeTemplate, domClass, domConstruct,
            ContentPane, registry, lang, _WidgetsInTemplateMixin, on, xhr, domAttr, domStyle, event){

    var xhrData = {
        "Forms": {"name":"Forms","icon":"fa-wpforms",
        "path":"/strype-templates/global/Forms","strypes":[{"name":"Contact form","thumbnail":
            "https://cdn4.iconfinder.com/data/icons/office-20/128/OFFice-05-128.png","path":"/strype-templates/global/Forms/contact-form-1"},
            {"name":"Contact form 2","thumbnail":"https://cdn4.iconfinder.com/data/icons/office-21/128/office-04-128.png",
                "path":"/strype-templates/global/Forms/contact-form-2"},{"name":"Contact form 3","thumbnail":
                "https://cdn4.iconfinder.com/data/icons/office-vol-4/128/office-04-128.png",
                "path":"/strype-templates/global/Forms/contact-form-3"}]}, "Galleries":
        {"name":"Galleries","icon":"fa-camera-retro",
            "path":"/strype-templates/global/Galleries","strypes":
            [{"name":"Cool gallery","thumbnail":"https://cdn1.iconfinder.com/data/icons/ilive-by-wwalczyszyn/128/Windows_Live_Gallery.png",
                "path":"/strype-templates/global/Galleries/gallery-1"},{"name":"Even cooler gallery",
                "thumbnail":"https://cdn0.iconfinder.com/data/icons/Android-R2-png/128/Gallery-Android-R.png",
                "path":"/strype-templates/global/Galleries/gallery-2"},{"name":"Even cooler gallery","thumbnail":
                "https://cdn3.iconfinder.com/data/icons/musthave/128/Picture.png",
                "path":"/strype-templates/global/Galleries/gallery-3"},
                {"name":"Even cooler gallery","thumbnail":
                    "https://cdn0.iconfinder.com/data/icons/IS_CMS/128/gallery.png",
                    "path":"/strype-templates/global/Galleries/gallery-4"}]},


    };

    var MenuItem =  declare("MenuItem", [_WidgetBase, _TemplatedMixin], {

        templateString : itemTemplate,
        name : '',
        icon : '',

    });

    var StrypeItem = declare("StrypeItem", [_WidgetBase, _TemplatedMixin], {

        templateString: strypeTemplate,
        iconUrl: '',
        name: '',
        path: '',
        onClick: function() {},
        
        postCreate: function () {
            var self = this;
            on(this.domNode,'click',function() {
                var strypeParams = {
                    name : self.name,
                    path : self.path
                };
                self.onClick(strypeParams);
            });
        }

    });

    return declare("StrypeLibrary", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,
        activeElement : '',
        onStrypeChosen : function(params) {
            console.log(params);
        },

        constructor: function() {

        },

        slideFinished : function(swiper) {
            swiper.slideTo(swiper.activeIndex);
            this.activeElement = swiper.slides[swiper.activeIndex];
            this.loadPane(this.activeElement);
        },

        postCreate: function() {
            for (var i = 0; i < Object.keys(xhrData).length; i++) {
                var obj = xhrData[Object.keys(xhrData)[i]];
                var newMenuItem = new MenuItem(obj);
                newMenuItem.placeAt(this.menuWrapperDom);
            }
            var menuSwiper = this.initializeSwiperForNode('.menu-container', {
                onSlideChangeEnd: lang.hitch(this, this.slideFinished),
                slideActiveClass: 'active-menu-item'
            });

            on(window,'resize', lang.hitch(this,this.setUpActiveSeparator));
            this.activeElement = menuSwiper.slides[menuSwiper.activeIndex];
            this.loadPane(this.activeElement);
            this.setUpActiveSeparator();
        },

        setUpActiveSeparator: function () {
            var width = domStyle.get(this.activeElement, "width");
            domStyle.set(this.separator,"width",width+"px");
        },

        initializeSwiperForNode: function(node, obj){
            var menuSwiper = new Swiper(node, {
                direction: obj.direction || 'horizontal',
                loop: obj.loop || false,
                freeMode: obj.freeMode || false,
                slidesPerView: obj.slidesPerView || 4,
                initialSlide: obj.initialSlide || 2,
                centeredSlides: obj.centeredSlides || true,
                onSlideChangeEnd: obj.onSlideChangeEnd,
                onTransitionStart: obj.onTransitionStart,
                onResize: obj.onResize,
                slideActiveClass: obj.slideActiveClass,
            });

            return menuSwiper;
        },

        onStrypeItemClicked : function(strypeParams) {
            this.onStrypeChosen(strypeParams);
        },

        loadPane: function(node){

            this.contentPaneWidget.destroyDescendants();
            var category = domAttr.get(node, "data-widget-category");
            if (category == null) return;
            var strypes = xhrData[category].strypes;

            for (var i = 0; i < strypes.length; i++) {

                var strypeItem = new StrypeItem({
                    iconUrl: strypes[i].thumbnail,
                    path: strypes[i].path,
                    name: strypes[i].name,
                    onClick: lang.hitch(this,this.onStrypeItemClicked)
                });
                strypeItem.placeAt(this.contentPaneWidget);
            }
            this.initializeSwiperForNode(".strypes-items-wrapper",{});
            this.categoryName.innerHTML = 'Libraries/<span class="bold">'+category+'</span>';
        }

    });
});