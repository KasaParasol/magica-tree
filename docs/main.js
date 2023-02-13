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
let flickJudge = [];
let latestPoint;
let latestStartElem;
let calcDepthTargets = [];
const enchanted = [];

/**
 * @param { HTMLElement } target
 */
function enchantment (target, _opts) {
    opts = Object.assign(DEFAULT_OPTIONS, _opts);

    enchanted.push(target);

    /**
     *
     * @param {MouseEvent | TouchEvent} evt
     */
    const eventHandler = evt => {
        const calcTarget = enchanted.filter(e => e.contains(evt.target))
                                     .map(e => {return {ref: e, result: calcdepth(e)}})
                                     .reduce((a, e) => !a || a.result < e.result? e: a )
                                     .ref;
        if (calcTarget !== evt.currentTarget) return;

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
                    flickJudge = [];
                    latestPoint = {x: evt.touches[0].pageX, y: evt.touches[0].pageY};
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
                    flickJudge = [];
                    latestPoint = {x: evt.pageX, y: evt.pageY};
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
                evt.preventDefault();
                const {pageX: x, pageY: y} = evt.touches[0];
                const i = document.elementFromPoint(x, y);

                if (evt.touches[0].screenY !== 0 && holdedFlag && latestStartElem && i !== latestStartElem && enchanted.includes(i)) {
                    i.dispatchEvent(new CustomEvent('holdover', {
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
                evt.preventDefault();
                const holdedFlagCache = holdedFlag;

                setTimeout(() => {
                    const {x, y} = latestPoint;
                    const i = document.elementFromPoint(x, y);

                    document.querySelector('textarea').value = `${holdedFlagCache}`

                    if (holdedFlagCache && latestStartElem && latestStartElem !== i && enchanted.includes(i)) {
                        i.dispatchEvent(new CustomEvent('holddrop', {
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
            evt.preventDefault();
            if (evt.touches[0].screenY === 0) break;

            if (pointertart) {
                const {x: x1, y: y1} = pointertart._poi;
                const {pageX: x2, pageY: y2} = evt.touches[0];
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);

                if (flickJudge.length > 0) {
                    flickJudge = [flickJudge.pop()];
                }

                const {pageX: x, pageY: y} = evt.touches[0];
                const obj = {x, y};
                flickJudge.push(obj);
                latestPoint = obj;
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    if (flickJudge[flickJudge.length - 1] === obj)
                        flickJudge = [];
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
                    if (flickJudge.length > 0) {
                        flickJudge = [flickJudge.pop()];
                    }

                    const {pageX: x, pageY: y} = evt;
                    const obj = {x, y};
                    flickJudge.push(obj);
                    latestPoint = obj;
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        if (flickJudge[flickJudge.length - 1] === obj)
                            flickJudge = [];
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
            evt.preventDefault();

            if (pointertart?.handler) {
                clearTimeout(pointertart.handler);
                pointertart.handler = undefined;
            }

            if (holdedFlag) {
                latestStartElem.dispatchEvent(new CustomEvent('holdleave', {
                    bubbles: true,
                    cancelable: true,
                    detail: {point: flickJudge[flickJudge.length - 1], rawEv: evt},
                }));
            }

            if (flickJudge.length >= 2) {
                const {x: x1, y: y1} = flickJudge[flickJudge.length - 2];
                const {x: x2, y: y2} = flickJudge[flickJudge.length - 1];
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
            flickJudge = [];
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
                    detail: {point: flickJudge[flickJudge.length - 1], rawEv: evt},
                }));
            }

            if (flickJudge.length >= 2 && !holdedFlag) {
                const {x: x1, y: y1} = flickJudge[flickJudge.length - 2];
                const {x: x2, y: y2} = flickJudge[flickJudge.length - 1];
                const dist = Math.sqrt(Math.abs(x1 - x2) ^ 2 + Math.abs(y1 - y2) ^ 2);
                if (dist > opts.flickThreshold) {
                    latestStartElem.dispatchEvent(new CustomEvent('flick', {
                        bubbles: true,
                        cancelable: true,
                        detail: {start: pointertart._poi, point: {x: x1, y: y1}, rawEv: evt, angle: Math.atan2(y2 - y1, x2 - x1), speed: dist},
                    }));
                }
            }

            flickJudge = [];
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
            for (const iterator of ['holddrop', 'holdover', 'hold', 'holdleave', 'holdmove', 'flick', 'click', 'contextmenu']) {
                i.addEventListener(iterator, evt => {
                    this.dispatchEvent(new MagicaTree.CustomEvent(evt.type, {detail: evt.detail}));
                });
            }
        };
        for (const child of this.children) {
            f(child);
        }
    }

    addEventListener(type, listener, opts) {
        super.addEventListener(type, listener, opts);

        if (type === 'contextmenu') this.disableContextmenu = true;
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
            this.dispatchEvent(new MagicaTree.CustomEvent('holddrop', {detail: {...evt.detail, item, for: this}}));
        });

        this.element.addEventListener('holdover', evt => {
            if (evt.target === evt.currentTarget) {
                const item = genTreeItems.find(e => e.element === evt.detail.item);
                if (item.contains(this)) return;
                this.dispatchEvent(new MagicaTree.CustomEvent('holdover', {detail: {...evt.detail, item, for: this}}));
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
            this.dispatchEvent(new MagicaTree.CustomEvent('holdleave', {detail: {item: this, ...evt.detail}}));
        });

        this.element.addEventListener('flick', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('flick', {detail: {item: this, ...evt.detail}}));
        });

        this.element.addEventListener('contextmenu', evt => {
            evt.stopPropagation();
            if (this.root.disableContextmenu) evt.preventDefault();
            this.dispatchEvent(new MagicaTree.CustomEvent('contextmenu', {detail: {item: this, target: evt.target, position: {x: evt.pageX, y: evt.pageY}}}));
        });

        this.element.addEventListener('click', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('click', {detail: {item: this, target: evt.target, position: {x: evt.pageX, y: evt.pageY}}}));
        });

        this.element.addEventListener('dblclick', evt => {
            evt.stopPropagation();
            this.dispatchEvent(new MagicaTree.CustomEvent('dblclick', {detail: {item: this, target: evt.target, position: {x: evt.pageX, y: evt.pageY}}}));
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
}
catch {
    MagicaTree.window = undefined;
    MagicaTree.document = undefined;
    MagicaTree.CustomEvent = undefined;
    MagicaTree.HTMLElement = undefined;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({MagicaTree, TreeItem});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Iiwid2VicGFjazovL01hZ2ljYVRyZWUvLi9ub2RlX21vZHVsZXMvbWFnaWMtdG91Y2gvc3JjL2luZGV4LmpzIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1hZ2ljYVRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTWFnaWNhVHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICBob2xkVGhyZXNob2xkOiA3NTAsXHJcbiAgICBhY2NlcHRhYmxlRGlzdFRocmVzaG9sZDogMS41LFxyXG4gICAgZmxpY2tUaHJlc2hvbGQ6IDEuNSxcclxufTtcclxuXHJcbk9iamVjdC5mcmVlemUoREVGQVVMVF9PUFRJT05TKTtcclxuXHJcbmxldCBvcHRzID0gey4uLkRFRkFVTFRfT1BUSU9OU307XHJcbmxldCBwb2ludGVydGFydDtcclxubGV0IGhvbGRlZEZsYWcgPSBmYWxzZTtcclxubGV0IGZsaWNrSnVkZ2UgPSBbXTtcclxubGV0IGxhdGVzdFBvaW50O1xyXG5sZXQgbGF0ZXN0U3RhcnRFbGVtO1xyXG5sZXQgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5jb25zdCBlbmNoYW50ZWQgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IHRhcmdldFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVuY2hhbnRtZW50ICh0YXJnZXQsIF9vcHRzKSB7XHJcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbihERUZBVUxUX09QVElPTlMsIF9vcHRzKTtcclxuXHJcbiAgICBlbmNoYW50ZWQucHVzaCh0YXJnZXQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudCB8IFRvdWNoRXZlbnR9IGV2dFxyXG4gICAgICovXHJcbiAgICBjb25zdCBldmVudEhhbmRsZXIgPSBldnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhbGNUYXJnZXQgPSBlbmNoYW50ZWQuZmlsdGVyKGUgPT4gZS5jb250YWlucyhldnQudGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZSA9PiB7cmV0dXJuIHtyZWY6IGUsIHJlc3VsdDogY2FsY2RlcHRoKGUpfX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBlKSA9PiAhYSB8fCBhLnJlc3VsdCA8IGUucmVzdWx0PyBlOiBhIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWY7XHJcbiAgICAgICAgaWYgKGNhbGNUYXJnZXQgIT09IGV2dC5jdXJyZW50VGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGNhbGNEZXB0aFRhcmdldHMucmVkdWNlKChhLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIHtyZXN1bHQ6IGNhbGNkZXB0aChlKSwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGggPSBjYWxjZGVwdGgoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnJlc3VsdCA8IGRlcHRoKSByZXR1cm4ge3Jlc3VsdDogZGVwdGgsIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkKS5yZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbSA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBmbGlja0p1ZGdlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSB7eDogZXZ0LnRvdWNoZXNbMF0ucGFnZVgsIHk6IGV2dC50b3VjaGVzWzBdLnBhZ2VZfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXJ0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZ0LnRvdWNoZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcG9pOiB7eDogZXZ0LnRvdWNoZXNbMF0ucGFnZVgsIHk6IGV2dC50b3VjaGVzWzBdLnBhZ2VZfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cy5ob2xkVGhyZXNob2xkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocG9pbnRlcnRhcnQuaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzoge1xyXG4gICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gY2FsY0RlcHRoVGFyZ2V0cy5yZWR1Y2UoKGEsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhKSByZXR1cm4ge3Jlc3VsdDogY2FsY2RlcHRoKGUpLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aCA9IGNhbGNkZXB0aChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucmVzdWx0IDwgZGVwdGgpIHJldHVybiB7cmVzdWx0OiBkZXB0aCwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpLnJlZjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB0YXJnZXQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0gPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0ge3g6IGV2dC5wYWdlWCwgeTogZXZ0LnBhZ2VZfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXJ0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiBldnQuYnV0dG9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogZXZ0LmJ1dHRvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcG9pOiB7eDogZXZ0LnBhZ2VYLCB5OiBldnQucGFnZVl9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDogcG9pbnRlcnRhcnQuX3BvaSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzLmhvbGRUaHJlc2hvbGQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2ludGVydGFydC5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB7XHJcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRvdWNoZXNbMF0uc2NyZWVuWSAhPT0gMCAmJiBob2xkZWRGbGFnICYmIGxhdGVzdFN0YXJ0RWxlbSAmJiBpICE9PSBsYXRlc3RTdGFydEVsZW0gJiYgZW5jaGFudGVkLmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG92ZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6IHtcclxuICAgICAgICAgICAgICAgIGlmIChldnQuc2NyZWVuWSAhPT0gMCAmJiBob2xkZWRGbGFnICYmIGxhdGVzdFN0YXJ0RWxlbSAmJiB0YXJnZXQgIT09IGxhdGVzdFN0YXJ0RWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldnQuYnV0dG9uID09PSBwb2ludGVydGFydC5idXR0b25cclxuICAgICAgICAgICAgICAgICAgICAmJiBldnQuYnV0dG9ucyA9PT0gcG9pbnRlcnRhcnQuYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkb3ZlcicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgaXRlbTogbGF0ZXN0U3RhcnRFbGVtLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOiB7XHJcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvbGRlZEZsYWdDYWNoZSA9IGhvbGRlZEZsYWc7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gbGF0ZXN0UG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPSBgJHtob2xkZWRGbGFnQ2FjaGV9YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9sZGVkRmxhZ0NhY2hlICYmIGxhdGVzdFN0YXJ0RWxlbSAmJiBsYXRlc3RTdGFydEVsZW0gIT09IGkgJiYgZW5jaGFudGVkLmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvbGRlZEZsYWdDYWNoZSA9IGhvbGRlZEZsYWc7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gY2FsY0RlcHRoVGFyZ2V0cy5yZWR1Y2UoKGEsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhKSByZXR1cm4ge3Jlc3VsdDogY2FsY2RlcHRoKGUpLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aCA9IGNhbGNkZXB0aChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucmVzdWx0IDwgZGVwdGgpIHJldHVybiB7cmVzdWx0OiBkZXB0aCwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpLnJlZjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWdDYWNoZSAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZGRyb3AnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBldmVudEhhbmRsZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW5kb3dFdmVudEhhbmRlciAoZXZ0KSB7XHJcbiAgICBpZiAoIWxhdGVzdFN0YXJ0RWxlbSkgcmV0dXJuO1xyXG5cclxuICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICd0b3VjaG1vdmUnOiB7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnRvdWNoZXNbMF0uc2NyZWVuWSA9PT0gMCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MSwgeTogeTF9ID0gcG9pbnRlcnRhcnQuX3BvaTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeDIsIHBhZ2VZOiB5Mn0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tKdWRnZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtmbGlja0p1ZGdlLnBvcCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge3gsIHl9O1xyXG4gICAgICAgICAgICAgICAgZmxpY2tKdWRnZS5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IG9iajtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbGlja0p1ZGdlW2ZsaWNrSnVkZ2UubGVuZ3RoIC0gMV0gPT09IG9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5hY2NlcHRhYmxlRGlzdFRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6IHtcclxuICAgICAgICAgICAgaWYgKGV2dC5zY3JlZW5ZID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGlmIChwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBwb2ludGVydGFydC5fcG9pO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4MiwgcGFnZVk6IHkyfSA9IGV2dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChldnQuYnV0dG9uID09PSBwb2ludGVydGFydC5idXR0b25cclxuICAgICAgICAgICAgICAgICYmIGV2dC5idXR0b25zID09PSBwb2ludGVydGFydC5idXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZsaWNrSnVkZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGlja0p1ZGdlID0gW2ZsaWNrSnVkZ2UucG9wKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge3gsIHl9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZsaWNrSnVkZ2UucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0gb2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxpY2tKdWRnZVtmbGlja0p1ZGdlLmxlbmd0aCAtIDFdID09PSBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGlja0p1ZGdlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5hY2NlcHRhYmxlRGlzdFRocmVzaG9sZFxyXG4gICAgICAgICAgICAgICAgfHwgZXZ0LmJ1dHRvbiAhPT0gcG9pbnRlcnRhcnQuYnV0dG9uXHJcbiAgICAgICAgICAgICAgICB8fCBldnQuYnV0dG9ucyAhPT0gcG9pbnRlcnRhcnQuYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRtb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICd0b3VjaGVuZCc6IHtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQ/LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRsZWF2ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAxXSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja0p1ZGdlLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDEsIHk6IHkxfSA9IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MiwgeTogeTJ9ID0gZmxpY2tKdWRnZVtmbGlja0p1ZGdlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLmFicyh4MSAtIHgyKSBeIDIgKyBNYXRoLmFicyh5MSAtIHkyKSBeIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBvcHRzLmZsaWNrVGhyZXNob2xkICYmICFob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdmbGljaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7c3RhcnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHBvaW50OiB7eDogeDEsIHk6IHkxfSwgcmF3RXY6IGV2dCwgYW5nbGU6IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSksIHNwZWVkOiBkaXN0fSxcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvbGRlZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtdO1xyXG4gICAgICAgICAgICBwb2ludGVydGFydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdtb3VzZXVwJzoge1xyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQ/LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwb2ludGVydGFydC5oYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRsZWF2ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAxXSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja0p1ZGdlLmxlbmd0aCA+PSAyICYmICFob2xkZWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDEsIHk6IHkxfSA9IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MiwgeTogeTJ9ID0gZmxpY2tKdWRnZVtmbGlja0p1ZGdlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLmFicyh4MSAtIHgyKSBeIDIgKyBNYXRoLmFicyh5MSAtIHkyKSBeIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBvcHRzLmZsaWNrVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdmbGljaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7c3RhcnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHBvaW50OiB7eDogeDEsIHk6IHkxfSwgcmF3RXY6IGV2dCwgYW5nbGU6IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSksIHNwZWVkOiBkaXN0fSxcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZsaWNrSnVkZ2UgPSBbXTtcclxuICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGhvbGRlZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjYWxjZGVwdGggPSAoZSkgPT4ge1xyXG4gICAgbGV0IGN1cnJlbnQgPSBlO1xyXG4gICAgbGV0IGRlcHRoID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGRlcHRoKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVwdGg7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHdpbmRvd0V2ZW50SGFuZGVyKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHdpbmRvd0V2ZW50SGFuZGVyKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7ZW5jaGFudG1lbnR9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGVuY2hhbnRtZW50IH0gZnJvbSBcIm1hZ2ljLXRvdWNoXCI7XHJcblxyXG5jb25zdCBnZW5UcmVlSXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWdpY2FUcmVlIGV4dGVuZHMgRXZlbnRUYXJnZXRcclxue1xyXG4gICAgc3RhdGljIHdpbmRvdztcclxuICAgIHN0YXRpYyBkb2N1bWVudDtcclxuICAgIHN0YXRpYyBDdXN0b21FdmVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoZWxlbWVudCwgY29udmVydGVyLCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWFnaWNhLXRyZWUtd3JhcHBlcicpO1xyXG5cclxuICAgICAgICB0aGlzLmlubmVyID0gTWFnaWNhVHJlZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgICAgIHRoaXMuaW5uZXIuY2xhc3NMaXN0LmFkZCgnbWFnaWNhLXRyZWUtbGlzdCcsICdyb290Jyk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLmlubmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVHJlZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFRyZWUgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmlubmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnZlcnRlcihkYXRhLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBmID0gKGkpID0+IHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBpLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmKGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIFsnaG9sZGRyb3AnLCAnaG9sZG92ZXInLCAnaG9sZCcsICdob2xkbGVhdmUnLCAnaG9sZG1vdmUnLCAnZmxpY2snLCAnY2xpY2snLCAnY29udGV4dG1lbnUnXSkge1xyXG4gICAgICAgICAgICAgICAgaS5hZGRFdmVudExpc3RlbmVyKGl0ZXJhdG9yLCBldnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudChldnQudHlwZSwge2RldGFpbDogZXZ0LmRldGFpbH0pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgZihjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdHMpIHtcclxuICAgICAgICBzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRzKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjb250ZXh0bWVudScpIHRoaXMuZGlzYWJsZUNvbnRleHRtZW51ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmQgKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5pbm5lci5hcHBlbmQoaXRlbS5lbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVJdGVtIGV4dGVuZHMgRXZlbnRUYXJnZXRcclxue1xyXG4gICAgc3RhdGljIFRSRUVfSVRFTV9ERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICAgICAgZGlyZWN0b3J5OiB0cnVlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoaW5uZXIsIG9wdHMgPSB7fSwgcGFyZW50LCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgVHJlZUl0ZW0uVFJFRV9JVEVNX0RFRkFVTFRfT1BUSU9OUywgb3B0cyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gTWFnaWNhVHJlZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGVuY2hhbnRtZW50KHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkZHJvcCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jb250YWlucyh0aGlzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge2RldGFpbDogey4uLmV2dC5kZXRhaWwsIGl0ZW0sIGZvcjogdGhpc319KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkb3ZlcicsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGFpbnModGhpcykpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnaG9sZG92ZXInLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgZm9yOiB0aGlzfX0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG9sZCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRtb3ZlJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuVHJlZUl0ZW1zLmZpbmQoZSA9PiBlLmVsZW1lbnQgPT09IGV2dC5kZXRhaWwuaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRsZWF2ZScsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7ZGV0YWlsOiB7aXRlbTogdGhpcywgLi4uZXZ0LmRldGFpbH19KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdmbGljaycsIHtkZXRhaWw6IHtpdGVtOiB0aGlzLCAuLi5ldnQuZGV0YWlsfX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb290LmRpc2FibGVDb250ZXh0bWVudSkgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnY29udGV4dG1lbnUnLCB7ZGV0YWlsOiB7aXRlbTogdGhpcywgdGFyZ2V0OiBldnQudGFyZ2V0LCBwb3NpdGlvbjoge3g6IGV2dC5wYWdlWCwgeTogZXZ0LnBhZ2VZfX19KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdjbGljaycsIHtkZXRhaWw6IHtpdGVtOiB0aGlzLCB0YXJnZXQ6IGV2dC50YXJnZXQsIHBvc2l0aW9uOiB7eDogZXZ0LnBhZ2VYLCB5OiBldnQucGFnZVl9fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2RibGNsaWNrJywge2RldGFpbDoge2l0ZW06IHRoaXMsIHRhcmdldDogZXZ0LnRhcmdldCwgcG9zaXRpb246IHt4OiBldnQucGFnZVgsIHk6IGV2dC5wYWdlWX19fSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlubmVyID0gdHlwZW9mIGlubmVyID09PSAnb2JqZWN0JyAmJiBpbm5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50PyBpbm5lcjogTWFnaWNhVHJlZS5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpbm5lcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLmlubmVyKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuZGlyZWN0b3J5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5MaXN0ID0gTWFnaWNhVHJlZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuTGlzdC5jbGFzc0xpc3QuYWRkKCdtYWdpY2EtdHJlZS1saXN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5jaGlsZHJlbkxpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFyZW50LmFwcGVuZCh0aGlzKTtcclxuICAgICAgICBnZW5UcmVlSXRlbXMucHVzaCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUgKCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNoaWxkIChpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKGUgPT4gZSAhPT0gaXRlbSk7XHJcbiAgICAgICAgaXRlbS5lbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZCAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuTGlzdC5hcHBlbmQoaXRlbS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjb250YWlucyAoaXRlbSkge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gaXRlbTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gdGhpcykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcm9vdCgpIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXM7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlcHRoKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcztcclxuICAgICAgICBsZXQgZGVwdGggPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGRlcHRoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXB0aDtcclxuICAgIH1cclxufVxyXG5cclxudHJ5IHtcclxuICAgIE1hZ2ljYVRyZWUud2luZG93ID0gd2luZG93O1xyXG4gICAgTWFnaWNhVHJlZS5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG4gICAgTWFnaWNhVHJlZS5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xyXG4gICAgTWFnaWNhVHJlZS5IVE1MRWxlbWVudCA9IEhUTUxFbGVtZW50O1xyXG59XHJcbmNhdGNoIHtcclxuICAgIE1hZ2ljYVRyZWUud2luZG93ID0gdW5kZWZpbmVkO1xyXG4gICAgTWFnaWNhVHJlZS5kb2N1bWVudCA9IHVuZGVmaW5lZDtcclxuICAgIE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBNYWdpY2FUcmVlLkhUTUxFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7TWFnaWNhVHJlZSwgVHJlZUl0ZW19O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=