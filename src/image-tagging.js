// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "imgTag" to the name of your plugin!

/**
Dependencies: Jquery 1.8
              JqueryUI 1.9


*/
(function($) {

    // here we go!
    $.imgTag = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {

            editable: true, //Allows to add/delete the tags 
            taggable: false,
            ownTagIcon: '', //png file only
            ajaxable: false,
            getUrl:'',
            saveUrl:'',
            deleteUrl:'',
            hoverable: true,
            commentable:true,
            multiSelectable: true, //checkboxes will be visible
            touchable: true, //for touch devices like tablets/phones
            centerAlign: true,
            serializable: true, //convert all tag positions to JSON object
            controlsDivId : $(''), //Default controls will be added and pass jquery element
            tagdata : {
                tags : [
                { top:100, left:100, icon:false, iconUrl:'', width:20, height:20,
                editable:true, text:'This is description', tagURL:'' , id: 1 }
                ]
            },
            overrideWithCallbacks : false,


            // if your plugin is event-driven, you may provide callback capabilities
            // for its events. execute these functions before or after events of your 
            // plugin, so that users may customize those particular events without 
            // changing the plugin's code
            onTagEdit: function() {},
            onTagDelete: function() {},
            onTagLoad: function() {},
            onTagAdd: function() {},
            onAjaxLoad: function() {},
            onAjaxError: function() {},
            toJSON: function() {},
            addTag: function() {},
            deleteTag: function() {},
            editTag: function() {},
            redraw: function(){},
            postData: function(){}
        }

        // to avoid confusions, use "plugin" to reference the 
        // current instance of the object
        var plugin = this;

        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element

        var overlay=$('<div class="image-overlay"></div>');
        overlay.height($element.height());
        overlay.width($element.width());
        overlay.offset($element.offset());
        console.log('overlay created');
        $element.after(overlay);
        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and 
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            var data=plugin.settings.tagdata;
            for (var i = 0; i < data.tags.length; i++) {
                var tagObject=new Tag(data.tags[i]);
                overlay.append(tagObject.dom);
            };
            // code goes here

        }



        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('imgTag').publicMethod(arg1, arg2, ... argn) from outside 
        // the plugin, where "element" is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        plugin.foo_public_method = function() {

            // code goes here

        }

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        // a private method. for demonstration purposes only - remove it!
        var foo_private_method = function() {

            // code goes here

        }

        var Tag= function(tag) {
            this.data=tag;
            this.dom=$('<div class="tag"><div>');
            this.makePosition();
            if (plugin.settings.hoverable===true) {
                this.doHover();
            };
        }

        Tag.prototype.makePosition = function() {
            this.dom.css('position','absolute');
            this.dom.css('top',this.data.top + 'px');
            this.dom.css('left',this.data.left + 'px');
            this.dom.css('width',this.data.width + 'px');
            this.dom.css('height',this.data.height + 'px');
        }

        Tag.prototype.doHover = function() {
            this.dom.hover(function(){
                $(this).append($('<div>Test</div>'));
            },function(){

            });
        }

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

        

    }

    // add the plugin to the jQuery.fn object
    $.fn.imgTag = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('imgTag')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.imgTag(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('imgTag').publicMethod(arg1, arg2, ... argn) or
                // element.data('imgTag').settings.propertyName
                $(this).data('imgTag', plugin);

            }

        });

    }

})(jQuery);



/** USAGE

$(document).ready(function() {

    // attach the plugin to an element
    $('#element').imgTag({'foo': 'bar'});

    // call a public method
    $('#element').data('imgTag').foo_public_method();

    // get the value of a property
    $('#element').data('imgTag').settings.foo;

});

*/