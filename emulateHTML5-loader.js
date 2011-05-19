/*
 * NB: Loader must not be run in a YUI environment with any dependencies
 * This is because Loader needs to run *before* the DOM loads,
 * so it can successfully load Shim, which must run before the DOM loads.
 * If Loader or Shim have run with any dependencies then YUI may execute them asynchronously,
 * after its fetched the dependencies, and therefore likely after the DOM has loaded = FAIL.
 * This is why Loader doesn't use "Y.Base".
 */
YUI.add(
    'emulateHTML5-loader',
    function (Y) {
        Y.namespace('emulateHTML5');
        
        Y.emulateHTML5.Loader = function (config) { this.initialise(config); }
        Y.emulateHTML5.Loader.prototype = {
            NAME : 'eH5-loader',
            attr : {
                components  : {},
                prefix      : 'emulateHTML5',
                namespace   : 'emulateHTML5'
            },
            initialise: function(config) {
                // Merge attributes
                this.attr = Y.merge(this.attr,config);
                
                var components = this.attr.components;
                
                // If components is a string, assume we're just loading one component
                if(Y.Lang.isString(components)) { components = [components]; }
                
                // Check components is an array or object and isn't empty
                if(!Y.Lang.isObject(components) || Y.Object.isEmpty(components)) { return false; }
                
                // Load chosen emulateHTML5 options
                for(var compIndex in components) {
                    // If "components" is an array then we simply load components with empty config
                    // Assume it's an array to start with
                    var configOptions = {};
                    var componentName = components[compIndex];
                    
                    if(!Y.Lang.isArray(components)) {
                        // It's not an array, so it's an object / associative array
                        configOptions = components[compIndex];
                        componentName = compIndex;
                    }
                    
                    var lcComponentName = componentName.toLowerCase();
                    var ucfComponentName = lcComponentName.charAt(0).toUpperCase() + lcComponentName.slice(1);
                    
                    // Now load the component with the config options
                    var thisLoader = this;
                    Y.use(
                        this.attr.prefix + '-' + lcComponentName,
                        function(Y) {
                            Y[thisLoader.attr.namespace][ucfComponentName].init(configOptions);
                        }
                    );
                }
            }
        }
        
        Y.emulateHTML5.Loader.load = function(components) {
            var ob = new Y.emulateHTML5.Loader({ 'components': components });
        }
    }, 
    '0.1'  /* module version */
    /* Must not have dependencies, 'cos it must not run asynchronously */
);
