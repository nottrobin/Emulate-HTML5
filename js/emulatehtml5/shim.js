YUI().add(
    'emulatehtml5-shim',
    function (Y) {
        // Set namespace
        Y.namespace('EmulateHTML5');
        
        Y.EmulateHTML5.Shim = function (config) { Y.EmulateHTML5.Shim.superclass.constructor.apply(this, arguments); }
        
        Y.EmulateHTML5.Shim.NAME = "Shim";
        
        // Default options
        Y.EmulateHTML5.Shim.ATTRS = {
            html5Elements: { value: ['abbr','article','aside','audio','canvas','details','figcaption','figure','footer','header','hgroup','mark','meter','nav','output','progress','section','summary','time','video'] },
            extraElements: { value: [] }
        };
        
        Y.extend(Y.EmulateHTML5.Shim, Y.Base, {
            // Class methods
            initializer: function () {
                // Check if this browser needs augmenting
                if(window.attachEvent && !this._domAcceptsUnknownElements()) {
                    // Add extra elements to main list
                    var elements = this.get('html5Elements').concat(this.get('extraElements'));
                    
                    // Go through each new element
                    for(var i in elements) {
                        // Create it - thus forcing the browser to accept this element
                        // For some reason this doesn't work with Y.Node.create()
                        document.createElement(elements[i]);
                    }
                }
            },
            // Check if the DOM accepts unknown element types
            _domAcceptsUnknownElements: function () {
                return Y.Node.create('<div><elem></elem></div>').hasChildNodes();
            }
        });
    }, 
    '0.1',  /* module version */
    {requires: ['base','node']} /* dependencies */
);
