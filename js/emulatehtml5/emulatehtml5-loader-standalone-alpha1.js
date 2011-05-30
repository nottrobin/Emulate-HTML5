/* -------------------
 * EmulateHTML5 native
 * ------------------- */
window.EmulateHTML5 = function(config, callbackFn) {
    // Initiate object if not already initiated
    var thisOb = this;
    if( !YUI().Lang.isObject(this.__proto__) ) {
        thisOb = new window.EmulateHTML5;
    }
    // Load the loader
    thisOb.load(config,callbackFn);
}
window.EmulateHTML5.prototype = {
    version : '0.2',
    prefix: 'emulatehtml5',
    yuiNamespace: 'EmulateHTML5',
    load: function (components,callbackFn) {
        this.callback = callbackFn;
        
        // Initialise a YUI3 object
        Y = YUI({ debug : true });
        
        // If we've been passed a string or array, convert to object
        if(Y.Lang.isString(components)) {
            componentName = components;
            components = {};
            components[componentName] = {};
        } else if(Y.Lang.isArray(components)) {
            var newComponents = {};
            for(index in components) {
                newComponents[components[i]] = {};
            }
            components = newComponents;
        }
        
        // Check components is an object and isn't empty
        if(!Y.Lang.isObject(components) || Y.Lang.isArray(components) || Y.Object.isEmpty(components)) {
            Y.log('No valid components passed to EmulateHTML5 loader','warn','EmulateHTML5.load');
            return false;
        }
        
        this.components = components;
        
        // Create strings for loading components in YUI
        componentStrings = [];
        for(name in components) {
            componentStrings.push(this.prefix+'-'+name.toLowerCase());
        }
        
        // Now load the component with the config options
        // Using some clever closure and "apply" magic to pass through the current "this"
        // See http://goo.gl/pzwvT and http://goo.gl/ojKP
        Y.use(
            'emulatehtml5-shim',
            (function(caller) { return function() { caller._componentsCallback.apply(caller, arguments) } })(this)
        );
    },
    _componentsCallback: function(Y) {
        for(name in this.components) {
            new Y[this.yuiNamespace][componentName](this.components[componentName]);
            if(Y.Lang.isFunction(this.callback)) { this.callback(Y) }
        }
    }
}
