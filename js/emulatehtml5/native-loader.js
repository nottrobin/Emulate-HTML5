/* -------------------
 * EmulateHTML5 Loader
 * ------------------- */
 
/* Options can be any of:
 * - A string: The name of a single eH5 component to be loaded
 * - An array of strings: The names of eH5 components to be loaded
 * - An object: A mapping of eH5 component names to their configuration objects
 * - A full set of eH5.Loader config options (see below)
 *   For this choice, options.components can in turn be any of the three previous options.
 * 
 * NB: All eH5 component names must use *exact casing*. E.g.:
 * - 'Loader' not 'loader'
 * - 'DateAttribute' not 'Dataattribute'
 *
 * Config options:
 * - components: An object, array or string specifying components to load,
 *               potentially with options.
 * - initializeComponents: Boolean of whether to instantiate each component
 *                         object after YUI has loaded it. Default: true
 * - callback: The callback function to be called after everything's been
 *             loaded and initialised.
 * - prefix: The prefix string for loading modules
 *           (default: gallery-emulatehtml5)
 * - yuiNamespace: The string of the Namespace to load components in
 *                 (default: EmulateHTML5)
 **/
(function(Y) { 
  // Use Strict mode from ECMAScript 5 and JavaScript 1.8.5
  // Make sure you test any changes in a browser that supports strict mode! (e.g.: Fx >= 4, Chrome >= 11)
  "use strict";

  // Set YUI namespace
  Y.namespace( 'EmulateHTML5' );

  /* The main constructor
   * This can be called with or without the "new" operator. Either way it will return an object.
   * @return object An instanct of EmulateHTML5 native.
   **/
  Y.EmulateHTML5.Loader = function(config) {
    // Initiate object if not already initiated
    var thisOb = this;
    if ( ! (this instanceof arguments.callee) ) {
      thisOb = new arguments.callee(config);
    }
    // Setup the config options
    thisOb._setupConfigOptions(config);
    
    // Load the loader (default action of this module)
    thisOb.load();
    
    return thisOb;
  }

  Y.EmulateHTML5.Loader.prototype = {
    /* Default arguments */
    arg: {
      version : '0.2',
      prefix: 'gallery-emulatehtml5',
      initializeComponents: true,
      callback: false,
      components: {},
      yuiNamespace: 'EmulateHTML5', 
    },
    
    /* Loads HTML5 components
     * It can take as arguments a components variable. See _setupComponentsOb for instructions.
     **/
    load: function (components) {
      // Get components as the default arguments merged with new ones
      var components = Y.merge(this.arg.components,this._setupComponentsOb(components));
      
      // Create strings for loading components in YUI
      var yuiLoaderArguments = [];
      for(var name in components) {
        yuiLoaderArguments.push(this.arg.prefix+'-'+name.toLowerCase());
      }
      
      // Set a callback function - attaching this object instanct as its context
      yuiLoaderArguments.push( this._contextCallback(this._componentsCallback) );
      
      // Now load the component with the config options
      Y.use.apply(Y,yuiLoaderArguments);
    },
    
    /* Private methods
     * =============== */
    
    /* Wrap a function in the context of the current object instance
     * The function is wrapped in a closure and then the object instanct is "apply"ed to it
     * @return function The wrapped function.
     **/
    _contextCallback: function(callbackFunction) {
      // Capture this object instance
      var caller = this;
      // Return a closure function containing this object instance and the callback function
      return function() {
        callbackFunction.apply(caller, arguments)
      }
    },
    
    /* Gets called when components have loaded
     * Creates component objects if "initializeComponents" is true
     * Then called the "callback" function, if it exists.
     **/
    _componentsCallback: function(Y) {
      // Call the component objects, if we're supposed to
      if( this.arg.initializeComponents ) { this._initializeComponents(Y); }
      
      // Call the callback, if supplied
      if(Y.Lang.isFunction(this.arg.callback)) { this.arg.callback(Y); }
    },
    
    /* Set up a new object for each of the required components (if initializeComponents is true)
     * Then call the callback function.
     **/
    _initializeComponents: function(Y) {
      var namespace = this.arg.yuiNamespace;
      // Check EmulateHTML5 is here
      if(Y.Lang.isObject(Y[namespace])) {
        // Load each of our new modules
        for(var name in this.arg.components) {
          // If we're supposed to initialise, check it's a function
          if(Y.Lang.isFunction(Y[namespace][name])) {
            // Load it
            new Y[namespace][name](this.arg.components[name]);
            Y.log('Loaded Y.'+namespace+'.'+name+':', Y[namespace][name]);
          } else {
            // Warning - couldn't load module
            Y.log(
              'Component Y.'+this.yuiNamespace+'.'+name+' cannot be loaded as it is not a function.',
              'warn',
              'EmulateHTML5._componentsCallback'
            )
          }
        }
      }
    },
    
    /* Setup the passed component options to be an object of the correct structure
     * It can accept:
     * - A string: The name of a single eH5 component to be loaded
     * - An array of strings: The names of eH5 components to be loaded
     * - An object: A mapping of eH5 component names to their configuration objects
     * @return object
     **/
    _setupComponentsOb: function(components) {
      var setupComponents = {};
      
      if( Y.Lang.isString(components) ) {
        // If components is a string, add it components
        setupComponents[components] = {};
      }
      // If components is an array, add them to components
      else if(Y.Lang.isArray(components)) {
        for( var index in components ) {
          setupComponents[components[index]] = {};
        }
      }
      return setupComponents;
    },
    
    /* Takes the config options passed to the object and merges them into object arguments
     * It can either take a "components" variable (string, array or object), or a full set of config options.
     **/
    _setupConfigOptions: function(newConf) {
      // If we weren't passed anything, return false. Nothing done.
      if ( Y.Lang.isUndefined(newConf) ) { return false; }
      
      if ( Y.Lang.isUndefined( newConf.components ) ) {
        // Assume we've just been passed the components bit.
        newConf = { components: this._setupComponentsOb(newConf) }
      } else {
        // Assume we have a full config object, and just setup the components bit
        newConf.components = this._setupComponentsOb(newConf.components);
      }
      
      // Merge with default arguments
      this.arg = Y.merge(this.arg,newConf);
      
      // Return true - we actually do have some config options
      return true;
    }
  }
  
  // Add Loader to native namespace for calling without YUI.
  window.EH5 = Y.EmulateHTML5;
  
})(YUI());
