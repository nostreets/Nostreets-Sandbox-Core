/*
DEPENDENCIES
    -JQUERY
    -ANGULARJS

*/

var page = {
    APPNAME: "sandbox",
    isLoggedIn: false,
    ngModules: [
        "ui.bootstrap",
        "ngAnimate",
        "ngRoute",
        "toastr",
        "ngSanitize",
        "ngCookies",
        'color.picker'
    ],

    startSite: (callback) => {
        (() => angular.module(page.APPNAME, page.ngModules))();

        if (callback && typeof (callback) === 'function')
            $(document).ready(callback);
    },

    utilities: {

        print: (usePopupWindow, id) => {
            var popupWinindow = window.open('', '_blank', 'width=' + window.innerWidth + ',height=' + window.innerHeight + ',scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'),
                beforePrint = () => { },
                afterPrint = () => popupWinindow.close(),
                printContents = id ? document.querySelector('#' + id).outerHTML : document.body.outerHTML,
                originalContents = document.body.outerHTML,
                links = document.querySelectorAll('link'),
                printBody = '<body onload="window.print(); window.focus();">' + printContents + '</body>',
                printHead = '<html><head>';

            for (var i = 0; i < Object.keys(links).length; i++)
                if (typeof (links[i]) !== 'undefined')
                    printHead += links[i].outerHTML;

            printHead += '</head>{0}</html>';

            if (usePopupWindow) {
                popupWinindow.document.open();
                popupWinindow.document.write(printHead.replace("{0}", printBody));
                popupWinindow.document.close();


                if (popupWinindow.matchMedia) {
                    var mediaQueryList = window.matchMedia('print');
                    mediaQueryList.addListener((mql) => {
                        if (mql.matches) {
                            beforePrint();
                        } else {
                            afterPrint();
                        }
                    });
                }

                popupWinindow.onbeforeprint = beforePrint;
                popupWinindow.onafterprint = afterPrint;
            }
            else {

                document.body.innerHTML = printBody;
                window.print();
                document.body.innerHTML = originalContents;
            }
        },

        getDeviceWidth: () => $(window).width(),

        checkForJQEvent: (element, event) => {
            var result = false,
                curEvents = $._data($(element).get(0), 'events');

            for (var e in curEvents) {
                result = event === e;

                if (result)
                    break;
            }

            return result;
        },

        setUpJQSwipeHandlers: () => {
            var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

            $.event.special.swipeupdown = {
                setup: function () {
                    var thisObject = this;

                    var $this = $(thisObject);

                    $this.bind(touchStartEvent, (event) => {
                        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [data.pageX, data.pageY],
                                origin: $(event.target)
                            },
                            stop;

                        var moveHandler = (event) => {
                            if (!start)
                                return;

                            var data = event.originalEvent.touches ?
                                event.originalEvent.touches[0] :
                                event;

                            stop = {
                                time: (new Date).getTime(),
                                coords: [data.pageX, data.pageY]
                            };

                            // prevent scrolling
                            if (Math.abs(start.coords[1] - stop.coords[1]) > 10)
                                event.preventDefault();
                        };

                        $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent,
                            (event) => {
                                $this.unbind(touchMoveEvent, moveHandler);
                                if (start && stop) {
                                    if (stop.time - start.time < 1000 &&
                                        Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                        Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                        start.origin
                                            .trigger("swipeupdown")
                                            .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                    }
                                }
                                start = stop = undefined;
                            });
                    });
                }
            };

            $.each({ swipedown: "swipeupdown", swipeup: "swipeupdown" },
                (event, sourceEvent) => {
                    $.event.special[event] = {
                        setup: () => {
                            $(this).bind(sourceEvent, $.noop);
                        }
                    };
                });
        },

        inlineSvgs: (hoverColor) => {
            hoverColor = hoverColor || 'black';
            /*
             * Replace all SVG images with inline SVG
             */

            $('img').each((num, ele) => {
                var $img = $(ele);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgStyle = $img.attr('style');
                var imgURL = $img.attr('src');

                if (imgURL && imgURL.includes('.svg'))
                    $.get(imgURL, (data) => {
                        var $svg = $(data).find('svg');

                        if (typeof imgID !== 'undefined')
                            $svg = $svg.attr('id', imgID);

                        if (typeof imgStyle !== 'undefined')
                            $svg = $svg.attr('style', imgStyle);

                        if (typeof imgClass !== 'undefined')
                            $svg = $svg.attr('class', imgClass + ' replaced-svg');

                        //ADD HOVER COLOR CHANGE FOR SVGS
                        /*
                        var previousColor = '#FFFFFF';
                        $svg.mouseover(() => $svg.find("path").each((n, e) => {
                            var path = $(e);
                            previousColor = path.attr('fill');
                            path.css({
                                fill: hoverColor
                            });
                        }));

                        $svg.mouseout(() => $svg.find("path").each((n, e) => {
                            setTimeout(
                                () => $(e).css({
                                    fill: previousColor
                                }), 1000);
                        }));
                        */

                        // Remove any invalid XML tags as per http://validator.w3.org
                        $svg = $svg.removeAttr('xmlns:a');

                        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width'))
                            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))

                        // Replace image with new SVG
                        $img.replaceWith($svg);
                    }, 'xml');
            });
        },

        googleSearch: (input) => {
            if (typeof (input) !== 'string')
                throw 'input is not a string...';

            var url = 'https://www.google.com/search?q=';

            var keyWords = input.split(' ');

            for (var word of keyWords)
                url += '+' + word;

            window.open(url);
        },

        getImage: (path) => {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = path;
            });
        },

        length: (obj) => {
            if (Array.isArray(obj))
                return obj.length;
            else if (typeof (obj) === 'object') {
                var length = 0;
                for (var prop in obj)
                    length++;
                return length;
            }
            else
                return null;
        },

        in: (obj, values) => {
            for (var i = 0; i < values.length; i++)
                if (values[i] === obj) return true;
            return false;
        },

        select: (converter, values) => {
            var result = [];
            for (let i = 0; i < values.length; i++)
                result.push(converter(values[i]));

            return result;
        },

        any: (predicate, values) => {
            for (var i = 0; i < values.length; i++)
                if (predicate(values[i]))
                    return true;
            return false;
        },

        loadFromUrl: (url, callback, sourceType) => {
            $.ajax({
                url: url,
                dataType: sourceType || 'script',
                success: callback,
                async: true
            });
        },

        equals: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),

        clone: (obj) => JSON.parse(JSON.stringify(obj)),

        getStyleFromElement: (id) => {
            return document.getElementById(id).style;
        },

        getStyleFromUrl: (url, linkId) => {
            linkId = linkId || randomString();
            if (!document.getElementById(linkId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                head.appendChild(link);
            }
        },

        writeStyles: (styleName, cssRules) => {
            var styleElement = document.getElementById(styleName);
            var pastCssRules = (styleElement && styleElement.textContent) ? styleElement.textContent : null;

            if (styleElement) {
                document.getElementsByTagName('head')[0].removeChild(
                    styleElement);
            }

            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = styleName;

            if (cssRules.length) {
                for (var css of cssRules) {
                    styleElement.appendChild(document.createTextNode(css));
                }
            }
            else {
                styleElement.innerHTML = cssRules;
            }

            document.getElementsByTagName('head')[0].appendChild(styleElement);
        },

        doesUrlExist: (method, url) => {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // XHR for Chrome/Firefox/Opera/Safari.
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest !== "undefined") {
                // XDomainRequest for IE.
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // CORS not supported.
                xhr = null;
            }
            return xhr;
        },

        getRandomColor: () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        getInactiveTime: () => {
            var t;
            window.onload = resetTimer;
            document.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onmousedown = resetTimer; // touchscreen presses
            document.ontouchstart = resetTimer;
            document.onclick = resetTimer;     // touchpad clicks
            document.onscroll = resetTimer;    // scrolling with arrow keys
            document.onkeypress = resetTimer;

            var logout = () => {
                console.log("Inactive action...");
            }

            var resetTimer = () => {
                clearTimeout(t);
                t = setTimeout(logout, 3000);
            }
        },

        getProviders: () => {
            angular.module(page.APPNAME)['_invokeQueue'].forEach(function (value) {
                console.log(value[1] + ": " + value[2][0]);
            });
        },

        randomString: (len) => {
            if (typeof (len) !== 'number')
                throw "parameter len has to be a interger...";

            var anysize = len;
            var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            result = "";
            for (var i = 0; i < anysize; i++)
                result += charset[Math.floor(Math.random() * charset.length)];

            return result;
        },

        removeAllLinks: (link) => {
            for (var tag of $('a')) {
                var ele = $(tag);

                if (ele.attr('href'))
                    ele.attr('href', link || '');
            }
        },

        changeTargetedColors: (colorsToCheck, onMatch, onMisMatch) => {
            for (let tag of $('*')) {
                let ele = $(tag);

                for (let pair of colorsToCheck) {
                    if (pair[2] && pair[2].length !== 0) {
                        for (let attr of pair[2]) {
                            let colorToChange = pair[0];
                            let changeToColor = pair[1];

                            if (ele.css(attr) === colorToChange) {
                                onMatch(ele);

                                if (changeToColor.includes('!important'))
                                    ele.attr('style', attr + ': ' + changeToColor);
                                else
                                    ele.css(attr, changeToColor);
                            }
                            else {
                                onMisMatch(ele);
                            }
                        }
                    }
                }
            }
        },

        isValidURL: (url) => {
            var urlPattern = "(https?|ftp)://(www\\.)?(((([a-zA-Z0-9.-]+\\.){1,}[a-zA-Z]{2,4}|localhost))|((\\d{1,3}\\.){3}(\\d{1,3})))(:(\\d+))?(/([a-zA-Z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?(\\?([a-zA-Z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*)?(#([a-zA-Z0-9._-]|%[0-9A-F]{2})*)?";

            urlPattern = "^" + urlPattern + "$";
            var regex = new RegExp(urlPattern);

            return regex.test(url);
        },

        removeElement: (elementId) => {
            // Removes an element from the document
            var element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        }
    }
};


