/*
 * NB: Shim must not be run in a YUI environment with any dependencies
 * This is because Shim needs to run *before* the DOM loads.
 * If Shim runs with any dependencies then YUI may execute Shim asynchronously,
 * after its fetched the dependencies, and therefore likely after the DOM has loaded = FAIL.
 * This is why Shim doesn't use "Y.Base" or "Y.Node".
 */
YUI.add(
    'emulateHTML5-shim',
    function (Y) {
        Y.namespace('emulateHTML5');
        
        Y.emulateHTML5.Shim = function (config) { this.initialise(config); }
        Y.emulateHTML5.Shim.prototype = {
            NAME : 'eH5-shim',
            attr : {
                html5Elements   : ['abbr','article','aside','audio','canvas','details','figcaption','figure','footer','header','hgroup','mark','meter','nav','output','progress','section','summary','time','video'],
                extraElements   : []
            },
            initialise: function(config) {
                // Merge attributes
                this.attr = Y.merge(this.attr,config);
                
                // Check if this browser needs augmenting
                if(window.attachEvent && !this._domAcceptsUnknownElements()) {
                    // Add extra elements to main list
                    var elements = this.attr.html5Elements.concat(this.attr.extraElements);
                    
                    // Go through each new element
                    for(var i in elements) {
                        // Create it - thus forcing the browser to accept this element
                        var elem = document.createElement(elements[i]);
                    }
                }
            },
            // Check if the DOM accepts unknown element types
            _domAcceptsUnknownElements: function () {
                var aDiv = document.createElement('div');
                aDiv.innerHTML = '<elem></elem>';
                return aDiv.childNodes.length > 0;
            }
        };
        
        Y.emulateHTML5.Shim.init = function(config) {
            new Y.emulateHTML5.Shim(config);
        };
    }, 
    '0.1' /* module version */
    /* Must not have dependencies, 'cos it must not run asynchronously */
);
