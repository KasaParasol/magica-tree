(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MagicaTree"] = factory();
	else
		root["MagicaTree"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/magic-touch/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/magic-touch/src/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "enchantment": () => (/* binding */ enchantment)
/* harmony export */ });
const DEFAULT_OPTIONS = {
    holdThreshold: 750,
    acceptableDistThreshold: 1.5,
    flickThreshold: 1.5,
};

Object.freeze(DEFAULT_OPTIONS);

let opts = {...DEFAULT_OPTIONS};
let pointertart;
let holdedFlag = false;
let latestPoint = [];
let latestStartElem;
let calcDepthTargets = [];

/**
 * @param { HTMLElement } target
 */
function enchantment (target, _opts) {
    opts = Object.assign(DEFAULT_OPTIONS, _opts);

    /**
     *
     * @param {MouseEvent | TouchEvent} evt
     */
    const eventHandler = evt => {
        if (evt.target !== evt.currentTarget) return;

        switch (evt.type) {
            case 'touchstart': {
                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;

                    latestStartElem = target;
                    latestPoint = [];
                    if (!pointertart) {
                        pointertart = {
                            touches: evt.touches,
                            _poi: {x: evt.touches[0].pageX, y: evt.touches[0].pageY},
                            handler: setTimeout(() => {
                                target.dispatchEvent(new CustomEvent('hold', {
                                    bubbles: true,
                                    cancelable: true,
                                    detail: {point: pointertart._poi, rawEv: evt},
                                }));
                                pointertart.handler = undefined;
                                holdedFlag = true;
                            }, opts.holdThreshold),
                        };
                    }
                    else if (pointertart.handler) {
                        clearTimeout(pointertart.handler);
                        pointertart.handler = undefined;
                    }
                }, 1);
                break;
            }

            case 'mousedown': {
                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;
                    latestStartElem = target;
                    latestPoint = [];
                    if (!pointertart) {
                        pointertart = {
                            button: evt.button,
                            buttons: evt.buttons,
                            _poi: {x: evt.pageX, y: evt.pageY},
                            handler: setTimeout(() => {
                                target.dispatchEvent(new CustomEvent('hold', {
                                    bubbles: true,
                                    cancelable: true,
                                    detail: {point: pointertart._poi, rawEv: evt},
                                }));
                                holdedFlag = true;
                                pointertart.handler = undefined;
                            }, opts.holdThreshold),
                        };
                    }
                    else if (pointertart.handler) {
                        clearTimeout(pointertart.handler);
                        pointertart.handler = undefined;
                    }
                }, 1);
                break;
            }

            case 'touchmove': {
                if (evt.touches[0].screenY !== 0 && holdedFlag && latestStartElem && target !== latestStartElem) {
                    const {pageX: x, pageY: y} = evt.touches[0];
                    target.dispatchEvent(new CustomEvent('holdover', {
                        bubbles: true,
                        cancelable: true,
                        detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                    }));
                }
                break;
            }

            case 'mousemove': {
                if (evt.screenY !== 0 && holdedFlag && latestStartElem && target !== latestStartElem) {
                    if (evt.button === pointertart.button
                    && evt.buttons === pointertart.buttons) {
                        const {pageX: x, pageY: y} = evt;
                        target.dispatchEvent(new CustomEvent('holdover', {
                            bubbles: true,
                            cancelable: true,
                            detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                        }));
                    }
                }

                break;
            }

            case 'touchend': {
                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;

                    if (holdedFlag && latestStartElem && target !== latestStartElem) {
                        const {pageX: x, pageY: y} = evt.touches[0];
                        target.dispatchEvent(new CustomEvent('holddrop', {
                            bubbles: true,
                            cancelable: true,
                            detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                        }));
                    }

                    latestPoint = [];
                    pointertart = undefined;
                    holdedFlag = false;
                }, 1);
                break;
            }

            case 'mouseup': {
                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;

                    if (holdedFlag && latestStartElem && target !== latestStartElem) {
                        const {pageX: x, pageY: y} = evt;
                        target.dispatchEvent(new CustomEvent('holddrop', {
                            bubbles: true,
                            cancelable: true,
                            detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                        }));
                    }

                    latestPoint = [];
                    pointertart = undefined;
                    holdedFlag = false;
                }, 1);
                break;
            }
        }
    };

    target.addEventListener('touchstart', eventHandler);
    target.addEventListener('mousedown', eventHandler);
    target.addEventListener('touchmove', eventHandler);
    target.addEventListener('touchend', eventHandler);
    target.addEventListener('mousemove', eventHandler);
    target.addEventListener('mouseup', eventHandler);
}

