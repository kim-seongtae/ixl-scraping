"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var fs = require("fs");
var Scrap = /** @class */ (function () {
    function Scrap(url) {
        var _this = this;
        this.url = url;
        this.openBrowser = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, puppeteer.launch({
                                headless: false,
                                devtools: true,
                                defaultViewport: null
                            })];
                    case 1:
                        _a.browser = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.scrap = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, fileTitle, path;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 1:
                        _a.page = _b.sent();
                        return [4 /*yield*/, this.page.setRequestInterception(true)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.page.on('request', function (interceptedRequest) {
                                var requestUrl = interceptedRequest.url();
                                if (requestUrl.includes('site-nav-css-min.css')) {
                                    interceptedRequest.abort();
                                }
                                else {
                                    interceptedRequest["continue"]();
                                }
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.page.setViewport({ width: 350, height: 500 })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.page.goto(this.url)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.page.evaluate("(async () => {\n\t\t\tconst observer = new MutationObserver(async (mutations, observer) => {\n\t\t\t\tdocument.querySelector('.ixl-modal-mask').remove();\n\t\t\t\tdocument.querySelector('.example-question-toggle').remove();\n\t\t\t\tArray.from(document.querySelectorAll('div')).filter(el => el.id.includes('practice-audio-button-js')).map(el => el.remove());\n\t\t\t\tArray.from(document.querySelectorAll('div')).filter(el => el.className.includes('yui3-widget-ft')).map(el => el.remove());\n\t\t\t\t\n\t\t\t\tif (document.querySelector('.yui3-questionwidget')) {\n\t\t\t\t\tif (document.querySelectorAll('.yui3-questionwidget .secContentPiece').length === 3){\n\t\t\t\t\t\tconst title = document.querySelector('.yui3-questionwidget .secContentPiece').innerText.toLowerCase().replace(/\\s+/g, '_').replace(/\\?/g,'');\n\t\t\t\t\t\tconst fileTitle = document.querySelectorAll('.secContentPiece')[2].innerText.toLowerCase().replace(/(\\r\\n|\\n|\\r)/gm, '_').replace(/\\s+/g, '_');\n\t\t\t\t\t\t\n\t\t\t\t\t\tsessionStorage.setItem('title', title);\n\t\t\t\t\t\tsessionStorage.setItem('fileTitle', fileTitle);\n\t\t\t\t\t\t\n\t\t\t\t\t\tdocument.querySelector('.yui3-questionwidget .secContentPiece').remove();\n\t\t\t\t\t\tconst element = document.querySelector('#practice');\n\t\t\t\t\t\tdocument.body.innerHTML = '';\n\t\t\t\t\t\tdocument.body.appendChild(element);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t\tconst targetNode = document.querySelector('#practice');\n\t\t\tobserver.observe(targetNode, { attributes: true, childList: true, subtree: true });\n\t\t})()")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, sleep(2000)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.page.evaluate(function () { return sessionStorage.getItem('fileTitle'); })];
                    case 8:
                        fileTitle = _b.sent();
                        return [4 /*yield*/, this.getPath()];
                    case 9:
                        path = _b.sent();
                        if (!fs.existsSync("." + path)) {
                            fs.mkdirSync("." + path, { recursive: true });
                        }
                        return [4 /*yield*/, this.page.screenshot({
                                path: "./" + path + "/" + fileTitle + ".png"
                            })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, this.page.close()];
                    case 11:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    Scrap.prototype.getPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return window.location.pathname; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Scrap;
}());
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var urls, _i, urls_1, url, scrap, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urls = [
                        'https://www.ixl.com/ela/grade-2/choose-the-r-control-word-that-matches-the-picture',
                        'https://www.ixl.com/ela/grade-1/choose-the-short-a-word-that-matches-the-picture',
                        'https://www.ixl.com/ela/grade-1/choose-the-short-a-sentence-that-matches-the-picture',
                    ];
                    _i = 0, urls_1 = urls;
                    _a.label = 1;
                case 1:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 7];
                    url = urls_1[_i];
                    scrap = new Scrap(url);
                    return [4 /*yield*/, scrap.openBrowser()];
                case 2:
                    _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < 20)) return [3 /*break*/, 6];
                    return [4 /*yield*/, scrap.scrap()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
})();
function sleep(timeout) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, timeout);
                })];
        });
    });
}
