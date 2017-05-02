webpackJsonp([1,4],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_service__ = __webpack_require__(515);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__alert_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authentication_service__ = __webpack_require__(516);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__authentication_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(517);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__user_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var AppConfig = (function () {
    function AppConfig() {
        this.apiUrl = "http://localhost:9000";
    }
    return AppConfig;
}());
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(155);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchService = (function () {
    function SearchService(http, config) {
        this.http = http;
        this.config = config;
    }
    SearchService.prototype.search = function (search) {
        return this.http.post(this.config.apiUrl + "/search", search, this.jwt());
    };
    // private helper methods
    SearchService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ "Authorization": "Bearer " + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        }
        return null;
    };
    SearchService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], SearchService);
    return SearchService;
    var _a, _b;
}());
//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__(513);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_guard__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__(525);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__register_component__ = __webpack_require__(528);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__register_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_search_form__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_service__ = __webpack_require__(220);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchFormComponent = (function () {
    function SearchFormComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.submitted = false;
        this.types = ['Audio', 'Video', 'Text', 'Image'];
        this.searchResults = [];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.searchForm = new __WEBPACK_IMPORTED_MODULE_2__models_search_form__["a" /* SearchForm */]('1', '2', '3', new Date(), new Date(), '6', '7');
    }
    SearchFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log('Submitted');
        //console.log(JSON.stringify(this.searchForm))
        localStorage.setItem("searchForm", JSON.stringify(this.searchForm));
        this.router.navigate(["/search"]);
    };
    Object.defineProperty(SearchFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.searchForm); },
        enumerable: true,
        configurable: true
    });
    SearchFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'search-form',
            providers: [__WEBPACK_IMPORTED_MODULE_3__search_service__["a" /* SearchService */]],
            template: __webpack_require__(701),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__search_service__["a" /* SearchService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__search_service__["a" /* SearchService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], SearchFormComponent);
    return SearchFormComponent;
    var _a, _b;
}());
//# sourceMappingURL=search-form.component.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_service__ = __webpack_require__(220);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchResultComponent = (function () {
    function SearchResultComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.searchForm = JSON.parse(localStorage.getItem("searchForm"));
        console.log('Inside constructor' + JSON.stringify(this.searchForm));
    }
    SearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchService.search(this.searchForm)
            .subscribe(function (res) {
            //console.log(JSON.stringify(res.json().multimediaContents));
            _this.searchResult = res.json().multimediaContents;
            //console.log(this.searchResult);
        }, function (error) {
            console.log(error);
            //this.loading = false
        });
    };
    Object.defineProperty(SearchResultComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.searchResult); },
        enumerable: true,
        configurable: true
    });
    SearchResultComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'search-result',
            template: __webpack_require__(702),
            styles: [__webpack_require__(689)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__search_service__["a" /* SearchService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__search_service__["a" /* SearchService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], SearchResultComponent);
    return SearchResultComponent;
    var _a, _b;
}());
//# sourceMappingURL=search-result.component.js.map

/***/ }),

/***/ 394:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 394;