function windowEventHander (evt) {
    if (evt.target !== evt.currentTarget || !latestStartElem) return;

    switch (evt.type) {
        case 'touchmove': {
            if (evt.touches[0].screenY === 0) break;

            if (pointertart) {
                const {x: x1, y: y1} = pointertart._poi;
                const {pageX: x2, pageY: y2} = evt.touches[0];
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);

                if (latestPoint.length > 0) {
                    latestPoint = [latestPoint.pop()];
                }

                const {pageX: x, pageY: y} = evt.touches[0];
                const obj = {x, y};
                latestPoint.push(obj);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    if (latestPoint[latestPoint.length - 1] === obj)
                        latestPoint = [];
                }));

                if (dist > opts.acceptableDistThreshold) {
                    clearTimeout(pointertart.handler);
                    pointertart.handler = undefined;
                }
            }

            if (holdedFlag) {
                const {pageX: x, pageY: y} = evt.touches[0];
                latestStartElem.dispatchEvent(new CustomEvent('holdmove', {
                    bubbles: true,
                    cancelable: true,
                    detail: {point: {x, y}, rawEv: evt},
                }));
            }

            break;
        }

        case 'mousemove': {
            if (evt.screenY === 0) break;

            if (pointertart) {
                const {x: x1, y: y1} = pointertart._poi;
                const {pageX: x2, pageY: y2} = evt;
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);
                if (evt.button === pointertart.button
                && evt.buttons === pointertart.buttons) {
                    if (latestPoint.length > 0) {
                        latestPoint = [latestPoint.pop()];
                    }

                    const {pageX: x, pageY: y} = evt;
                    const obj = {x, y};
                    latestPoint.push(obj);
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        if (latestPoint[latestPoint.length - 1] === obj)
                            latestPoint = [];
                    }));
                }

                if (dist > opts.acceptableDistThreshold
                || evt.button !== pointertart.button
                || evt.buttons !== pointertart.buttons) {
                    clearTimeout(pointertart.handler);
                    pointertart.handler = undefined;
                }
            }

            if (holdedFlag) {
                const {pageX: x, pageY: y} = evt;
                latestStartElem.dispatchEvent(new CustomEvent('holdmove', {
                    bubbles: true,
                    cancelable: true,
                    detail: {point: {x, y}, rawEv: evt},
                }));
            }

            break;
        }

        case 'touchend': {
            if (pointertart?.handler) {
                clearTimeout(pointertart.handler);
                pointertart.handler = undefined;
            }

            if (holdedFlag) {
                latestStartElem.dispatchEvent(new CustomEvent('holdleave', {
                    bubbles: true,
                    cancelable: true,
                    detail: {point: latestPoint[latestPoint.length - 1], rawEv: evt},
                }));
            }

            if (latestPoint.length >= 2) {
                const {x: x1, y: y1} = latestPoint[latestPoint.length - 2];
                const {x: x2, y: y2} = latestPoint[latestPoint.length - 1];
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);
                if (dist > opts.flickThreshold && !holdedFlag) {
                    latestStartElem.dispatchEvent(new CustomEvent('flick', {
                        bubbles: true,
                        cancelable: true,
                        detail: {start: pointertart._poi, point: {x: x1, y: y1}, rawEv: evt, angle: Math.atan2(y2 - y1, x2 - x1), speed: dist},
                    }));
                }
            }

            holdedFlag = false;
            latestPoint = [];
            pointertart = undefined;
            break;
        }

        case 'mouseup': {
            if (pointertart?.handler) {
                clearTimeout(pointertart.handler);
                pointertart.handler = undefined;
            }

            if (holdedFlag) {
                latestStartElem.dispatchEvent(new CustomEvent('holdleave', {
                    bubbles: true,
                    cancelable: true,
                    detail: {point: latestPoint[latestPoint.length - 1], rawEv: evt},
                }));
            }

            if (latestPoint.length >= 2 && !holdedFlag) {
                const {x: x1, y: y1} = latestPoint[latestPoint.length - 2];
                const {x: x2, y: y2} = latestPoint[latestPoint.length - 1];
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);
                if (dist > opts.flickThreshold) {
                    latestStartElem.dispatchEvent(new CustomEvent('flick', {
                        bubbles: true,
                        cancelable: true,
                        detail: {start: pointertart._poi, point: {x: x1, y: y1}, rawEv: evt, angle: Math.atan2(y2 - y1, x2 - x1), speed: dist},
                    }));
                }
            }

            latestPoint = [];
            pointertart = undefined;
            holdedFlag = false;
            break;
        }
    }
}

