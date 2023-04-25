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

    angular.module(page.APPNAME).factory("$oblApiService", sandboxService);

    sandboxService.$inject = ["$http"];

    function sandboxService($http) {
        return {
            validateUrl: _validateUrl,
            getEnums: _getEnums,

            getChartById: _getChartById,
            getAllChartsByUser: _getAllChartsByUser,
            insertChart: _insertChart,
            updateChart: _updateChart,
            deleteChartById: _deleteChartById,

            insertCard: _insertCard,
            getAllCards: _getAllCards,
            getAllCardsByUser: _getAllCardsByUser,
            deleteCard: _deleteCard,
            updateCard: _updateCard,


            getIncomesChart: _getIncomesChart,
            getExpensesChart: _getExpenseChart,
            getCombinedChart: _getCombinedChart,
            insertIncome: _insertIncome,
            getAllIncomes: _getAllIncomes,
            getIncomeByName: _getIncome,
            deleteIncome: _deleteIncome,
            updateIncome: _updateIncome,
            insertExpense: _insertExpense,
            getAllExpenses: _getAllExpenses,
            getExpenseByName: _getExpense,
            deleteExpense: _deleteExpense,
            updateExpense: _updateExpense
        };

        function _validateUrl(url) {

            return $http({
                url: "/api/config/site?url=" + encodeURIComponent(url),
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getEnums(enumType) {
            var url = "/api/config/enums/";
            url += Array.isArray(enumType) ? enumType.join(",") : enumType;

            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }



        function _getChartById(id) {
            return $http({
                method: "GET",
                url: "/api/charts/" + id,
            });
        }

        function _getAllChartsByUser() {
            return $http({
                url: "/api/charts/user",
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _insertChart(model) {
            var url = "/api/charts/";
            model.typeId === 3 ? url += "int" : url += "list/int";

            return $http({
                method: "POST",
                url: url += "?username=" + page.user.username,
                data: model
            });
        }

        function _updateChart(model) {
            var url = "/api/charts/";
            model.typeId === 3 ? url += "int" : url += "list/int";
            return $http({
                method: "PUT",
                url: url += "?username=" + page.user.username,
                data: model
            });
        }

        function _deleteChartById(id) {
            return $http({
                method: "DELETE",
                url: "/api/charts/delete/" + id,
            });
        }



        function _insertCard(model) {
            return $http({
                url: "/api/cards?username=" + page.user.username,
                method: "POST",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getAllCards() {
            return $http({
                url: "/api/cards/all",
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getAllCardsByUser() {
            return $http({
                url: "/api/cards/user",
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _deleteCard(id) {
            return $http({
                url: "/api/cards/delete/" + id,
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _updateCard(model) {
            return $http({
                url: "/api/cards?username=" + page.user.username,
                method: "PUT",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }



        function _getIncomesChart(start, end) {
            var url = "/api/bill/income/chart";
            url += (start && end) ? "?" : "";
            url += (!start) ? "" : (end) ? "startDate=" + start + "&endDate=" + end : "startDate=" + start;

            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getExpenseChart(start, end) {
            var url = "/api/bill/expenses/chart";
            url += (start && end) ? "?" : "";
            url += (!start) ? "" : (end) ? "startDate=" + start + "&endDate=" + end : "startDate=" + start;
            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getCombinedChart(start, end) {
            var url = "/api/bill/combined/chart";
            url += (start && end) ? "?" : "";
            url += (!start) ? "" : (end) ? "startDate=" + start + "&endDate=" + end : "startDate=" + start;
            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _insertIncome(model) {
            return $http({
                url: "/api/bill/income",
                method: "POST",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getAllIncomes() {
            return $http({
                url: "/api/bill/income/all",
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getIncome(id, name, scheduleType, incomeType) {

            if (!id && !name && !scheduleType && !incomeType) { return _getAllIncomes(); }

            var url = "/api/bill/income";
            var isFirst = true;
            url += (isFirst && id && id !== null && typeof (id) === "int") ? "?id=" + id : (id && id !== null && typeof (id) === "int") ? "&id=" + id : "";
            url += (isFirst && name && name !== null && typeof (name) === "string") ? "?name=" + name : (name && name != null && typeof (name) === "string") ? "&name=" + name : "";
            url += (isFirst && scheduleType && scheduleType !== null && typeof (scheduleType) === "int") ? "?scheduleType=" + scheduleType : (scheduleType && scheduleType !== null && typeof (scheduleType) === "int") ? "&scheduleType=" + scheduleType : "";
            url += (isFirst && incomeType && incomeType !== null && typeof (incomeType) === "int") ? "?incomeType=" + incomeType : (incomeType && incomeType !== null && typeof (incomeType) === "int") ? "&incomeType=" + incomeType : "";

            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _deleteIncome(id) {
            return $http({
                url: "/api/bill/income/" + id,
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _updateIncome(model) {
            return $http({
                url: "/api/bill/income",
                method: "PUT",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _insertExpense(model) {
            return $http({
                url: "/api/bill/expenses",
                method: "POST",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getAllExpenses() {
            return $http({
                url: "/api/bill/expenses/all",
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _getExpense(id, name, scheduleType, billType) {

            if (!id && !name && !scheduleType && !billType) { return _getAllExpenses(); }

            var url = "/api/bill/expenses";
            var isFirst = true;
            url += (isFirst && id && id !== null && typeof (id) === "int") ? "?id=" + id : (id && id != null && typeof (id) === "int") ? "&id=" + id : "";
            url += (isFirst && name && name !== null && typeof (name) === "string") ? "?name=" + name : (name && name !== null && typeof (name) === "string") ? "&name=" + name : "";
            url += (isFirst && scheduleType && scheduleType !== null && typeof (scheduleType) === "int") ? "?scheduleType=" + scheduleType : (scheduleType && scheduleType !== null && typeof (scheduleType) === "int") ? "&scheduleType=" + scheduleType : "";
            url += (isFirst && billType && billType !== null && typeof (billType) === "int") ? "?billType=" + billType : (billType && billType !== null && typeof (billType) === "int") ? "&billType=" + billType : "";

            return $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _deleteExpense(id) {
            return $http({
                url: "/api/bill/expenses/" + id,
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            });
        }

        function _updateExpense(model) {
            return $http({
                url: "/api/bill/expenses",
                method: "PUT",
                data: model,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

})();
(function () {


    angular.module(page.APPNAME)
        .directive('googleSignIn', googleSignIn);

    function googleSignIn() {
        return {
            restrict: 'A',
            require: ['clientId'],
            scope: {
                clientId: '=',
                signinSuccess: '&?',
                signinFailure: '&?'
            },
            link: function ($scope, element, attr) {

                _render();

                function _render() {
                    _setUp();

                    if ($scope.clientId)
                        _googleInit($scope.clientId);
                    else
                        throw "Must provide the googleSignIn directive with a client-id attribute...";
                }

                function _setUp() {
                    $scope.signinSuccess = $scope.signinSuccess || ((data) => { console.log(data); });
                    $scope.signinFailure = $scope.signinFailure || ((err) => { console.log(err); });

                }

                function _googleInit(clientId) {
                    gapi.load('auth2', function () {
                        // Retrieve the singleton for the GoogleAuth library and set up the client.
                        auth2 = gapi.auth2.init({
                            client_id: clientId,
                            cookiepolicy: 'single_host_origin',
                            // Request scopes in addition to 'profile' and 'email'
                            //scope: 'additional_scope'
                        });

                        _googleSigninPopup(element[0]);

                    });
                }

                function _googleSigninPopup(element) {

                    auth2.attachClickHandler(
                        element
                        , {}
                        , (data) => { $scope.signinSuccess({ user: data.w3 }) }
                        , $scope.signinFailure
                    );
                }

            }
        }
    }

})();
// Load the JavaScript SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function () {

    angular.module(page.APPNAME)
        .directive('facebookSignIn', facebookSignIn);

    function facebookSignIn() {
        return {
            restrict: 'A',
            require: ['appId'],
            scope: {
                appId: '=',
                signinSuccess: '&?',
                signinFailure: '&?'
            },
            link: function ($scope, element, attr) {

                _render();

                function _render() {

                    _setUp();
                    _handlers();

                    if ($scope.appId)
                        _fbInit($scope.appId);
                    else
                        throw "Must provide the facebookSignIn directive with a app-id attribute...";
                }

                function _setUp() {
                    $scope.signinSuccess = $scope.signinSuccess || ((data) => { console.log(data); });
                    $scope.signinFailure = $scope.signinFailure || ((err) => { console.log(err); });

                }

                function _handlers() {
                    $(element[0]).on('click', () => {
                        _fbLogin();
                    });
                }

                function _fbInit(appId) {
                    // FB JavaScript SDK configuration and setup
                    FB.init({
                        appId: appId, // FB App ID
                        cookie: true,  // enable cookies to allow the server to access the session
                        xfbml: true,  // parse social plugins on this page
                        version: 'v3.1'
                    });


                }

                function _fbLogin() {

                    // Check whether the user already logged in
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'connected') {
                            _getFbUserData();
                        }
                        else {
                            FB.login((response) => {
                                if (response.authResponse) {
                                    getFbUserData();
                                }
                            }, { scope: 'email' });
                        }
                    });


                }

                function _getFbUserData() {
                    FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email' }, $scope.signinSuccess);
                }


            }
        }
    }

})();
(function () {

    angular.module(page.APPNAME)
        .directive("render", renderElementDirective);

    renderElementDirective.$inject = ['$window'];

    function renderElementDirective($window) {

        return _returnDirective();

        function _returnDirective() {
            return {
                restrict: "E",
                scope: {
                    html: '@',
                    css: '@',
                    js: '@',
                    appendScriptToBody: '@',
                    reRenderAtSize: '@',
                    params: '=',
                    debug: '@'
                },
                link: function (scope, element, attr) {

                    $(document).ready(_render);

                    function _render() {

                        _getElement((html) => {
                            element.append($.parseHTML(html));
                            _getAndRunJs((code, params) => {
                                js = _evaluateJS(code, params, scope.debug || false);
                                _runJs(js, scope.appendScriptToBody || false);
                            });
                        });

                        if (scope.reRenderAt)
                            angular.element($window).bind('resize', function () {
                                scope.width = $window.innerWidth;

                                if (scope.width == scope.reRenderAt)
                                    _reRender();

                                scope.$digest();
                            });

                    }

                    function _getElement(callback) {

                        var result = '',
                            cssUrl = (attr.css[0] === '~') ? attr.css.replace('~', window.location.origin) : (attr.css[0] === '/') ? window.location.origin + attr.css : (attr.css) ? attr.css : "",
                            htmlUrl = (attr.html[0] === '~') ? attr.html.replace('~', window.location.origin) : (attr.html[0] === '/') ? window.location.origin + attr.html : (attr.html) ? attr.html : "";

                        if (_isValidURL(cssUrl) && (!window.loadedScripts || !window.loadedScripts.includes(cssUrl))) {
                            _getStyleFromUrl(cssUrl);
                            _addUrlToWindow(cssUrl);
                        }
                        else if (attr.css)
                            result = '<style>' + attr.css + '</style>';


                        if (_isValidURL(htmlUrl))
                            _loadFromSource(htmlUrl, callback, 'html');
                        else
                            callback(attr.html);
                    }

                    function _getAndRunJs(callback) {
                        var jsUrl = (attr.js[0] === '~') ? attr.js.replace('~', window.location.origin) : (attr.js[0] === '/') ? window.location.origin + attr.js : (attr.js) ? attr.js : "",
                            params = scope.params || {};


                        if (_isValidURL(jsUrl))
                            _loadFromSource(jsUrl, (code) => callback(code, params));
                        else if (attr.js)
                            callback(attr.js, params);

                    }

                    function _reRender() {
                        _getElement((html) => {
                            $(element.children()[0]).remove();
                            element.append($.parseHTML(html));
                            _getAndRunJs((code, params) => {
                                js = _evaluateJS(code, params, scope.debug || false);
                                _runJs(js, scope.appendScriptToBody || false);
                            });
                        });
                    }
                }
            };
        }

        function _evaluateJS(js, params, debug) {

            params = params ? params : {};

            var iifeRegex = /(\(function)\W*(([a-zA-Z])*(,)(\s|\S))*(([a-zA-Z])*\))/i,
                paramsRegex = /(?!\(\)|([a-zA-Z]))\((([a-zA-Z])*(,)(\s|\S))*(([a-zA-Z])*\))/i,
                funcRegex = /(\(function)\W*/i;


            if (iifeRegex.test(js)) {

                var match = paramsRegex.exec(js)[0];

                if (match) {
                    var parameters = match.slice(1, match.length - 1).split(", ");

                    for (var key of parameters) {

                        if (Object.keys(params).some(a => a === key)) {
                            var value = params[key];
                            if (typeof (value) === 'string')
                                value = "\"" + value + "\"";
                            else if (typeof (value) === 'object')
                                value = JSON.stringify(value);

                            js = js.replaceAt(js.lastIndexOf(key), value, key.length);

                        }
                        else {
                            var n = "null";
                            for (var i = 0; i < key.length - 4; i++)
                                n += " ";

                            js = js.replaceAt(js.lastIndexOf(key), n, key.length);

                        }


                    }
                }
            }

            else {
                js = '(' + js + ')';

            }

            if (debug === true)
                console.log(js);

            return js;

        }

        function _runJs(js, appendToBody) {
            if (appendToBody === 'true') {
                var script = $("<script type='text/javascript'></script>");
                script.text(js);
                $('body').append(script);
            }
            else {
                eval(js);
            }
        }

        function _isValidURL(url) {

            return /^(f|ht)tps?:\/\//i.test(url);

        }

        function _loadFromSource(url, callback, dataType) {

            $.when($.ajax({
                url: url,
                dataType: dataType
            })).done(callback);


            //.then(, (err) => console.log(err));
        }

        function _getStyleFromUrl(url) {

            if (!$('link').filter((i, ele) => ele.href === url)[0]) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = 'renderedStyle_' + _randomString(10);
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                head.appendChild(link);
            }
        }

        function _randomString(len) {
            if (typeof (len) !== 'number')
                throw "parameter len has to be a interger...";

            var anysize = len;
            var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            result = "";
            for (var i = 0; i < anysize; i++)
                result += charset[Math.floor(Math.random() * charset.length)];

            return result;
        }

        function _addUrlToWindow(url) {

            if (url) {
                if (window.loadedScripts)
                    window.loadedScripts.push(url);
                else
                    window.loadedScripts = [url];
            }

        }

    }

})();