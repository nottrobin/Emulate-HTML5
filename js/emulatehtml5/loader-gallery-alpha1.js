"use strict";

// Set namespace
Y.namespace( 'EmulateHTML5' );

/* Options can be any of:
 * - A string: The name of a single eH5 component to be loaded
 * - An array of strings: The names of eH5 components to be loaded
 * - An object: A mapping of eH5 component names to their configuration objects
 * - A full set of eH5.Loader config options (see Loader.ATTRS below)
 *   For this choice, options.components can in turn be any of the three previous options.
 *
 * NB: All eH5 component names must use *exact casing*. E.g.:
 * - 'Loader' not 'loader'
 * - 'DateAttribute' not 'Dataattribute'
 **/
Y.EmulateHTML5.Loader = function (options) {
    // Set up the config variable from "options"
    // --
    if( !Y.Lang.isUndefined(options) ) {
        // Initialise config object
        var config = { components: {} };
        
        // Setup components
        if( Y.Lang.isObject(options.components) ) { config = options; }
        var components = config.components;
        config.components = {};
        
        // If components is a string, add it components
        if( Y.Lang.isString(components) ) { config.components[components] = {}; }
        // If components is an array, add them to components
        else if(Y.Lang.isArray(options)) {
            for( var index in components ) {
                config.components[components[index]] = {};
            }
        }
        arguments[0] = config;
    }
    
    // Now construct the object
    Y.EmulateHTML5.Loader.superclass.constructor.apply(this, arguments);
}

Y.EmulateHTML5.Loader.NAME = "Loader";

// Default options
Y.EmulateHTML5.Loader.ATTRS = {
    components  : { value : {} },
    prefix      : { value : 'emulatehtml5' },
    namespace   : { value : 'EmulateHTML5' },
    initialize  : { value : false },
    callback    : { value : false }
};

Y.extend(Y.EmulateHTML5.Loader, Y.Base, {
    // Class methods
    initializer: function(config, callbackFn) {
        Y.log(callbackFn);
        this.load(config, callbackFn);
    },
    load: function (config) {
        
        
        var components = this.get('components');
        
        // Check components is an object and isn't empty
        if(!Y.Lang.isObject(components) || Y.Lang.isArray(components) || Y.Object.isEmpty(components)) {
            Y.log('No valid components passed to EmulateHTML5 loader','warn','Y.EmulateHTML5.load');
            return false;
        }
        
        // Create strings for loading components in YUI
        var yuiLoaderArguments = [];
        for(var name in components) {
          yuiLoaderArguments.push(this.get('prefix') + '-' + name.toLowerCase());
        }
        
        // Add the callback function to the arguments (bound to this object instanct)
        yuiLoaderArguments.push( Y.bind(this._componentsCallback, this) );
        
        // Now load the component with the config options
        Y.use.apply(Y,yuiLoaderArguments);
    },
    
    // Private methods
    _componentsCallback: function(Y) {
        var namespace = this.get('namespace'),
            components = this.get('components'),
            callback = this.get('callback');
        
        // Check EmulateHTML5 is here
        if(Y.Lang.isObject(Y[namespace])) {
            // Load each of our new modules
            for(name in components) {
                // Check it's a function first
                if(Y.Lang.isFunction(Y[namespace][name])) {
                    console.log(components[name]);
                    new Y[namespace][name](components[name]);
                }
            }
        }
        
        // Call the callback
        if(Y.Lang.isFunction(callback)) { callback(Y); }
    }

});