const calcdepth = (e) => {
    let current = e;
    let depth = 0;
    while (current.parentElement) {
        current = current.parentElement;
        depth++;
    }
    return depth;
}

window.addEventListener('touchmove', windowEventHander);
window.addEventListener('touchend', windowEventHander);
window.addEventListener('mousemove', windowEventHander);
window.addEventListener('mouseup', windowEventHander);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({enchantment});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MagicaTree": () => (/* binding */ MagicaTree),
/* harmony export */   "TreeItem": () => (/* binding */ TreeItem),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var magic_touch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! magic-touch */ "./node_modules/magic-touch/src/index.js");


const genTreeItems = [];
let droptargets = [];

class MagicaTree extends EventTarget
{
    static window;
    static document;
    static CustomEvent;

    constructor (element, converter, data) {
        super();

        this.element = element;
        this.element.classList.add('magica-tree-wrapper');

        this.inner = MagicaTree.document.createElement('ul');
        this.inner.classList.add('magica-tree-list', 'root');
        this.element.append(this.inner);

        this.converter = converter;
        this.children = [];

        if (data) {
            this.buildTree(data);
        }
        this.data = data;
    }

    buildTree (data) {
        this.inner.innerHTML = '';
        this.children = [];
        this.converter(data, this);
        const f = (i) => {
            for (const child of i.children) {
                f(child);
            }
            i.addEventListener('drop', evt => {
                this.dispatchEvent(new MagicaTree.CustomEvent('drop', {detail: evt.detail}));
            });
            i.addEventListener('over', evt => {
                this.dispatchEvent(new MagicaTree.CustomEvent('over', {detail: evt.detail}));
            });
            i.addEventListener('hold', evt => {
                this.dispatchEvent(new MagicaTree.CustomEvent('hold', {detail: evt.detail}));
            });
        };
        for (const child of this.children) {
            f(child);
        }
    }

    append (item) {
        this.children.push(item);
        this.inner.append(item.element);
    }
}

class TreeItem extends EventTarget
{
    static TREE_ITEM_DEFAULT_OPTIONS = {
        directory: true,
    };

    constructor (inner, opts = {}, parent, data) {
        super();

        this.opts = Object.assign({}, TreeItem.TREE_ITEM_DEFAULT_OPTIONS, opts);
        this.data = data;

        this.element = MagicaTree.document.createElement('li');
        (0,magic_touch__WEBPACK_IMPORTED_MODULE_0__.enchantment)(this.element);

        this.element.addEventListener('holddrop', evt => {
            evt.stopPropagation();
            const item = genTreeItems.find(e => e.element === evt.detail.item);
            if (item.contains(this)) return;
            this.dispatchEvent(new MagicaTree.CustomEvent('drop', {detail: {item, for: this}}));
        });

        this.element.addEventListener('holdover', evt => {
            if (evt.target === evt.currentTarget) {
                const item = genTreeItems.find(e => e.element === evt.detail.item);
                if (item.contains(this)) return;
                this.dispatchEvent(new MagicaTree.CustomEvent('over', {detail: {item, for: this}}));
            }
        });

        this.element.addEventListener('hold', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('hold', {detail: {...evt.detail, target: evt.target}}));
        });

        this.element.addEventListener('holdleave', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('leave', {detail: {item: this}}));
        });

        this.inner = typeof inner === 'object' && inner instanceof HTMLElement? inner: MagicaTree.document.createTextNode(inner);
        this.element.append(this.inner);
        this.children = [];
        this.parent = parent;

        if (this.opts.directory) {
            this.childrenList = MagicaTree.document.createElement('ul');
            this.childrenList.classList.add('magica-tree-list');
            this.element.append(this.childrenList);
        }

        parent.append(this);
        genTreeItems.push(this);
    }

    remove () {
        this.parent.removeChild(this);
    }

    removeChild (item) {
        this.children = this.children.filter(e => e !== item);
        item.element.remove();
    }

    append (item) {
        this.children.push(item);
        this.childrenList.append(item.element);
    }

    contains (item) {
        let current = item;
        while (current.parent) {
            current = current.parent;
            if (current === this) return true;
        }
        return false;
    }

    get root() {
        let current = this;
        while (current.parent) {
            current = current.parent;
        }
        return current;
    }

    get depth() {
        let current = this;
        let depth = 0;
        while (current.parent) {
            current = current.parent;
            depth++;
        }
        return depth;
    }
}

