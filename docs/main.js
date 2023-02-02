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
                const holdedFlagCache = holdedFlag;

                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;

                    if (holdedFlagCache && latestStartElem && target !== latestStartElem) {
                        const {pageX: x, pageY: y} = evt.touches[0];
                        target.dispatchEvent(new CustomEvent('holddrop', {
                            bubbles: true,
                            cancelable: true,
                            detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                        }));
                    }
                }, 1);
                break;
            }

            case 'mouseup': {
                const holdedFlagCache = holdedFlag;

                calcDepthTargets.push(target);
                setTimeout(() => {
                    const t = calcDepthTargets.reduce((a, e) => {
                        if (!a) return {result: calcdepth(e), ref: e};
                        const depth = calcdepth(e);
                        if (a.result < depth) return {result: depth, ref: e};
                    }, undefined).ref;
                    calcDepthTargets = [];

                    if (t !== target) return;

                    if (holdedFlagCache && latestStartElem && target !== latestStartElem) {
                        const {pageX: x, pageY: y} = evt;
                        target.dispatchEvent(new CustomEvent('holddrop', {
                            bubbles: true,
                            cancelable: true,
                            detail: {point: {x, y}, item: latestStartElem, rawEv: evt},
                        }));
                    }
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
    if (!latestStartElem) return;

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
            for (const iterator of ['drop', 'over', 'hold', 'holdleave', 'holdmove', 'click', 'contextmenu']) {
                i.addEventListener(iterator, evt => {
                    this.dispatchEvent(new MagicaTree.CustomEvent(evt.type, {detail: evt.detail}));
                });
            }
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
            const item = genTreeItems.find(e => e.element === evt.detail.item);
            this.dispatchEvent(new MagicaTree.CustomEvent('hold', {detail: {...evt.detail, item, target: evt.target}}));
        });

        this.element.addEventListener('holdmove', evt => {
            evt.stopPropagation();
            const item = genTreeItems.find(e => e.element === evt.detail.item);
            this.dispatchEvent(new MagicaTree.CustomEvent('holdmove', {detail: {...evt.detail, item, target: evt.target}}));
        });

        this.element.addEventListener('holdleave', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('holdleave', {detail: {item: this}}));
        });

        this.element.addEventListener('contextmenu', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new Event('contextmenu'));
        });

        this.element.addEventListener('click', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new Event('click'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsU0FBUyx5Q0FBeUM7QUFDekgsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxTQUFTLFlBQVk7QUFDN0YsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsQ0FBQyxxQkFBcUIsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL01hZ2ljYVRyZWUvLi9ub2RlX21vZHVsZXMvbWFnaWMtdG91Y2gvc3JjL2luZGV4LmpzIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1hZ2ljYVRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTWFnaWNhVHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICBob2xkVGhyZXNob2xkOiA3NTAsXHJcbiAgICBhY2NlcHRhYmxlRGlzdFRocmVzaG9sZDogMS41LFxyXG4gICAgZmxpY2tUaHJlc2hvbGQ6IDEuNSxcclxufTtcclxuXHJcbk9iamVjdC5mcmVlemUoREVGQVVMVF9PUFRJT05TKTtcclxuXHJcbmxldCBvcHRzID0gey4uLkRFRkFVTFRfT1BUSU9OU307XHJcbmxldCBwb2ludGVydGFydDtcclxubGV0IGhvbGRlZEZsYWcgPSBmYWxzZTtcclxubGV0IGxhdGVzdFBvaW50ID0gW107XHJcbmxldCBsYXRlc3RTdGFydEVsZW07XHJcbmxldCBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4vKipcclxuICogQHBhcmFtIHsgSFRNTEVsZW1lbnQgfSB0YXJnZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmNoYW50bWVudCAodGFyZ2V0LCBfb3B0cykge1xyXG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9PUFRJT05TLCBfb3B0cyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50IHwgVG91Y2hFdmVudH0gZXZ0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IGV2dCA9PiB7XHJcbiAgICAgICAgaWYgKGV2dC50YXJnZXQgIT09IGV2dC5jdXJyZW50VGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGNhbGNEZXB0aFRhcmdldHMucmVkdWNlKChhLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIHtyZXN1bHQ6IGNhbGNkZXB0aChlKSwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGggPSBjYWxjZGVwdGgoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnJlc3VsdCA8IGRlcHRoKSByZXR1cm4ge3Jlc3VsdDogZGVwdGgsIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkKS5yZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbSA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9pbnRlcnRhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldnQudG91Y2hlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wb2k6IHt4OiBldnQudG91Y2hlc1swXS5wYWdlWCwgeTogZXZ0LnRvdWNoZXNbMF0ucGFnZVl9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDogcG9pbnRlcnRhcnQuX3BvaSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVkRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzLmhvbGRUaHJlc2hvbGQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2ludGVydGFydC5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBjYWxjRGVwdGhUYXJnZXRzLnJlZHVjZSgoYSwgZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWEpIHJldHVybiB7cmVzdWx0OiBjYWxjZGVwdGgoZSksIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoID0gY2FsY2RlcHRoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5yZXN1bHQgPCBkZXB0aCkgcmV0dXJuIHtyZXN1bHQ6IGRlcHRoLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCkucmVmO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgIT09IHRhcmdldCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbSA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9pbnRlcnRhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IGV2dC5idXR0b24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBldnQuYnV0dG9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wb2k6IHt4OiBldnQucGFnZVgsIHk6IGV2dC5wYWdlWX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBwb2ludGVydGFydC5fcG9pLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVkRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMuaG9sZFRocmVzaG9sZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXJ0YXJ0LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNobW92ZSc6IHtcclxuICAgICAgICAgICAgICAgIGlmIChldnQudG91Y2hlc1swXS5zY3JlZW5ZICE9PSAwICYmIGhvbGRlZEZsYWcgJiYgbGF0ZXN0U3RhcnRFbGVtICYmIHRhcmdldCAhPT0gbGF0ZXN0U3RhcnRFbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRvdmVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtb3VzZW1vdmUnOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnNjcmVlblkgIT09IDAgJiYgaG9sZGVkRmxhZyAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiA9PT0gcG9pbnRlcnRhcnQuYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZXZ0LmJ1dHRvbnMgPT09IHBvaW50ZXJ0YXJ0LmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG92ZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaG9sZGVkRmxhZ0NhY2hlID0gaG9sZGVkRmxhZztcclxuXHJcbiAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBjYWxjRGVwdGhUYXJnZXRzLnJlZHVjZSgoYSwgZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWEpIHJldHVybiB7cmVzdWx0OiBjYWxjZGVwdGgoZSksIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoID0gY2FsY2RlcHRoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5yZXN1bHQgPCBkZXB0aCkgcmV0dXJuIHtyZXN1bHQ6IGRlcHRoLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCkucmVmO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgIT09IHRhcmdldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9sZGVkRmxhZ0NhY2hlICYmIGxhdGVzdFN0YXJ0RWxlbSAmJiB0YXJnZXQgIT09IGxhdGVzdFN0YXJ0RWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvbGRlZEZsYWdDYWNoZSA9IGhvbGRlZEZsYWc7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gY2FsY0RlcHRoVGFyZ2V0cy5yZWR1Y2UoKGEsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhKSByZXR1cm4ge3Jlc3VsdDogY2FsY2RlcHRoKGUpLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aCA9IGNhbGNkZXB0aChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucmVzdWx0IDwgZGVwdGgpIHJldHVybiB7cmVzdWx0OiBkZXB0aCwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpLnJlZjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWdDYWNoZSAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZGRyb3AnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBldmVudEhhbmRsZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW5kb3dFdmVudEhhbmRlciAoZXZ0KSB7XHJcbiAgICBpZiAoIWxhdGVzdFN0YXJ0RWxlbSkgcmV0dXJuO1xyXG5cclxuICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB7XHJcbiAgICAgICAgICAgIGlmIChldnQudG91Y2hlc1swXS5zY3JlZW5ZID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGlmIChwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBwb2ludGVydGFydC5fcG9pO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4MiwgcGFnZVk6IHkyfSA9IGV2dC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLmFicyh4MSAtIHgyKSBeIDIgKyBNYXRoLmFicyh5MSAtIHkyKSBeIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsYXRlc3RQb2ludC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbbGF0ZXN0UG9pbnQucG9wKCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7eCwgeX07XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RQb2ludC5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMV0gPT09IG9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IG9wdHMuYWNjZXB0YWJsZURpc3RUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRtb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdtb3VzZW1vdmUnOiB7XHJcbiAgICAgICAgICAgIGlmIChldnQuc2NyZWVuWSA9PT0gMCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MSwgeTogeTF9ID0gcG9pbnRlcnRhcnQuX3BvaTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeDIsIHBhZ2VZOiB5Mn0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGguYWJzKHgxIC0geDIpIF4gMiArIE1hdGguYWJzKHkxIC0geTIpIF4gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiA9PT0gcG9pbnRlcnRhcnQuYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAmJiBldnQuYnV0dG9ucyA9PT0gcG9pbnRlcnRhcnQuYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RQb2ludC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gW2xhdGVzdFBvaW50LnBvcCgpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHt4LCB5fTtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludC5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RQb2ludFtsYXRlc3RQb2ludC5sZW5ndGggLSAxXSA9PT0gb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBvcHRzLmFjY2VwdGFibGVEaXN0VGhyZXNob2xkXHJcbiAgICAgICAgICAgICAgICB8fCBldnQuYnV0dG9uICE9PSBwb2ludGVydGFydC5idXR0b25cclxuICAgICAgICAgICAgICAgIHx8IGV2dC5idXR0b25zICE9PSBwb2ludGVydGFydC5idXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dDtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ3RvdWNoZW5kJzoge1xyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQ/LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRsZWF2ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IGxhdGVzdFBvaW50W2xhdGVzdFBvaW50Lmxlbmd0aCAtIDFdLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxhdGVzdFBvaW50Lmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDEsIHk6IHkxfSA9IGxhdGVzdFBvaW50W2xhdGVzdFBvaW50Lmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgyLCB5OiB5Mn0gPSBsYXRlc3RQb2ludFtsYXRlc3RQb2ludC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5mbGlja1RocmVzaG9sZCAmJiAhaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZmxpY2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3N0YXJ0OiBwb2ludGVydGFydC5fcG9pLCBwb2ludDoge3g6IHgxLCB5OiB5MX0sIHJhd0V2OiBldnQsIGFuZ2xlOiBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpLCBzcGVlZDogZGlzdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBob2xkZWRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gW107XHJcbiAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ21vdXNldXAnOiB7XHJcbiAgICAgICAgICAgIGlmIChwb2ludGVydGFydD8uaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZGxlYXZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDogbGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMV0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGF0ZXN0UG9pbnQubGVuZ3RoID49IDIgJiYgIWhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MSwgeTogeTF9ID0gbGF0ZXN0UG9pbnRbbGF0ZXN0UG9pbnQubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDIsIHk6IHkyfSA9IGxhdGVzdFBvaW50W2xhdGVzdFBvaW50Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLmFicyh4MSAtIHgyKSBeIDIgKyBNYXRoLmFicyh5MSAtIHkyKSBeIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBvcHRzLmZsaWNrVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdmbGljaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7c3RhcnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHBvaW50OiB7eDogeDEsIHk6IHkxfSwgcmF3RXY6IGV2dCwgYW5nbGU6IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSksIHNwZWVkOiBkaXN0fSxcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gW107XHJcbiAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBob2xkZWRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2FsY2RlcHRoID0gKGUpID0+IHtcclxuICAgIGxldCBjdXJyZW50ID0gZTtcclxuICAgIGxldCBkZXB0aCA9IDA7XHJcbiAgICB3aGlsZSAoY3VycmVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBkZXB0aCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlcHRoO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgd2luZG93RXZlbnRIYW5kZXIpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgd2luZG93RXZlbnRIYW5kZXIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge2VuY2hhbnRtZW50fTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBlbmNoYW50bWVudCB9IGZyb20gXCJtYWdpYy10b3VjaFwiO1xyXG5cclxuY29uc3QgZ2VuVHJlZUl0ZW1zID0gW107XHJcbmxldCBkcm9wdGFyZ2V0cyA9IFtdO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hZ2ljYVRyZWUgZXh0ZW5kcyBFdmVudFRhcmdldFxyXG57XHJcbiAgICBzdGF0aWMgd2luZG93O1xyXG4gICAgc3RhdGljIGRvY3VtZW50O1xyXG4gICAgc3RhdGljIEN1c3RvbUV2ZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChlbGVtZW50LCBjb252ZXJ0ZXIsIGRhdGEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYWdpY2EtdHJlZS13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5uZXIgPSBNYWdpY2FUcmVlLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgdGhpcy5pbm5lci5jbGFzc0xpc3QuYWRkKCdtYWdpY2EtdHJlZS1saXN0JywgJ3Jvb3QnKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuaW5uZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnZlcnRlciA9IGNvbnZlcnRlcjtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcblxyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUcmVlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkVHJlZSAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuaW5uZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29udmVydGVyKGRhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGYgPSAoaSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGkuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGYoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgWydkcm9wJywgJ292ZXInLCAnaG9sZCcsICdob2xkbGVhdmUnLCAnaG9sZG1vdmUnLCAnY2xpY2snLCAnY29udGV4dG1lbnUnXSkge1xyXG4gICAgICAgICAgICAgICAgaS5hZGRFdmVudExpc3RlbmVyKGl0ZXJhdG9yLCBldnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudChldnQudHlwZSwge2RldGFpbDogZXZ0LmRldGFpbH0pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgZihjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZCAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmlubmVyLmFwcGVuZChpdGVtLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZUl0ZW0gZXh0ZW5kcyBFdmVudFRhcmdldFxyXG57XHJcbiAgICBzdGF0aWMgVFJFRV9JVEVNX0RFRkFVTFRfT1BUSU9OUyA9IHtcclxuICAgICAgICBkaXJlY3Rvcnk6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChpbm5lciwgb3B0cyA9IHt9LCBwYXJlbnQsIGRhdGEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBUcmVlSXRlbS5UUkVFX0lURU1fREVGQVVMVF9PUFRJT05TLCBvcHRzKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBNYWdpY2FUcmVlLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgZW5jaGFudG1lbnQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRkcm9wJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuVHJlZUl0ZW1zLmZpbmQoZSA9PiBlLmVsZW1lbnQgPT09IGV2dC5kZXRhaWwuaXRlbSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbnRhaW5zKHRoaXMpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnZHJvcCcsIHtkZXRhaWw6IHtpdGVtLCBmb3I6IHRoaXN9fSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG9sZG92ZXInLCBldnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldCA9PT0gZXZ0LmN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBnZW5UcmVlSXRlbXMuZmluZChlID0+IGUuZWxlbWVudCA9PT0gZXZ0LmRldGFpbC5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbnRhaW5zKHRoaXMpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ292ZXInLCB7ZGV0YWlsOiB7aXRlbSwgZm9yOiB0aGlzfX0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG9sZCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRtb3ZlJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuVHJlZUl0ZW1zLmZpbmQoZSA9PiBlLmVsZW1lbnQgPT09IGV2dC5kZXRhaWwuaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRsZWF2ZScsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7ZGV0YWlsOiB7aXRlbTogdGhpc319KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY29udGV4dG1lbnUnKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2xpY2snKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5uZXIgPSB0eXBlb2YgaW5uZXIgPT09ICdvYmplY3QnICYmIGlubmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ/IGlubmVyOiBNYWdpY2FUcmVlLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGlubmVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuaW5uZXIpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5kaXJlY3RvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbkxpc3QgPSBNYWdpY2FUcmVlLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5MaXN0LmNsYXNzTGlzdC5hZGQoJ21hZ2ljYS10cmVlLWxpc3QnKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLmNoaWxkcmVuTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXJlbnQuYXBwZW5kKHRoaXMpO1xyXG4gICAgICAgIGdlblRyZWVJdGVtcy5wdXNoKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ2hpbGQgKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZSA9PiBlICE9PSBpdGVtKTtcclxuICAgICAgICBpdGVtLmVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kIChpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5MaXN0LmFwcGVuZChpdGVtLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRhaW5zIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBpdGVtO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByb290KCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcztcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVwdGgoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkZXB0aCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgZGVwdGgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlcHRoO1xyXG4gICAgfVxyXG59XHJcblxyXG50cnkge1xyXG4gICAgTWFnaWNhVHJlZS53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICBNYWdpY2FUcmVlLmRvY3VtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbiAgICBNYWdpY2FUcmVlLkhUTUxFbGVtZW50ID0gSFRNTEVsZW1lbnQ7XHJcbiAgICBNYWdpY2FUcmVlLkltYWdlID0gSW1hZ2U7XHJcbn1cclxuY2F0Y2gge1xyXG4gICAgTWFnaWNhVHJlZS53aW5kb3cgPSB1bmRlZmluZWQ7XHJcbiAgICBNYWdpY2FUcmVlLmRvY3VtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgTWFnaWNhVHJlZS5DdXN0b21FdmVudCA9IHVuZGVmaW5lZDtcclxuICAgIE1hZ2ljYVRyZWUuSFRNTEVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBNYWdpY2FUcmVlLkltYWdlID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7TWFnaWNhVHJlZSwgVHJlZUl0ZW19O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=