page.APPNAME = 'sandbox';
page.siteOptions = {
    billManagerChartType: 1
};



page.startSite(() => {
    page.utilities.inlineSvgs();
    page.utilities.setUpJQSwipeHandlers();
});
Array.prototype.add = function (obj) {
    if (this.findIndex((a) => a.key === obj.key) !== -1) {
        this[this.findIndex((a) => a.key === obj.key)] = obj;
    }
    else { this.push(obj); }
}

Array.prototype.findByKey = function (key) {
    if (this.findIndex((a) => a.key === key) !== -1) {
        return this[this.findIndex((a) => a.key === key)];
    }
    else { return null; }
}

Array.prototype.any = function (func) {
    if (!func instanceof Function)
        return false;
    else {
        for (let item of this) {
            if (func(item) === true)
                return true;
        }

        return false;
    }
}

Array.prototype.in = function (value) {
    for (let item of this) {
        if (item === value)
            return true;
    }
    return false;
}


Number.prototype.toKey = function (keyAndValueArr) {
    if (!Array.isArray(arr)) { return this; }
    var key = null;

    for (let item of keyAndValueArr) {
        if (!item || !item.key || !item.value) { continue; };

        key = (this === item.value) ? item.key : this;
    }
    return key;
}


String.prototype.safeName = function () {
    return this.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s+]/g, '');
}



