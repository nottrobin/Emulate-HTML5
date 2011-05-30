/**
 *
 *
 *
 *
 *
 */
 
window.EmulateHTML5 = {
    // Config properties
    yuiURL: 'http://yui.yahooapis.com/combo?3.3.0/build/yui/yui-min.js',
    prefixes: ['gallery','emulatehtml5'],
    modules: [],
    // Private properties
    _moduleStrings: [],
    
    // Public methods
    load: function(config) {
        // Set up properties
        if( typeof(config) == 'string' ) {
            this.modules = [config];
        } else if( typeof(config) == object ) {
            if( typeof(config.yuiURL) == 'string' ) {   this.yuiURL = config.yuiURL; }
            if( typeof(config.prefixes) == 'object' ) { this.prefixes = config.prefixes; }
            if( typeof(config.modules) == 'object' ) {  this.modules = config.modules; }
        }
        
        // Setup module strings to pass to YUI
        this._moduleStrings = [];
        for(var i in this.modules) {
            this._moduleStrings.push(  + this.modules[i].toLowerCase() );
        }
        
        var EmulateHTML5 = this;
        
        this.asyncLoad(
            this.properties.yuiURL,
            function() {
                YUI().use(
                    EmulateHTML5._moduleStrings,
                    function(Y) {
                        for(i in emulateHTML5.)
                    }
                )
            }
        );
    },
    
    // Private methods
    _asyncLoad: function(url, callback) {
        var script = document.createElement('script');
        script.setAttribute('src',url);
        document.getElementsByTagName('head')[0].appendChild(script);
    },
    
    _warn: function(warning) {
        if( console != undefined && console.warn != undefined ) {
            console.warn(warning);
        }
    }
 }
 