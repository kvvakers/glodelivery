// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/food-band/preview.jpg":[function(require,module,exports) {
module.exports = "/preview.6e7955e5.jpg";
},{}],"img/pizza-plus/pizza-vesuvius.jpg":[function(require,module,exports) {
module.exports = "/pizza-vesuvius.7c9edadc.jpg";
},{}],"js/main.js":[function(require,module,exports) {
'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var user = {};
user.login = localStorage.getItem('gloDelivery');
var cartButton = document.querySelector("#cart-button");
var modal = document.querySelector(".modal");
var close = document.querySelector(".close");
var buttonAuth = document.querySelector('.button-auth');
var modalAuth = document.querySelector('.modal-auth');
var closeAuthButton = document.querySelector('.close-auth');
var logInForm = document.querySelector('#logInForm');
var loginInput = document.querySelector('#login');
var passInput = document.querySelector('#password');
var userName = document.querySelector('.user-name');
var btnOut = document.querySelector('.button-out');
var body = document.querySelector('body');
var cardsRestaurants = document.querySelector('.cards-restaurants');
var containerPromo = document.querySelector('.container-promo');
var restaurantsBox = document.querySelector('.restaurants');
var menuBox = document.querySelector('.menu');
var logo = document.querySelector('.logo');
var cardsMenu = document.querySelector('.cards-menu');

var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = fetch(url);
            console.log(response);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();

getData('./db/partners.json');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
  loginInput.style.borderColor = '';
  bodyScrollNone();
}

function bodyScrollNone() {
  body.style.overflow = 'hidden';
  body.style.paddingRight = '16px';
}

function bodyScrollShow() {
  body.style.overflow = '';
  body.style.paddingRight = '';
}

function auth() {
  function logOut() {
    user = {};
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = userName.style.display = btnOut.style.display = userName.textContent = '';
    btnOut.removeEventListener('click', logOut);
    checkAuth();
  }

  bodyScrollShow();
  buttonAuth.style.display = 'none';
  userName.style.display = 'block';
  btnOut.style.display = 'block';
  userName.textContent = user.login;
  btnOut.addEventListener('click', logOut);
}

function notAuth() {
  function logIn(e) {
    e.preventDefault();

    if (loginInput.value) {
      user.login = loginInput.value;
      user.pass = passInput.value;
      loginInput.value = passInput.value = '';
      localStorage.setItem('gloDelivery', user.login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuthButton.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      checkAuth();
    } else {
      loginInput.style.borderColor = 'red';
      alert('Поле логина не должно быть пустым!');
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuthButton.addEventListener('click', function () {
    toggleModalAuth();
    bodyScrollShow();
  });
  logInForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function (e) {
    if (e.target.classList.contains('is-open')) {
      toggleModalAuth();
      bodyScrollShow();
    }
  });
}

function checkAuth() {
  if (user.login) {
    auth();
  } else {
    notAuth();
  }
}

checkAuth();

function createCardRestaurant() {
  var card = "\n        <a href=\"#\" class=\"card card-restaurant\">\n            <img src=\"".concat(require('/img/food-band/preview.jpg'), "\" alt=\"image\" class=\"card-image\"/>\n            <div class=\"card-text\">\n                <div class=\"card-heading\">\n                    <h3 class=\"card-title\">FoodBand</h3>\n                    <span class=\"card-tag tag\">40 \u043C\u0438\u043D</span>\n                </div>\n                  <div class=\"card-info\">\n                    <div class=\"rating\">\n                        4.5\n                    </div>\n                    <div class=\"price\">\u041E\u0442 450 \u20BD</div>\n                    <div class=\"category\">\u041F\u0438\u0446\u0446\u0430</div>\n                </div>\n            </div>\n        </a>\n  ");
  cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

createCardRestaurant();
createCardRestaurant();

function createCardGood() {
  var card = document.createElement('div');
  card.classList.add('card');
  card.insertAdjacentHTML('beforeend', "\n        <img src=\"".concat(require('/img/pizza-plus/pizza-vesuvius.jpg'), "\" alt=\"image\" class=\"card-image\"/>\n        <div class=\"card-text\">\n            <div class=\"card-heading\">\n                <h3 class=\"card-title card-title-reg\">\u041F\u0438\u0446\u0446\u0430 \u0412\u0435\u0437\u0443\u0432\u0438\u0439</h3>\n            </div>\n            <div class=\"card-info\">\n                <div class=\"ingredients\">\u0421\u043E\u0443\u0441 \u0442\u043E\u043C\u0430\u0442\u043D\u044B\u0439, \u0441\u044B\u0440 \xAB\u041C\u043E\u0446\u0430\u0440\u0435\u043B\u043B\u0430\xBB, \u0432\u0435\u0442\u0447\u0438\u043D\u0430, \u043F\u0435\u043F\u043F\u0435\u0440\u043E\u043D\u0438, \u043F\u0435\u0440\u0435\u0446\n                \xAB\u0425\u0430\u043B\u0430\u043F\u0435\u043D\u044C\u0435\xBB, \u0441\u043E\u0443\u0441 \xAB\u0422\u043E\u0431\u0430\u0441\u043A\u043E\xBB, \u0442\u043E\u043C\u0430\u0442\u044B.\n                </div>\n            </div>\n            <div class=\"card-buttons\">\n                <button class=\"button button-primary button-add-cart\">\n                    <span class=\"button-card-text\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n                    <span class=\"button-cart-svg\"></span>\n                </button>\n                <strong class=\"card-price-bold\">545 \u20BD</strong>\n            </div>\n        </div>\n    "));
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(e) {
  e.preventDefault();
  var target = e.target;
  var restaurant = target.closest('.card-restaurant');

  if (user.login) {
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurantsBox.classList.add('hide');
      menuBox.classList.remove('hide');
      createCardGood();
    }
  } else {
    toggleModalAuth();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function () {
  containerPromo.classList.remove('hide');
  restaurantsBox.classList.remove('hide');
  menuBox.classList.add('hide');
});
new Swiper('.swiper-container', {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'cube'
});
},{"/img/food-band/preview.jpg":"img/food-band/preview.jpg","/img/pizza-plus/pizza-vesuvius.jpg":"img/pizza-plus/pizza-vesuvius.jpg"}],"C:/Users/mucha/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50514" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/mucha/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map