/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(520);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) { _this.message = message; });
    };
    AlertComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: "alert",
            template: __webpack_require__(694)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AlertService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AlertService */]) === 'function' && _a) || Object])
    ], AlertComponent);
    return AlertComponent;
    var _a;
}());
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_component__ = __webpack_require__(511);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__alert_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem("currentUser")) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchForm; });
var SearchForm = (function () {
    function SearchForm(keyWords, freeText, semanticSearch, inDate, endDate, type, source) {
        this.keyWords = keyWords;
        this.freeText = freeText;
        this.semanticSearch = semanticSearch;
        this.inDate = inDate;
        this.endDate = endDate;
        this.type = type;
        this.source = source;
    }
    return SearchForm;
}());
//# sourceMappingURL=search-form.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationStart */]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: "success", text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: "error", text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object])
    ], AlertService);
    return AlertService;
    var _a;
}());
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(155);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = (function () {
    function AuthenticationService(http, config) {
        this.http = http;
        this.config = config;
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post(this.config.apiUrl + "/users/authenticate", { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("currentUser", JSON.stringify(user));
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        //this.http.post(this.config.apiUrl + "/users/logout")
    };
    AuthenticationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a, _b;
}());
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(155);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(http, config) {
        this.http = http;
        this.config = config;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(this.config.apiUrl + "/users", this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(this.config.apiUrl + "/user/" + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post(this.config.apiUrl + "/users/register", user, this.jwt());
    };
    UserService.prototype.update = function (user) {
        return this.http.put(this.config.apiUrl + "/user/" + user.id, user, this.jwt());
    };
    UserService.prototype.delete = function (username) {
        return this.http.delete(this.config.apiUrl + "/user/" + username, this.jwt());
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ "Authorization": "Bearer " + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        }
        return null;
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_index__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_index__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search_form_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guards_index__ = __webpack_require__(335);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var appRoutes = [
    { path: "", component: __WEBPACK_IMPORTED_MODULE_4__search_search_form_component__["a" /* SearchFormComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__guards_index__["a" /* AuthGuard */]] },
    { path: "login", component: __WEBPACK_IMPORTED_MODULE_2__login_index__["a" /* LoginComponent */] },
    { path: "register", component: __WEBPACK_IMPORTED_MODULE_3__register_index__["a" /* RegisterComponent */] },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forRoot(appRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: "app-root",
            template: __webpack_require__(695)
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search_module__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_index__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_index__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_index__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_index__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_index__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__register_index__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__sidebar_index__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__navbar_index__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__loggedin_index__ = __webpack_require__(523);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__search_search_module__["a" /* SearchModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__directives_index__["a" /* AlertComponent */],
                __WEBPACK_IMPORTED_MODULE_11__home_index__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_12__login_index__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__register_index__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_14__sidebar_index__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_15__navbar_index__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_16__loggedin_index__["a" /* LoggedinComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* AppConfig */],
                __WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_10__services_index__["a" /* AlertService */],
                __WEBPACK_IMPORTED_MODULE_10__services_index__["b" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_10__services_index__["c" /* UserService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    HomeComponent.prototype.ngDoCheck = function () {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    };
    HomeComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.delete(id).subscribe(function () { _this.loadAllUsers(); });
    };
    HomeComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: "home-root",
            template: __webpack_require__(696)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["c" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_index__["c" /* UserService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__(521);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__home_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loggedin_component__ = __webpack_require__(524);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__loggedin_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedinComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoggedinComponent = (function () {
    function LoggedinComponent(router, http, route) {
        this.router = router;
        this.http = http;
        this.route = route;
    }
    LoggedinComponent.prototype.ngOnInit = function () {
        this.api = localStorage.getItem('serviceUrl');
    };
    LoggedinComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    };
    LoggedinComponent.prototype.getLoggedUser = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.firstName) {
            return user.firstName;
        }
        return 'Anonymus';
    };
    LoggedinComponent.prototype.logout = function (event) {
        event.preventDefault();
    };
    LoggedinComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-loggedin',
            template: __webpack_require__(697),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], LoggedinComponent);
    return LoggedinComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=loggedin.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(698)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AuthenticationService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navbar_component__ = __webpack_require__(527);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__navbar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent(router, http, route) {
        this.router = router;
        this.http = http;
        this.route = route;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.api = localStorage.getItem('serviceUrl');
    };
    NavbarComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    };
    NavbarComponent.prototype.getLoggedUser = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.firstName) {
            return user.firstName;
        }
        return 'Anonymus';
    };
    NavbarComponent.prototype.checkPage = function () {
        var url = window.location.href;
        if (url.indexOf('login') !== -1) {
            return false;
        }
        return true;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-navbar',
            template: __webpack_require__(699),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success("Registration successful", true);
            _this.router.navigate(["/login"]);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(700)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AlertService */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_result_component__ = __webpack_require__(339);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var searchRoutes = [
    { path: 'search', component: __WEBPACK_IMPORTED_MODULE_2__search_result_component__["a" /* SearchResultComponent */] }
];
var SearchRoutingModule = (function () {
    function SearchRoutingModule() {
    }
    SearchRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(searchRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchRoutingModule);
    return SearchRoutingModule;
}());
//# sourceMappingURL=search-routing.module.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_form_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_result_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_routing_module__ = __webpack_require__(529);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchModule = (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__search_routing_module__["a" /* SearchRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__search_form_component__["a" /* SearchFormComponent */],
                __WEBPACK_IMPORTED_MODULE_4__search_result_component__["a" /* SearchResultComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__search_service__["a" /* SearchService */]]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchModule);
    return SearchModule;
}());
//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_component__ = __webpack_require__(532);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__sidebar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarComponent = (function () {
    function SidebarComponent(router, http, route) {
        this.router = router;
        this.http = http;
        this.route = route;
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    };
    SidebarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'left-placeholder',
            template: __webpack_require__(703),
            styles: [__webpack_require__(690)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    serviceUrl: "http://localhost:3000"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(114)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"loggedin.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(114)(true);
// imports


// module
exports.push([module.i, "div.navbar-nav {\r\n    padding-left: 280px;\r\n}", "", {"version":3,"sources":["C:/dev/Play Framework/ocd/ui/src/app/navbar/navbar.component.css"],"names":[],"mappings":"AAAA;IACI,oBAAoB;CACvB","file":"navbar.component.css","sourcesContent":["div.navbar-nav {\r\n    padding-left: 280px;\r\n}"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(114)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"search-form.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(114)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"search-result.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 690:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(114)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"sidebar.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">{{message.text}}</div>"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<!-- main app container -->\r\n<div class=\"main-container\">\r\n    <div id=\"wrapper\">\r\n    <app-navbar></app-navbar>\r\n    <router-outlet></router-outlet>\r\n</div>\r\n</div>\r\n<!-- credits -->\r\n<!--div class=\"text-center\">\r\n<p>\r\n<a href=\"\" target=\"_top\">Open Content Discovery Tool</a>\r\n</p>\r\n<p>\r\n<a href=\"http://www.producer-project.eu/\" target=\"_top\">PRODUCER EU founded project</a>\r\n</p>\r\n</div-->"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<!--div class=\"col-md-6 col-md-offset-3\">\r\n    <h1>Hi {{currentUser.firstName}}!</h1>\r\n    <p>You're logged in inside Open Content Discovery Tool!!</p>\r\n    <h3>All registered users:</h3>\r\n    <ul>\r\n        <li *ngFor=\"let user of users\">\r\n            {{user.username}} ({{user.firstName}} {{user.lastName}})\r\n            - <a (click)=\"deleteUser(user.username)\">Delete</a>\r\n        </li>\r\n    </ul>\r\n searchuery-forsearchuery-form>\r\n    <p><a [routerLink]=\"['/login']\">Logout</a></p>\r\n</div-->\r\n<!-- main app container -->\r\n<!--nav *ngIf=\"currentUser\" class=\"navbar navbar-inverse navbar-fixed-top\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\"\r\n                    aria-expanded=\"false\" aria-controls=\"navbar\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" href=\"#\">OCD Tool</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li><a href=\"#\">Dashboard</a></li>\r\n                <li><a href=\"#\">Settings</a></li>\r\n                <li><a href=\"#\">{{currentUser.firstName}}</a></li>\r\n                <li><a [routerLink]=\"['/login']\">Logout</a></li>\r\n            </ul>\r\n            <form class=\"navbar-form navbar-right\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">\r\n            </form>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n<div *ngIf=\"currentUser\" class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-3 col-md-2 sidebar\">\r\n            <ul class=\"nav nav-sidebar\">\r\n                <li class=\"active\"><a href=\"#\">Search <span class=\"sr-only\">(current)</span></a></li>\r\n            </ul>\r\n            <ul class=\"nav nav-sidebar\">\r\n                <li><a href=\"#\">Favourite</a></li>\r\n            </ul>\r\n            <ul class=\"nav nav-sidebar\">\r\n                <li><a href=\"#\">Recent Item</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n<alert></alert>\r\n<router-outlet></router-outlet-->"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\r\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle no-border\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n    <img src='/assets/images/user-icon.png'><span class=\"spacer\"></span> {{ getLoggedUser() }} <span class=\"big-spacer\"></span><span class=\"fa fa-chevron-down\"></span>\r\n  </button>\r\n  <ul class=\"dropdown-menu\">\r\n    <li><a href=\"#\">Profile</a></li>\r\n    <li role=\"separator\" class=\"divider\"></li>\r\n    <li><a href='#' (click)='logout($event)' i18n>Logout</a></li>\r\n    <li><a [routerLink]=\"['/login']\">Logout</a></li>\r\n  </ul>\r\n</div>\r\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\">\r\n    <h2>Login</h2>\r\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n            <label for=\"username\">Username</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n            <label for=\"password\">Password</label>\r\n            <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\r\n            <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n            <a [routerLink]=\"['/register']\" class=\"btn btn-link\">Register</a>\r\n        </div>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<!--nav *ngIf=\"checkPage()\" class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\" style=\"margin-bottom: 0\">\r\n\t<div class=\"navbar-header\">\r\n\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n\t\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t</button>\r\n\t\t\t<a class=\"navbar-brand nav-brand-pers\" routerLink=\"/dashboard\">\r\n\t\t\t\t\t\t\t\t\t\t<b><span class=\"cou-txt\"><img src='assets/images/beer.png'> </span><span class=\"spacer\"></span><span class=\"cou-txt\">OCD</span></b></a>\r\n\t\t\t</div>\r\n\t\t\t<ul class=\"nav navbar-top-links navbar-right\">\r\n\t\t\t\t\t<div *ngIf=\"isLoggedIn() || getLoggedUser()\">\r\n\t\t\t\t\t\t\t\t<div class=\"logout-info showhide\">\r\n\t\t\t\t\t\t\t\t\t<app-loggedin></app-loggedin>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t</ul>\r\n\t\r\n\t<div class=\"navbar-default sidebar\" role=\"navigation\">\r\n\t\t\t<div class=\"sidebar-nav navbar-collapse collapse\" id=\"left-placeholder\">\r\n\t\t\t\t\t\t<div *ngIf=\"isLoggedIn() || getLoggedUser()\">\r\n\t\t\t\t\t\t\t\t<left-placeholder></left-placeholder>\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t</div>\r\n</nav-->\r\n<nav *ngIf=\"isLoggedIn()\" class=\"navbar navbar-inverse navbar-fixed-top\">\r\n\t<div class=\"container-fluid\">\r\n\t\t<div class=\"navbar-header\">\r\n\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n\t\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t</button>\r\n\t\t\t<a class=\"navbar-brand\" href=\"#\">OCD</a>\r\n\t\t</div>\r\n\t\t<div class=\"nav navbar-nav\">\r\n\t\t<ol class=\"breadcrumb\">\r\n\t\t\t<li><a href=\"#\">Home</a></li>\r\n\t\t\t<li><a href=\"#\">Library</a></li>\r\n\t\t\t<li class=\"active\">Data</li>\r\n\t\t</ol>\r\n\t\t</div>\r\n\t\t<div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n\t\t\t<ul class=\"nav navbar-nav navbar-right\">\r\n\t\t\t\t<li class=\"dropdown\">\r\n\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"glyphicon glyphicon-user\"></span><span class=\"spacer\"></span>{{getLoggedUser()}} <span class=\"caret\"></span></a>\r\n\t\t\t\t\t<ul class=\"dropdown-menu\">\r\n\t\t\t\t\t\t<li><a href=\"#\">Profile</a></li>\r\n\t\t\t\t\t\t<li><a href=\"#\">Settings</a></li>\r\n\t\t\t\t\t\t<li role=\"separator\" class=\"divider\"></li>\r\n\t\t\t\t\t\t<li><a [routerLink]=\"['/login']\"><span class=\"glyphicon glyphicon-log-out\"></span>Logout</a></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n</nav>\r\n<left-placeholder></left-placeholder>"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\">\r\n    <h2>Register</h2>\r\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n            <label for=\"firstName\">First Name</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"firstName\" [(ngModel)]=\"model.firstName\" #firstName=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !firstName.valid\" class=\"help-block\">First Name is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n            <label for=\"lastName\">Last Name</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"lastName\" [(ngModel)]=\"model.lastName\" #lastName=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !lastName.valid\" class=\"help-block\">Last Name is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n            <label for=\"username\">Username</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n            <label for=\"password\">Password</label>\r\n            <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n            <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\r\n            <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n            <a [routerLink]=\"['/login']\" class=\"btn btn-link\">Cancel</a>\r\n        </div>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\">\r\n    <h1 class=\"page-header\">Search Multimedia Content</h1>\r\n    <form (ngSubmit)=\"onSubmit()\" #qForm=\"ngForm\">\r\n        {{diagnostic}}\r\n        <div class=\"form-group\">\r\n            <label for=\"keywords\">Keywords</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"keywords\" [(ngModel)]=\"searchForm.keyWords\" name=\"keyWords\" #spy>\r\n            <br>TODO: remove this: {{spy.className}}\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"freeText\">Free Text</label>\r\n            <textarea class=\"form-control\" rows=\"5\" id=\"freeText\" [(ngModel)]=\"searchForm.freeText\"\r\n                      name=\"freeText\"></textarea>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"semanticSearch\">Semantic Search</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"semanticSearch\" [(ngModel)]=\"searchForm.semanticSearch\"\r\n                   name=\"semanticSearch\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"type\">Type</label>\r\n            <select class=\"form-control\" id=\"type\" [(ngModel)]=\"searchForm.type\" name=\"type\">\r\n                <option *ngFor=\"let t of types\" [value]=\"t\">{{t}}</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"InDate\">Initial Date</label>\r\n            <input class=\"form-control\" type=\"date\" id=\"InDate\" [(ngModel)]=\"searchForm.inDate\"\r\n                   name=\"inDate\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"EndDate\">End Date</label>\r\n            <input class=\"form-control\" type=\"date\" id=\"EndDate\" [(ngModel)]=\"searchForm.endDate\"\r\n                   name=\"endDate\">\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!qForm.form.valid\">Search</button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-12 col-sm-offset-5 col-md-12 col-md-offset-2 main\">\r\n    <h2 class=\"page-header\">Search Results</h2>\r\n    <!--div  class=\"gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter hdpe\">\r\n        <img src=\"http://fakeimg.pl/365x365/\" class=\"img-responsive\">\r\n    </div-->\r\n    <ul class=\"nav nav-tabs\">\r\n    <li class=\"active\"><a data-toggle=\"tab\" href=\"#video\">VIDEO</a></li>\r\n    <li><a data-toggle=\"tab\" href=\"#audio\">AUDIO</a></li>\r\n    <li><a data-toggle=\"tab\" href=\"#image\">IMAGE</a></li>\r\n    <li><a data-toggle=\"tab\" href=\"#text\">TEXT</a></li>\r\n  </ul>\r\n\r\n  <div class=\"tab-content\">\r\n    <div id=\"video\" class=\"tab-pane fade in active\">\r\n      <h3>VIDEO</h3>\r\n      <div *ngFor=\"let sr of searchResult\" class=\"media\">\r\n    <div class=\"media-left media-top\">\r\n      <img src=\"{{sr.thumbnail}}\" class=\"media-object\">\r\n    </div>\r\n    <div class=\"media-body\">\r\n      <span class=\"label label-default\">Title</span><h4 class=\"media-heading\">{{sr.name}}</h4>\r\n      <span class=\"label label-default\">Description</span><h5>{{sr.description}}</h5>\r\n      <span class=\"label label-default\">Type</span><h5>{{sr.genre}}</h5>\r\n      <span class=\"label label-default\">Source</span><h5>{{sr.source}}</h5>\r\n      <span class=\"label label-default\">Date</span><h5>{{sr.date}}</h5>\r\n    </div>\r\n  </div>\r\n    </div>\r\n    <div id=\"audio\" class=\"tab-pane fade\">\r\n      <h3>AUDIO</h3>\r\n      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\r\n    </div>\r\n    <div id=\"image\" class=\"tab-pane fade\">\r\n      <h3>IMAGE</h3>\r\n      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>\r\n    </div>\r\n    <div id=\"text\" class=\"tab-pane fade\">\r\n      <h3>TEXT</h3>\r\n      <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\r\n    </div>\r\n  </div>\r\n    <!--div *ngFor=\"let sr of searchResult\" class=\"media\">\r\n    <div class=\"media-left media-top\">\r\n      <img src=\"img_avatar1.png\" class=\"media-object\" style=\"width:80px\">\r\n    </div>\r\n    <div class=\"media-body\">\r\n      <span class=\"label label-default\">Title</span><h4 class=\"media-heading\">{{sr.name}}</h4>\r\n      <span class=\"label label-default\">Description</span><h5>{{sr.name}}</h5>\r\n      <span class=\"label label-default\">Type</span><h5>{{sr.genre}}</h5>\r\n      <span class=\"label label-default\">Source</span><h5>{{sr.source}}</h5>\r\n    </div>\r\n  </div-->\r\n    <!--ol>\r\n    <li *ngFor=\"let sr of searchResult\">\r\n        <ul>\r\n            <li>{{sr.genre}}</li>\r\n            <li>{{sr.name}}</li>\r\n            <li>{{sr.source}}</li>\r\n            <li>{{sr.uri}}</li>\r\n        </ul>\r\n    </li>\r\n</ol-->\r\n</div>\r\n"

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "    <div *ngIf=\"isLoggedIn()\" class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-3 col-md-2 sidebar\">\r\n                <ul class=\"nav nav-sidebar\">\r\n                    <li class=\"active\"><a href=\"#\">Overview <span class=\"sr-only\">(current)</span></a></li>\r\n                    <li><a href=\"#\">Reports</a></li>\r\n                    <li><a href=\"#\">Analytics</a></li>\r\n                    <li><a href=\"#\">Export</a></li>\r\n                </ul>\r\n                <ul class=\"nav nav-sidebar\">\r\n                    <li><a href=\"\">Nav item</a></li>\r\n                    <li><a href=\"\">Nav item again</a></li>\r\n                    <li><a href=\"\">One more nav</a></li>\r\n                    <li><a href=\"\">Another nav item</a></li>\r\n                    <li><a href=\"\">More navigation</a></li>\r\n                </ul>\r\n                <ul class=\"nav nav-sidebar\">\r\n                    <li><a href=\"\">Nav item again</a></li>\r\n                    <li><a href=\"\">One more nav</a></li>\r\n                    <li><a href=\"\">Another nav item</a></li>\r\n                </ul>\r\n            </div>\r\n            \r\n        </div>\r\n    </div>"

/***/ }),

/***/ 721:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(395);


/***/ })

},[721]);
//# sourceMappingURL=main.bundle.js.map