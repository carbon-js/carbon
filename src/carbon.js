// https://github.com/google/closure-library/blob/master/closure/goog/base.js

// https://github.com/basisjs/basisjs/blob/master/src/basis.js#L2336
// https://github.com/basisjs/basisjs/blob/master/src/basis.js#L2115
// baseURI

(function () {

    var version = "0.0.1",
        author = "ciro.maciel@c37.co";

    var _baseURI,
        _libraries;


    var c = c || {
        initialize: function (params) {
            _baseURI = params.baseURI;

        },
        require: function (name) {

            window[global][name] = window[global][name] || {};

            // debugger;

            var edgar, duru;

            err = edgar;
            duru = xhr.vvv(name);

            duru = '"use strict";\n' + duru;

            var exports = {},
                parameters = [];

            parameters.push(require);
            parameters.push(exports);
            parameters.push(window);

            var andrea = new Function("require", "exports", "global", duru);

            // https://github.com/nodejs/node/blob/0fb21df6e692bef9f55b9bfa876f3c59dc590332/lib/internal/bootstrap_node.js#L506

            // https://github.com/nodejs/node/blob/master/lib/module.js#L420
            //var cachedModule = Module._cache[filename];


            var bug = andrea.apply(window[global][name], parameters);

            // https://bitbucket.org/C37/plane/src/77a683a9468dcbcada8f6261e59e42ad4aff0524/lib/module.js?at=v3&fileviewer=file-view-default#module.js-43
            window[global][name] = bug || exports;


            return window[global][name];

        }

    };





    // https://github.com/naugtur/xhr/blob/master/index.js
    // https://github.com/Polymer/HTMLImports/blob/9907cf8e8ff799189190319e4cff111514b6661a/src/xhr.js
    var xhr = {
        async: true,

        ok: function (request) {
            return (request.status >= 200 && request.status < 300) || (request.status === 304) || (request.status === 0);
        },

        zzz: function (name) {

            return new Promise(function (result, reject) {


                xhr.load(locationResource + "/" + name + ".js", function (err, resource) {

                    return result(resource);

                });



            });








        },

        vvv: function (url, next, nextContext) {

            var request = new XMLHttpRequest();

            // if (scope.flags.debug || scope.flags.bust) {
            //     url += '?' + Math.random();
            // }

            url = locationResource + "/" + url + ".js"

            // https://github.com/basisjs/basisjs/blob/master/src/basis.js#L2149
            request.open('GET', url, false);
            request.send('');

            if (request.status >= 200 && request.status < 400)
                return request.responseText;
            else {
                console.error('basis.resource: Unable to load ' + url + ' (status code ' + request.status + ')');
            }

        },

        load: function (url, next, nextContext) {

            var request = new XMLHttpRequest();

            // if (scope.flags.debug || scope.flags.bust) {
            //     url += '?' + Math.random();
            // }

            request.open('GET', url, xhr.async);

            request.addEventListener('readystatechange', function (e) {
                if (request.readyState === 4) {
                    // Servers redirecting an import can add a Location header to help us
                    // polyfill correctly.
                    var locationHeader = request.getResponseHeader("Location");
                    var redirectedUrl = null;
                    if (locationHeader) {
                        // var redirectedUrl = (locationHeader.substr(0, 1) === "/") ?
                        //     location.origin + locationHeader // Location is a relative path
                        //     :
                        //     locationHeader; // Full path
                        var redirectedUrl = locationHeader; // Full path
                    }
                    next.call(nextContext, !xhr.ok(request) && request, request.response || request.responseText, redirectedUrl);
                }
            });

            request.send();

            return request;
        },

        loadDocument: function (url, next, nextContext) {
            this.load(url, next, nextContext).responseType = 'document';
        }

    };

    // console.error("sdsdsdsd");



})();