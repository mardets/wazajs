(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../../core/config/hash");
var path_1 = require("../../core/config/path");
var location_1 = require("../../core/config/location");
var helper_1 = require("../../core/util/helper");
var ApplicationController = function () {
    function ApplicationController(layout) {
        this.layout = layout;
        this.resources = [];
        this.hash = new hash_1.Hash();
        this.path = new path_1.Path();
        this.location = new location_1.Location();
    }
    ApplicationController.prototype.displayLayout = function (layout, hashname, resource, title, callback) {
        var layoutToDisplay = layout;
        var path = '/' + hashname;
        if (path.charAt(2) === '/') {
            path = path.substring(2, path.length);
        }
        layoutToDisplay.setViewLayout(path, title, this.setTemplate || callback, resource);
    };
    ApplicationController.prototype.getResources = function () {
        return this.resources;
    };
    ApplicationController.prototype.getLayout = function () {
        return this.layout;
    };
    ApplicationController.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    ApplicationController.prototype.render = function (template, title, data) {
        var contentEl = window.document.querySelector('.ui-view');
        contentEl.innerHTML = template;
        window.document.querySelector('title').textContent = title;
    };
    ApplicationController.prototype.observe = function (resource, template) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayRoutes, routeResource, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayRoutes = resource.getLayout().getPage().getRoute().getRoutes();
                        routeResource = helper_1.Helper.filter(arrayRoutes, '/' + resource.getLayout().hash.name);
                        if (!(routeResource === undefined)) return [3 /*break*/, 1];
                        this.render('<p>404 page : the resource is not available</p>', '404 error');
                        return [3 /*break*/, 4];
                    case 1:
                        console.log("Apply the function");
                        if (!(routeResource.path !== '/')) return [3 /*break*/, 3];
                        return [4 /*yield*/, routeResource.handler()];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3:
                        console.log(response);
                        this.render(template, resource.location.title);
                        this.htmlMarkup('#list', JSON.parse(response));
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.prototype.setResources = function (resource) {
        if (resource.getResources !== null) {
            this.resources[this.resources.length] = resource;
        }
    };
    ApplicationController.reload = function (layout, hash, title) {
        this.prototype.displayLayout(layout, hash, this, title, this.prototype.setTemplate);
        window.location.reload();
    };
    ApplicationController.prototype.setTemplate = function (template, clazz, hashname) {
        var resources = clazz.instanceBuilder();
        for (var i = 0; i < resources.length; i++) {
            if (resources[i].getLayout().hash.name.includes(resources[i].hash.name)) {
                clazz.observe(resources[i], template);
                break;
            }
        }
        return;
    };
    /**
    * Example case
    */
    ApplicationController.prototype.htmlMarkup = function (style, data) {
        var markupEl = window.document.querySelector(style);
        if (style.includes('list')) {
            var ul = window.document.createElement('ul');
            for (var i = 0; i < data.length; i++) {
                var li = window.document.createElement('li');
                var a = window.document.createElement('a');
                li.appendChild(a);
                a.textContent = data[i].ref_pack;
                ul.appendChild(li);
                markupEl.appendChild(ul);
            }
        }
    };
    return ApplicationController;
}();
exports.ApplicationController = ApplicationController;

},{"../../core/config/hash":3,"../../core/config/location":4,"../../core/config/path":5,"../../core/util/helper":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../../core/config/hash");
var Layout = function () {
    function Layout(page) {
        this.page = page;
        this.hash = new hash_1.Hash();
        this.layoutView = '';
    }
    Layout.prototype.getViewLayout = function () {
        return this.layoutView;
    };
    Layout.prototype.setViewLayout = function (pathuri, title, cb, resource) {
        var _this = this;
        var cacheTpl = this.page.getRoute().getCacheTpl();
        if (pathuri !== '/') {
            /*let uri = pathuri.substring(1, pathuri.length) + '\\' + pathuri.substring(1, pathuri.length);
            if(cacheTpl[uri + '.html'] !== undefined) {
                this.layoutView = cacheTpl[uri + '.html']
            }
            else {
                let uri = pathuri.substring(1, pathuri.length) + pathuri.substring(1, pathuri.length);
                this.layoutView = cacheTpl[uri + '.html']
            }*/
            if (pathuri) {
                var _pathuri = pathuri.substring(1, pathuri.length);
                var uri = _pathuri.substr(0, _pathuri.indexOf("/"));
                if (pathuri.includes('create')) {
                    this.layoutView = cacheTpl[uri + 'create.html'];
                }
                if (pathuri.includes('update')) {
                    this.layoutView = cacheTpl[uri + 'edit.html'];
                }
                if (pathuri.includes('list')) {
                    this.layoutView = cacheTpl[uri + 'list.html'];
                }
                if (!pathuri.includes('create') && !pathuri.includes('update') && !pathuri.includes('list')) {
                    uri += uri;
                    this.layoutView = cacheTpl[uri + '.html'];
                }
            }
        } else {
            this.layoutView = cacheTpl['layout\layout.html'];
        }
        setTimeout(function () {
            _this.page.setCacheTpl(pathuri, pathuri.substring(1, pathuri.length), _this.layoutView, cb, resource);
        }, 1100);
    };
    Layout.prototype.getPage = function () {
        return this.page;
    };
    return Layout;
}();
exports.Layout = Layout;

},{"../../core/config/hash":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Hash = function () {
    function Hash() {
        this.name = window.location.hash.substr(2, window.location.hash.length - 1);
    }
    Hash.prototype.getName = function () {
        return this.name;
    };
    Hash.prototype.setName = function (name) {
        this.name = name;
    };
    return Hash;
}();
exports.Hash = Hash;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Location = function () {
    function Location() {
        this.title = '';
    }
    Location.prototype.getTitle = function () {
        return this.title;
    };
    Location.prototype.setTitle = function (title) {
        this.title = title;
    };
    return Location;
}();
exports.Location = Location;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Path = function () {
    function Path() {
        this.name = window.location.pathname;
        ;
    }
    Path.prototype.getName = function () {
        return this.name;
    };
    Path.prototype.setName = function (name) {
        this.name = name;
    };
    return Path;
}();
exports.Path = Path;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Helper = function () {
    function Helper() {}
    Helper.filter = function (array, path) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].path == path) {
                return array[i];
            } /*else {
                if(window.location.hash.substring(1, window.location.hash.length) == path) {
                    return array[i];
                }
              }*/
        }
    };
    Helper.hashToControllerName = function (value) {
        var strValue = '';
        var upperStrValue = '';
        if (value.charAt(value.length - 1) === 's') {
            strValue = value.substring(0, value.length - 1) + 'Controller';
            upperStrValue = strValue.charAt(0).toUpperCase() + strValue.substring(1, strValue.length);
        } else if (value === '') {
            return 'HomeController';
        } else {
            strValue = value + 'Controller';
            upperStrValue = strValue.charAt(0).toUpperCase() + strValue.substring(1, strValue.length);
        }
        return upperStrValue;
    };
    Helper.xmlToJson = function (xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) {
            obj = xml.nodeValue;
        }
        var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
            return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
            obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
                return text + node.nodeValue;
            }, "");
        } else if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof obj[nodeName] == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    };
    return Helper;
}();
exports.Helper = Helper;

},{}],7:[function(require,module,exports){
"use strict";
//import { Axios } from 'axios';

Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider = function () {
    function HttpProvider(config) {
        this.config = config;
        this.resource = config;
    }
    HttpProvider.prototype.getAPIUrl = function () {
        return this.resource.api;
    };
    HttpProvider.prototype.getApiKey = function () {
        return this.resource.API_KEY;
    };
    HttpProvider.prototype.getCollectionsList = function () {
        return this.getAPIUrl() + '/collections/?apiKey=' + this.resource.API_KEY;
    };
    HttpProvider.prototype.queryString = function (collection, query) {
        if (!query) {
            query = '';
        } else if (query.includes('?')) {
            query = '/' + query;
        } else {
            query = '?' + query;
        }
        //this.resource.collection = collection;
        var queryString = this.getAPIUrl() + '/collections/' + collection + query + 'apiKey=' + this.getApiKey();
        return queryString;
    };
    HttpProvider.prototype.fetch = function (path, options, collection) {
        var url = this.getAPIUrl() + path;
        var mheaders = new Headers();
        if (collection != "" && collection != undefined) {
            url = this.queryString(collection, path);
            mheaders.append("api-key", this.getApiKey());
        }
        var init = {
            method: options.method,
            headers: mheaders,
            mode: options.mode
        };
        var myRequest = new Request(url, init);
        return fetch(url, init).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request error");
            }
        });
    };
    HttpProvider.prototype.request = function (url, options, path, collection) {
        if (collection != "" && collection != undefined) {
            url = this.queryString(collection, path);
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            if (options.method = 'GET') {
                xhr.open(options.method, url);
            } else {
                xhr.open(options.method, url, options.body);
            }
            xhr.onload = function () {
                return resolve(xhr.responseText);
            };
            xhr.onerror = function () {
                return reject(xhr.statusText);
            };
            xhr.send();
        });
        /*let url = this.getAPIUrl() + path;
        
        if(collection != "" && collection != undefined) {
            url = this.queryString(collection, path);
        }
        
        return new Promise((resolve:any, reject:any) => {
            const xhr = new XMLHttpRequest();
            
            if (options.method = 'GET') {
                xhr.open(options.method, url);
            }
            else {
                xhr.open(options.method, url, options.body);
            }
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('lang', 'en');
            xhr.setRequestHeader('X-Powered-By', 'Express');
            
            if(this.getApiKey() !== undefined) {
                xhr.setRequestHeader('api-key', this.getApiKey());
            }
            
            
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });*/
    };
    return HttpProvider;
}();
exports.HttpProvider = HttpProvider;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("../application/controller/application");
var layout_1 = require("../application/layout/layout");
var PageProvider = function () {
    function PageProvider(router) {
        this.router = router;
        this.htmlView = '';
        this.url = window.location.href;
        this.layoutBuilder = {};
        this.cacheTpl = router.getCacheTpl();
    }
    PageProvider.prototype.setCacheTpl = function (url, hashname, html, callback, resource) {
        if (url !== '/') {
            this.layoutTemplate(this.cacheTpl['layout\layout.html'], this.layoutBuilder);
            callback(html, resource, hashname);
        } else {
            this.layoutTemplate(html, this.layoutBuilder);
        }
    };
    PageProvider.prototype.layoutTemplate = function (html, layoutBuilder) {
        this.setHtmlView(html);
        var builder = Object.keys(layoutBuilder);
        if (builder.length > 1) {
            for (var i = 0; i < builder.length; i++) {
                try {
                    var el = window.document.querySelector('' + layoutBuilder[builder[i]]);
                    el.innerHTML = this.cacheTpl['layout\\' + builder[i] + '\\' + builder[i] + '.html'];
                } catch (err) {
                    console.log("The page doesnt exist at the layout path", err);
                }
            }
        }
        // Binding All 'a' tags to event click
        this.bindTagOnClick('a');
    };
    PageProvider.prototype.getHtmlView = function () {
        return this.htmlView;
    };
    PageProvider.prototype.setHtmlView = function (html) {
        var el = window.document.querySelector('#app');
        if (!el) {
            console.error('Set the id as "app" to the div first child element of the body');
            return;
        }
        if (html === '' && window.location.pathname !== '') {
            el.innerHTML = '<div><div class="spinner"></div><a href="/">Back To Homepage</a></div>';
            this.htmlView = el.innerHTML;
        } else {
            el.innerHTML = html;
            this.htmlView = el.innerHTML;
        }
    };
    PageProvider.prototype.getUrl = function () {
        return this.url;
    };
    PageProvider.prototype.setUrl = function (url) {
        this.url = url;
    };
    PageProvider.prototype.getRoute = function () {
        return this.router;
    };
    // @deprecated
    PageProvider.prototype.path = function (url) {
        //return _.find(this.router.getRoutes(), ['path', url]);
    };
    // @deprecated
    PageProvider.prototype.filePath = function (url) {
        return this.path(url).component;
    };
    PageProvider.prototype.bindTagOnClick = function (tag) {
        var _this = this;
        var aList = window.document.querySelectorAll(tag);
        for (var i = 0; i < aList.length; i++) {
            aList.item(i).addEventListener('click', function (event) {
                var tag = event.currentTarget.textContent;
                window.location.assign('http://localhost:5000/#/' + tag);
                application_1.ApplicationController.reload(new layout_1.Layout(_this), tag);
            });
        }
    };
    return PageProvider;
}();
exports.PageProvider = PageProvider;

},{"../application/controller/application":1,"../application/layout/layout":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("../../www/view/templates");
var RouterProvider = function () {
    function RouterProvider() {
        this.routes = [];
        this.templates = templates_1.CacheTpl.builder();
        console.log(this.templates);
        //this.getRoutes();
    }
    RouterProvider.prototype.load = function (pathDir, componentHTMLName, templates) {
        return pathDir == '' ? templates['layout\layout.html'] : this.checkingTpl(pathDir, componentHTMLName);
    };
    RouterProvider.prototype.setRoutes = function (route) {
        this.routes[this.routes.length] = route;
    };
    RouterProvider.prototype.getRoutes = function () {
        return this.routes;
    };
    RouterProvider.prototype.getCacheTpl = function () {
        return this.templates;
    };
    RouterProvider.prototype.checkingTpl = function (pathDir, componentHTMLName) {
        if (this.templates[pathDir + componentHTMLName.toLowerCase() + '.html']) {
            var value = pathDir + componentHTMLName.toLowerCase() + '.html';
            return this.templates[value];
        } else if (this.templates[pathDir + '\\' + componentHTMLName.toLowerCase() + '.html']) {
            var value = pathDir + '\\' + componentHTMLName.toLowerCase() + '.html';
            return this.templates[value];
        } else {
            throw new Error("The specified template doesn't exist. Add a template before routing.");
        }
    };
    return RouterProvider;
}();
exports.RouterProvider = RouterProvider;

},{"../../www/view/templates":20}],10:[function(require,module,exports){
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("../lib/application/controller/application");
var resources_1 = require("./resources");
var AppController = function (_super) {
    __extends(AppController, _super);
    function AppController(layout) {
        return _super.call(this, layout) || this;
    }
    AppController.prototype.init = function () {
        console.log("Init methogfdshfd for starting application instance");
        this.instanceBuilder();
        this.displayLayout(this.getLayout(), window.location.hash, this);
    };
    AppController.getInstance = function () {
        return this;
    };
    AppController.prototype.instanceBuilder = function () {
        console.log(resources_1.Resources.list(this.getLayout()));
        localStorage.setItem('resources', JSON.stringify(resources_1.Resources.list(this.getLayout())));
        return resources_1.Resources.list(this.getLayout());
    };
    AppController.reload = function (layout, hash, title) {
        this.prototype.displayLayout(layout, hash, this, title, this.prototype.setTemplate);
    };
    return AppController;
}(application_1.ApplicationController);
exports.AppController = AppController;

},{"../lib/application/controller/application":1,"./resources":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Application = function () {
    function Application(layout) {
        this.layout = layout;
    }
    Application.prototype.start = function (appController) {
        try {
            appController.init();
            console.log('App started! Welcome to Waza.');
            return this;
        } catch (err) {
            console.error('Error starting application!', err);
        }
    };
    return Application;
}();
exports.Application = Application;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Constants = function () {
    function Constants() {}
    Constants.getConfig = function () {
        return {
            api: 'http://localhost:4000',
            WAZA_CONFIG: {
                API_KEY: 'zd-e9-XFv8mB5neQWveNdlSQ43Cv_QRT',
                DB_NAME: 'starter-kit'
            },
            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            jwtKey: '',
            appName: 'Wazajs demo'
        };
    };
    return Constants;
}();
exports.Constants = Constants;

},{}],13:[function(require,module,exports){
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var home_service_1 = require("./home.service");
var application_1 = require("../../lib/application/controller/application");
var HomeController = function (_super) {
    __extends(HomeController, _super);
    function HomeController(layout) {
        var _this = _super.call(this, layout) || this;
        _this.Service = new home_service_1.HomeService();
        _this.location.title = 'Home page';
        _this.hash.name = 'home';
        return _this;
    }
    HomeController.prototype.findById = function (id) {
        return this.Service.findById(id);
    };
    HomeController.prototype.create = function (item) {
        this.Service.create(item);
    };
    HomeController.prototype.findAll = function () {
        return this.Service.findAll();
    };
    HomeController.prototype.update = function (id) {
        return this.Service.update(id);
    };
    HomeController.prototype.delete = function (id) {
        return this.Service.delete(id);
    };
    HomeController.prototype.render = function (template, type) {
        var contentEl = window.document.querySelector('.ui-view');
        contentEl.innerHTML = template;
    };
    return HomeController;
}(application_1.ApplicationController);
exports.HomeController = HomeController;

},{"../../lib/application/controller/application":1,"./home.service":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HomeService = function () {
    function HomeService() {}
    HomeService.prototype.findById = function (id) {
        return;
    };
    HomeService.prototype.create = function (item) {
        return;
    };
    HomeService.prototype.findAll = function () {
        return;
    };
    HomeService.prototype.update = function (id) {
        return;
    };
    HomeService.prototype.delete = function (id) {
        return;
    };
    return HomeService;
}();
exports.HomeService = HomeService;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
var page_1 = require("../lib/provider/page");
var router_1 = require("./router");
var layout_1 = require("../lib/application/layout/layout");
var application_controller_1 = require("./application.controller");
//import { CacheTpl } from './core/templates';
window.onload = function () {
    var router = new router_1.Router();
    var layout = new layout_1.Layout(new page_1.PageProvider(router));
    var app = new application_1.Application(layout);
    var appCtrl = new application_controller_1.AppController(layout);
    app.start(appCtrl);
};

},{"../lib/application/layout/layout":2,"../lib/provider/page":8,"./application":11,"./application.controller":10,"./router":19}],16:[function(require,module,exports){
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("../../lib/application/controller/application");
var pack_service_1 = require("./pack.service");
var http_1 = require("../../lib/provider/http");
var constants_1 = require("../constants");
var PackController = function (_super) {
    __extends(PackController, _super);
    function PackController(layout) {
        var _this = _super.call(this, layout) || this;
        PackController.service = new pack_service_1.PackService(new http_1.HttpProvider(constants_1.Constants.getConfig()));
        _this.location.title = 'Pack page';
        _this.hash.name = 'pack';
        return _this;
    }
    PackController.findById = function (id) {
        return PackController.service.findById(id);
    };
    PackController.create = function (item) {
        return PackController.service.create(item);
    };
    PackController.findAll = function () {
        var resp = PackController.service.findAll();
        console.log(resp);
        return resp;
    };
    PackController.update = function (id) {
        return PackController.service.update(id);
    };
    PackController.delete = function (id) {
        return PackController.service.delete(id);
    };
    PackController.prototype.render = function (template, type) {
        var contentEl = window.document.querySelector('.ui-view');
        contentEl.innerHTML = template;
    };
    return PackController;
}(application_1.ApplicationController);
exports.PackController = PackController;

},{"../../lib/application/controller/application":1,"../../lib/provider/http":7,"../constants":12,"./pack.service":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PackService = function () {
    function PackService(http) {
        this.http = http;
    }
    PackService.prototype.findById = function (id) {
        var path = '/packs/' + id;
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin' // include, *same-origin, omit
        };
        return this.http.request(path, options).then(function (res) {
            return res;
        });
    };
    PackService.prototype.create = function (item) {
        return;
    };
    PackService.prototype.findAll = function () {
        var path = this.http.getAPIUrl() + '/packs/list';
        var mheaders = new Headers();
        mheaders.append("Content-Type", "application/json");
        mheaders.append("lang", "en");
        mheaders.append("Access-Control-Allow-Origin", "*");
        mheaders.append("Content-Type", "application/json; charset=utf8");
        mheaders.append("Connection", "keep-alive");
        mheaders.append("Cache-Control", "no-cache");
        mheaders.append("X-Powered-By", "Express");
        var options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include' // include, *same-origin, omit
        };
        var init = {
            method: options.method,
            headers: mheaders,
            mode: options.mode,
            credentials: options.credentials
        };
        return this.http.request(path, init).then(function (response) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(response);
                }, 2000);
            });
        });
    };
    PackService.prototype.update = function (id) {
        return;
    };
    PackService.prototype.delete = function (id) {
        return;
    };
    return PackService;
}();
exports.PackService = PackService;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var home_controller_1 = require("./home/home.controller");
var pack_controller_1 = require("./pack/pack.controller");
var Resources = function () {
    function Resources() {}
    Resources.list = function (layout) {
        return [new home_controller_1.HomeController(layout), new pack_controller_1.PackController(layout)];
    };
    return Resources;
}();
exports.Resources = Resources;

},{"./home/home.controller":13,"./pack/pack.controller":16}],19:[function(require,module,exports){
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./view/templates");
var router_1 = require("../lib/provider/router");
var pack_controller_1 = require("./pack/pack.controller");
var Router = function (_super) {
    __extends(Router, _super);
    function Router() {
        var _this = _super.call(this) || this;
        _this.templates = templates_1.CacheTpl.builder();
        console.log(_this.templates);
        _this.getRoutes();
        return _this;
    }
    Router.prototype.getRoutes = function () {
        return this.routes = [{ path: '/', component: this.load('', '', this.templates) }, { path: '/home', component: this.load('home', 'Home', this.templates) }, { path: '/pack/list', component: this.load('pack', 'List', this.templates), handler: pack_controller_1.PackController.findAll }, { path: '/pack/create', component: this.load('pack', 'Create', this.templates), handler: pack_controller_1.PackController.create }, { path: '/pack/update/:ref_pack', component: this.load('pack', 'Edit', this.templates), handler: pack_controller_1.PackController.update }, { path: '/pack/:ref_pack', component: this.load('pack', 'Pack', this.templates), handler: pack_controller_1.PackController.findById }];
    };
    return Router;
}(router_1.RouterProvider);
exports.Router = Router;

},{"../lib/provider/router":9,"./pack/pack.controller":16,"./view/templates":20}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CacheTpl = function () {
    function CacheTpl() {}
    CacheTpl.builder = function () {
        var caches = {};
        caches['home\home.html'] = '<div id="home">\n  <h1>Home</h1>\n</div>\n';
        caches['layout\layout.html'] = '<div id="layout">\n  <nav class="navbar navbar-default navbar-fixed-top"></nav>\n  <div id="container">\n      <div class="row">\n          <div class="col-md-3">\n              <div class="sidenav"></div>\n          </div>\n          <div class="col-md-7">\n            <div class="row">\n                <header></header>\n            </div>\n            <div class="row">\n                <div class="ui-view">\n                  Hello world, Wazajs demo routing! <a href="#/home">home</a>&nbsp;<a href="#/pack/list">list packs</a>&nbsp;<a href="#/pack/436576245">ref_pack : 436576245</a>\n				  &nbsp;<a href="#/pack/update/436576245">update</a>\n                </div>\n            </div>\n          </div>\n      </div>  \n      <br><br>\n      <div id="footer">@Copyright Mard : company behind Wazajs</div>\n  </div>\n</div>';
        caches['pack\create.html'] = '<div id="create">\n  <h1>Create Pack</h1>\n</div>';
        caches['pack\edit.html'] = '<div id="edit">\n  <h1>Edit Pack</h1>\n</div>';
        caches['pack\list.html'] = '<div id="list">\n  <h1>Pack List</h1>\n</div>';
        caches['pack\pack.html'] = '<div id="pack">\n  <h1>Pack</h1>\n</div>\n';
        return caches;
    };
    return CacheTpl;
}();
exports.CacheTpl = CacheTpl;
;

},{}]},{},[15])

//# sourceMappingURL=main.js.map