String.prototype.replaceAt = function (index, replacement, replacementLength) {
    return this.substr(0, index) + replacement + this.substr(index + replacementLength || index + replacement.length);
}


  
(function () {
    "use strict";

    angular.module(page.APPNAME)
        .factory('$alertService', ServiceFactory);

    ServiceFactory.$inject = ['toastr'];

    function ServiceFactory(toastr) {
        var svc = this;

        svc.toastr = toastr;

        svc.success = _success;
        svc.info = _info;
        svc.error = _error;
        svc.warning = _warning;
        
        function _success(msg, header) {
            svc.toastr.success(msg, header || "Success");
        }

        function _info(msg, header) {
            svc.toastr.info(msg, header || "Info");
        }

        function _error(msg, header) {
            svc.toastr.error(msg, header || "Error");
        }

        function _warning(msg, header) {
            svc.toastr.warning(msg, header || "Warning");
        }

        return svc;
    }

})();
(function () {
    "use strict";

    angular.module(page.APPNAME)
        .factory('$systemEventService', EventServiceFactory);

    EventServiceFactory.$inject = ['$rootScope'];

    function EventServiceFactory($rootScope) {
        var svc = this;

        svc.$rootScope = $rootScope;

        svc.listen = _listen;
        svc.broadcast = _broadcast;

        svc.$rootScope.$on('$locationChangeStart', svc.broadcast);

        function _listen(event, callback, $scope) {

            if ($scope)
                $scope.$on(event, callback);


            else
                svc.$rootScope.$on(event, callback);


        }

        function _broadcast() {
            svc.$rootScope.$broadcast(arguments[0], arguments);
        }

        return svc;
    }

})();
(function () {

    page.baseController = angular.module(page.APPNAME)
        .factory("$baseController", baseController);

    baseController.$inject = [
        '$document'
        , '$systemEventService'
        , '$alertService'
        , "$window"
        , "$location"
        , '$uibModal'
        , '$timeout'
        , '$http'
        , '$sce'
        , '$cookies'
        , '$q'];

    function baseController($document, $systemEventService, $alertService, $window, $location, $uibModal, $timeout, $http, $sce, $cookies, $q) {

        //PUBLIC
        var base = {
            document: $document,
            event: $systemEventService,
            alert: $alertService,
            window: $window,
            modal: $uibModal,
            timeout: $timeout,
            http: $http,
            sce: $sce,
            cookies: $cookies,
            Q: $q
        };

        base.tryAgain = function (maxLoops, miliseconds, promiseMethod, onSuccess) {

            if (onSuccess === null) { onSuccess = (data) => console.log(data); }
            var root = {};

            root.promiseMethod = promiseMethod;
            root.currentIndex = 0;

            _start();

            function _start() {
                var method = () => _repeatUntilSuccessful(root.promiseMethod(), miliseconds, maxLoops, data => onSuccess(data));
                base.timeout(method, miliseconds);
            }

            function _repeatUntilSuccessful(promise, time, maxLoops, callback = null) {

                function delay(time, val) {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(val);
                        }, time);
                    });
                }

                function success(data) {
                    if (callback !== null) {
                        callback(data);
                    }
                    return;
                }

                function error(data) {
                    if (root.currentIndex >= maxLoops) { return; }
                    else {
                        return delay(time).then(
                            () => { root.currentIndex++; _repeatUntilSuccessful(root.promiseMethod(), time, maxLoops, callback); },
                            () => { root.currentIndex++; _repeatUntilSuccessful(root.promiseMethod(), time, maxLoops, callback); }
                        );
                    }
                }

                base.Q.when(promise, success, error);

            }

        }

        base.errorCheck = function (err, tryAgainObj) {

            if (!tryAgainObj)
                tryAgainObj = {};


            if (!tryAgainObj.maxLoops)
                tryAgainObj.maxLoops = 3;


            if (!tryAgainObj.miliseconds)
                tryAgainObj.miliseconds = 1000;


            if (!tryAgainObj.promiseMethod)
                tryAgainObj.promiseMethod = () => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    });
                }


            if (!tryAgainObj.onSuccess)
                tryAgainObj.onSuccess = (data) => console.log(data);


            if (err.data.errors && err.data.errors.length) {
                for (var error of err.data.errors) {
                    switch (error) {

                        default:
                            if (!tryAgainObj || !tryAgainObj.maxLoops || !tryAgainObj.miliseconds || !tryAgainObj.promiseMethod)
                                return;
                            else
                                base.tryAgain(tryAgainObj.maxLoops
                                    , tryAgainObj.miliseconds
                                    , tryAgainObj.promiseMethod
                                    , tryAgainObj.onSuccess);
                            break;
                    }
                }
            }
            else {
                switch (err.status) {
                    //case 401:
                    //    base.loginPopup();
                    //    break;

                    default:
                        if (!tryAgainObj || !tryAgainObj.maxLoops || !tryAgainObj.miliseconds || !tryAgainObj.promiseMethod) { return; }
                        base.tryAgain(tryAgainObj.maxLoops
                            , tryAgainObj.miliseconds
                            , tryAgainObj.promiseMethod
                            , tryAgainObj.onSuccess);
                        break;
                }
            }
        }

        base.defaultListeners = function (scope, listeners) {

            //#region Default Listeners

            $systemEventService.listen('$viewContentLoaded', () => {
                window.ga('send', 'pageview', { page: $location.url() });
            }, scope);

            //#endregion

            if (listeners) {

                var isArray = Array.isArray(listeners);
                var length = isArray ? listeners.length : typeof (listeners) === 'object' ? Object.keys(listeners).length : 0;

                for (var i = 0; i < length; i++) {

                    var event = isArray ? (listeners[i].event || null) : Object.keys(listeners)[i],
                        method = isArray ? (listeners[i].method || null) : listeners[Object.keys(listeners)[i]];


                    if (event && method)
                        $systemEventService.listen(event, method, scope);
                }
            }
        }

        return base;
    }

})();