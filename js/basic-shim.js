// List the elements we need to "shim"
var h5elements = 'abbr','article','aside','audio','canvas','details','figcaption','figure','footer','header','hgroup','mark','meter','nav','output','progress','section','summary','time','video';

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

function _domAcceptsUnknownElements() {
    var aDiv = document.createElement('div');
    aDiv.innerHTML = '<elem></elem>';
    return aDiv.childNodes.length > 0;
}