try {
    MagicaTree.window = window;
    MagicaTree.document = document;
    MagicaTree.CustomEvent = CustomEvent;
    MagicaTree.HTMLElement = HTMLElement;
    MagicaTree.Image = Image;
}
catch {
    MagicaTree.window = undefined;
    MagicaTree.document = undefined;
    MagicaTree.CustomEvent = undefined;
    MagicaTree.HTMLElement = undefined;
    MagicaTree.Image = undefined;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({MagicaTree, TreeItem});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsaUJBQWlCO0FBQ2pHO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxTQUFTLG1DQUFtQztBQUMvRyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLFNBQVMsWUFBWTtBQUN6RixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxDQUFDLHFCQUFxQixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS8uL25vZGVfbW9kdWxlcy9tYWdpYy10b3VjaC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01hZ2ljYVRyZWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTWFnaWNhVHJlZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNYWdpY2FUcmVlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsImNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcclxuICAgIGhvbGRUaHJlc2hvbGQ6IDc1MCxcclxuICAgIGFjY2VwdGFibGVEaXN0VGhyZXNob2xkOiAxLjUsXHJcbiAgICBmbGlja1RocmVzaG9sZDogMS41LFxyXG59O1xyXG5cclxuT2JqZWN0LmZyZWV6ZShERUZBVUxUX09QVElPTlMpO1xyXG5cclxubGV0IG9wdHMgPSB7Li4uREVGQVVMVF9PUFRJT05TfTtcclxubGV0IHBvaW50ZXJ0YXJ0O1xyXG5sZXQgaG9sZGVkRmxhZyA9IGZhbHNlO1xyXG5sZXQgbGF0ZXN0UG9pbnQgPSBbXTtcclxubGV0IGxhdGVzdFN0YXJ0RWxlbTtcclxubGV0IGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IHRhcmdldFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVuY2hhbnRtZW50ICh0YXJnZXQsIF9vcHRzKSB7XHJcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbihERUZBVUxUX09QVElPTlMsIF9vcHRzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnQgfCBUb3VjaEV2ZW50fSBldnRcclxuICAgICAqL1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVyID0gZXZ0ID0+IHtcclxuICAgICAgICBpZiAoZXZ0LnRhcmdldCAhPT0gZXZ0LmN1cnJlbnRUYXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0Jzoge1xyXG4gICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gY2FsY0RlcHRoVGFyZ2V0cy5yZWR1Y2UoKGEsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhKSByZXR1cm4ge3Jlc3VsdDogY2FsY2RlcHRoKGUpLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aCA9IGNhbGNkZXB0aChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucmVzdWx0IDwgZGVwdGgpIHJldHVybiB7cmVzdWx0OiBkZXB0aCwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpLnJlZjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2dC50b3VjaGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BvaToge3g6IGV2dC50b3VjaGVzWzBdLnBhZ2VYLCB5OiBldnQudG91Y2hlc1swXS5wYWdlWX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBwb2ludGVydGFydC5fcG9pLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZWRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMuaG9sZFRocmVzaG9sZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXJ0YXJ0LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGNhbGNEZXB0aFRhcmdldHMucmVkdWNlKChhLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIHtyZXN1bHQ6IGNhbGNkZXB0aChlKSwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGggPSBjYWxjZGVwdGgoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnJlc3VsdCA8IGRlcHRoKSByZXR1cm4ge3Jlc3VsdDogZGVwdGgsIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkKS5yZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbjogZXZ0LmJ1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IGV2dC5idXR0b25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BvaToge3g6IGV2dC5wYWdlWCwgeTogZXZ0LnBhZ2VZfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZWRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cy5ob2xkVGhyZXNob2xkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocG9pbnRlcnRhcnQuaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzoge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50b3VjaGVzWzBdLnNjcmVlblkgIT09IDAgJiYgaG9sZGVkRmxhZyAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG92ZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6IHtcclxuICAgICAgICAgICAgICAgIGlmIChldnQuc2NyZWVuWSAhPT0gMCAmJiBob2xkZWRGbGFnICYmIGxhdGVzdFN0YXJ0RWxlbSAmJiB0YXJnZXQgIT09IGxhdGVzdFN0YXJ0RWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldnQuYnV0dG9uID09PSBwb2ludGVydGFydC5idXR0b25cclxuICAgICAgICAgICAgICAgICAgICAmJiBldnQuYnV0dG9ucyA9PT0gcG9pbnRlcnRhcnQuYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkb3ZlcicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgaXRlbTogbGF0ZXN0U3RhcnRFbGVtLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBjYWxjRGVwdGhUYXJnZXRzLnJlZHVjZSgoYSwgZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWEpIHJldHVybiB7cmVzdWx0OiBjYWxjZGVwdGgoZSksIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoID0gY2FsY2RlcHRoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5yZXN1bHQgPCBkZXB0aCkgcmV0dXJuIHtyZXN1bHQ6IGRlcHRoLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCkucmVmO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgIT09IHRhcmdldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9sZGVkRmxhZyAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkZHJvcCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgaXRlbTogbGF0ZXN0U3RhcnRFbGVtLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZWRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtb3VzZXVwJzoge1xyXG4gICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gY2FsY0RlcHRoVGFyZ2V0cy5yZWR1Y2UoKGEsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhKSByZXR1cm4ge3Jlc3VsdDogY2FsY2RlcHRoKGUpLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aCA9IGNhbGNkZXB0aChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucmVzdWx0IDwgZGVwdGgpIHJldHVybiB7cmVzdWx0OiBkZXB0aCwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpLnJlZjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcgJiYgbGF0ZXN0U3RhcnRFbGVtICYmIHRhcmdldCAhPT0gbGF0ZXN0U3RhcnRFbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50SGFuZGxlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpbmRvd0V2ZW50SGFuZGVyIChldnQpIHtcclxuICAgIGlmIChldnQudGFyZ2V0ICE9PSBldnQuY3VycmVudFRhcmdldCB8fCAhbGF0ZXN0U3RhcnRFbGVtKSByZXR1cm47XHJcblxyXG4gICAgc3dpdGNoIChldnQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3RvdWNobW92ZSc6IHtcclxuICAgICAgICAgICAgaWYgKGV2dC50b3VjaGVzWzBdLnNjcmVlblkgPT09IDApIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvaW50ZXJ0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDEsIHk6IHkxfSA9IHBvaW50ZXJ0YXJ0Ll9wb2k7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgyLCBwYWdlWTogeTJ9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGguYWJzKHgxIC0geDIpIF4gMiArIE1hdGguYWJzKHkxIC0geTIpIF4gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxhdGVzdFBvaW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtsYXRlc3RQb2ludC5wb3AoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHt4LCB5fTtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50LnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RQb2ludFtsYXRlc3RQb2ludC5sZW5ndGggLSAxXSA9PT0gb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5hY2NlcHRhYmxlRGlzdFRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6IHtcclxuICAgICAgICAgICAgaWYgKGV2dC5zY3JlZW5ZID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGlmIChwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBwb2ludGVydGFydC5fcG9pO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4MiwgcGFnZVk6IHkyfSA9IGV2dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChldnQuYnV0dG9uID09PSBwb2ludGVydGFydC5idXR0b25cclxuICAgICAgICAgICAgICAgICYmIGV2dC5idXR0b25zID09PSBwb2ludGVydGFydC5idXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhdGVzdFBvaW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbbGF0ZXN0UG9pbnQucG9wKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge3gsIHl9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50LnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhdGVzdFBvaW50W2xhdGVzdFBvaW50Lmxlbmd0aCAtIDFdID09PSBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IG9wdHMuYWNjZXB0YWJsZURpc3RUaHJlc2hvbGRcclxuICAgICAgICAgICAgICAgIHx8IGV2dC5idXR0b24gIT09IHBvaW50ZXJ0YXJ0LmJ1dHRvblxyXG4gICAgICAgICAgICAgICAgfHwgZXZ0LmJ1dHRvbnMgIT09IHBvaW50ZXJ0YXJ0LmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkbW92ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAndG91Y2hlbmQnOiB7XHJcbiAgICAgICAgICAgIGlmIChwb2ludGVydGFydD8uaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZGxlYXZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDogbGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMV0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGF0ZXN0UG9pbnQubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MSwgeTogeTF9ID0gbGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDIsIHk6IHkyfSA9IGxhdGVzdFBvaW50W2xhdGVzdFBvaW50Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLmFicyh4MSAtIHgyKSBeIDIgKyBNYXRoLmFicyh5MSAtIHkyKSBeIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBvcHRzLmZsaWNrVGhyZXNob2xkICYmICFob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdmbGljaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7c3RhcnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHBvaW50OiB7eDogeDEsIHk6IHkxfSwgcmF3RXY6IGV2dCwgYW5nbGU6IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSksIHNwZWVkOiBkaXN0fSxcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvbGRlZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbXTtcclxuICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAnbW91c2V1cCc6IHtcclxuICAgICAgICAgICAgaWYgKHBvaW50ZXJ0YXJ0Py5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBsYXRlc3RQb2ludFtsYXRlc3RQb2ludC5sZW5ndGggLSAxXSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXRlc3RQb2ludC5sZW5ndGggPj0gMiAmJiAhaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBsYXRlc3RQb2ludFtsYXRlc3RQb2ludC5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MiwgeTogeTJ9ID0gbGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGguYWJzKHgxIC0geDIpIF4gMiArIE1hdGguYWJzKHkxIC0geTIpIF4gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IG9wdHMuZmxpY2tUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2ZsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtzdGFydDogcG9pbnRlcnRhcnQuX3BvaSwgcG9pbnQ6IHt4OiB4MSwgeTogeTF9LCByYXdFdjogZXZ0LCBhbmdsZTogTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKSwgc3BlZWQ6IGRpc3R9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbXTtcclxuICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGhvbGRlZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjYWxjZGVwdGggPSAoZSkgPT4ge1xyXG4gICAgbGV0IGN1cnJlbnQgPSBlO1xyXG4gICAgbGV0IGRlcHRoID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGRlcHRoKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVwdGg7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHdpbmRvd0V2ZW50SGFuZGVyKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHdpbmRvd0V2ZW50SGFuZGVyKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7ZW5jaGFudG1lbnR9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGVuY2hhbnRtZW50IH0gZnJvbSBcIm1hZ2ljLXRvdWNoXCI7XHJcblxyXG5jb25zdCBnZW5UcmVlSXRlbXMgPSBbXTtcclxubGV0IGRyb3B0YXJnZXRzID0gW107XHJcblxyXG5leHBvcnQgY2xhc3MgTWFnaWNhVHJlZSBleHRlbmRzIEV2ZW50VGFyZ2V0XHJcbntcclxuICAgIHN0YXRpYyB3aW5kb3c7XHJcbiAgICBzdGF0aWMgZG9jdW1lbnQ7XHJcbiAgICBzdGF0aWMgQ3VzdG9tRXZlbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGVsZW1lbnQsIGNvbnZlcnRlciwgZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hZ2ljYS10cmVlLXdyYXBwZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbm5lciA9IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICB0aGlzLmlubmVyLmNsYXNzTGlzdC5hZGQoJ21hZ2ljYS10cmVlLWxpc3QnLCAncm9vdCcpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5pbm5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udmVydGVyID0gY29udmVydGVyO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFRyZWUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRUcmVlIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIoZGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgZiA9IChpKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZihjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnZHJvcCcsIHtkZXRhaWw6IGV2dC5kZXRhaWx9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpLmFkZEV2ZW50TGlzdGVuZXIoJ292ZXInLCBldnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdvdmVyJywge2RldGFpbDogZXZ0LmRldGFpbH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGkuYWRkRXZlbnRMaXN0ZW5lcignaG9sZCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7ZGV0YWlsOiBldnQuZGV0YWlsfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBmKGNoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kIChpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuaW5uZXIuYXBwZW5kKGl0ZW0uZWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlSXRlbSBleHRlbmRzIEV2ZW50VGFyZ2V0XHJcbntcclxuICAgIHN0YXRpYyBUUkVFX0lURU1fREVGQVVMVF9PUFRJT05TID0ge1xyXG4gICAgICAgIGRpcmVjdG9yeTogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGlubmVyLCBvcHRzID0ge30sIHBhcmVudCwgZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIFRyZWVJdGVtLlRSRUVfSVRFTV9ERUZBVUxUX09QVElPTlMsIG9wdHMpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBlbmNoYW50bWVudCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG9sZGRyb3AnLCBldnQgPT4ge1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBnZW5UcmVlSXRlbXMuZmluZChlID0+IGUuZWxlbWVudCA9PT0gZXZ0LmRldGFpbC5pdGVtKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uY29udGFpbnModGhpcykpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdkcm9wJywge2RldGFpbDoge2l0ZW0sIGZvcjogdGhpc319KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkb3ZlcicsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGFpbnModGhpcykpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnb3ZlcicsIHtkZXRhaWw6IHtpdGVtLCBmb3I6IHRoaXN9fSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRsZWF2ZScsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdsZWF2ZScsIHtkZXRhaWw6IHtpdGVtOiB0aGlzfX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbm5lciA9IHR5cGVvZiBpbm5lciA9PT0gJ29iamVjdCcgJiYgaW5uZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudD8gaW5uZXI6IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaW5uZXIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5pbm5lcik7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRzLmRpcmVjdG9yeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuTGlzdCA9IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbkxpc3QuY2xhc3NMaXN0LmFkZCgnbWFnaWNhLXRyZWUtbGlzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuY2hpbGRyZW5MaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcmVudC5hcHBlbmQodGhpcyk7XHJcbiAgICAgICAgZ2VuVHJlZUl0ZW1zLnB1c2godGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlICgpIHtcclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDaGlsZCAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmZpbHRlcihlID0+IGUgIT09IGl0ZW0pO1xyXG4gICAgICAgIGl0ZW0uZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmQgKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbkxpc3QuYXBwZW5kKGl0ZW0uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGFpbnMgKGl0ZW0pIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IGl0ZW07XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJvb3QoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZXB0aCgpIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRlcHRoID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICBkZXB0aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVwdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbnRyeSB7XHJcbiAgICBNYWdpY2FUcmVlLndpbmRvdyA9IHdpbmRvdztcclxuICAgIE1hZ2ljYVRyZWUuZG9jdW1lbnQgPSBkb2N1bWVudDtcclxuICAgIE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuICAgIE1hZ2ljYVRyZWUuSFRNTEVsZW1lbnQgPSBIVE1MRWxlbWVudDtcclxuICAgIE1hZ2ljYVRyZWUuSW1hZ2UgPSBJbWFnZTtcclxufVxyXG5jYXRjaCB7XHJcbiAgICBNYWdpY2FUcmVlLndpbmRvdyA9IHVuZGVmaW5lZDtcclxuICAgIE1hZ2ljYVRyZWUuZG9jdW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgTWFnaWNhVHJlZS5IVE1MRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgIE1hZ2ljYVRyZWUuSW1hZ2UgPSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtNYWdpY2FUcmVlLCBUcmVlSXRlbX07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==