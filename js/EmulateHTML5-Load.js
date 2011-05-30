window.EmulateHTML5 = {
    load: function(modules) {
        YUI().use('emulatehtml5-loader', function(Y) {
            new Y.EmulateHTML5.Loader(modules);
            alert(Y.EmulateHTML5.Shim);
        })
    }
}
