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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBMkUsU0FBUyxnQ0FBZ0M7QUFDcEg7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsU0FBUyx5Q0FBeUM7QUFDckgsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLFNBQVMseUNBQXlDO0FBQ3pILFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsU0FBUywyQkFBMkI7QUFDNUcsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxTQUFTLDJCQUEyQjtBQUN4RyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLFNBQVMsMkNBQTJDLDZCQUE2QjtBQUMzSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLFNBQVMsMkNBQTJDLDZCQUE2QjtBQUNySixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLFNBQVMsMkNBQTJDLDZCQUE2QjtBQUN4SixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLENBQUMscUJBQXFCLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NYWdpY2FUcmVlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlLy4vbm9kZV9tb2R1bGVzL21hZ2ljLXRvdWNoL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01hZ2ljYVRyZWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NYWdpY2FUcmVlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTWFnaWNhVHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNYWdpY2FUcmVlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1hZ2ljYVRyZWVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xyXG4gICAgaG9sZFRocmVzaG9sZDogNzUwLFxyXG4gICAgYWNjZXB0YWJsZURpc3RUaHJlc2hvbGQ6IDEuNSxcclxuICAgIGZsaWNrVGhyZXNob2xkOiAxLjUsXHJcbn07XHJcblxyXG5PYmplY3QuZnJlZXplKERFRkFVTFRfT1BUSU9OUyk7XHJcblxyXG5sZXQgb3B0cyA9IHsuLi5ERUZBVUxUX09QVElPTlN9O1xyXG5sZXQgcG9pbnRlcnRhcnQ7XHJcbmxldCBob2xkZWRGbGFnID0gZmFsc2U7XHJcbmxldCBmbGlja0p1ZGdlID0gW107XHJcbmxldCBsYXRlc3RQb2ludDtcclxubGV0IGxhdGVzdFN0YXJ0RWxlbTtcclxubGV0IGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuY29uc3QgZW5jaGFudGVkID0gW107XHJcblxyXG4vKipcclxuICogQHBhcmFtIHsgSFRNTEVsZW1lbnQgfSB0YXJnZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmNoYW50bWVudCAodGFyZ2V0LCBfb3B0cykge1xyXG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9PUFRJT05TLCBfb3B0cyk7XHJcblxyXG4gICAgZW5jaGFudGVkLnB1c2godGFyZ2V0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnQgfCBUb3VjaEV2ZW50fSBldnRcclxuICAgICAqL1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVyID0gZXZ0ID0+IHtcclxuICAgICAgICBjb25zdCBjYWxjVGFyZ2V0ID0gZW5jaGFudGVkLmZpbHRlcihlID0+IGUuY29udGFpbnMoZXZ0LnRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGUgPT4ge3JldHVybiB7cmVmOiBlLCByZXN1bHQ6IGNhbGNkZXB0aChlKX19KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgZSkgPT4gIWEgfHwgYS5yZXN1bHQgPCBlLnJlc3VsdD8gZTogYSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVmO1xyXG4gICAgICAgIGlmIChjYWxjVGFyZ2V0ICE9PSBldnQuY3VycmVudFRhcmdldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGVwdGhUYXJnZXRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBjYWxjRGVwdGhUYXJnZXRzLnJlZHVjZSgoYSwgZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWEpIHJldHVybiB7cmVzdWx0OiBjYWxjZGVwdGgoZSksIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoID0gY2FsY2RlcHRoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5yZXN1bHQgPCBkZXB0aCkgcmV0dXJuIHtyZXN1bHQ6IGRlcHRoLCByZWY6IGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCkucmVmO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgIT09IHRhcmdldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0gPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFBvaW50ID0ge3g6IGV2dC50b3VjaGVzWzBdLnBhZ2VYLCB5OiBldnQudG91Y2hlc1swXS5wYWdlWX07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2dC50b3VjaGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BvaToge3g6IGV2dC50b3VjaGVzWzBdLnBhZ2VYLCB5OiBldnQudG91Y2hlc1swXS5wYWdlWX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBwb2ludGVydGFydC5fcG9pLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZWRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMuaG9sZFRocmVzaG9sZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXJ0YXJ0LmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBvaW50ZXJ0YXJ0LmhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGNhbGNEZXB0aFRhcmdldHMucmVkdWNlKChhLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIHtyZXN1bHQ6IGNhbGNkZXB0aChlKSwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGggPSBjYWxjZGVwdGgoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnJlc3VsdCA8IGRlcHRoKSByZXR1cm4ge3Jlc3VsdDogZGVwdGgsIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkKS5yZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZsaWNrSnVkZ2UgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IHt4OiBldnQucGFnZVgsIHk6IGV2dC5wYWdlWX07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2ludGVydGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbjogZXZ0LmJ1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IGV2dC5idXR0b25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BvaToge3g6IGV2dC5wYWdlWCwgeTogZXZ0LnBhZ2VZfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHBvaW50ZXJ0YXJ0Ll9wb2ksIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZWRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cy5ob2xkVGhyZXNob2xkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocG9pbnRlcnRhcnQuaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJ0YXJ0LmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzoge1xyXG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgsIHBhZ2VZOiB5fSA9IGV2dC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50b3VjaGVzWzBdLnNjcmVlblkgIT09IDAgJiYgaG9sZGVkRmxhZyAmJiBsYXRlc3RTdGFydEVsZW0gJiYgaSAhPT0gbGF0ZXN0U3RhcnRFbGVtICYmIGVuY2hhbnRlZC5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRvdmVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtb3VzZW1vdmUnOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnNjcmVlblkgIT09IDAgJiYgaG9sZGVkRmxhZyAmJiBsYXRlc3RTdGFydEVsZW0gJiYgdGFyZ2V0ICE9PSBsYXRlc3RTdGFydEVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiA9PT0gcG9pbnRlcnRhcnQuYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZXZ0LmJ1dHRvbnMgPT09IHBvaW50ZXJ0YXJ0LmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaG9sZG92ZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiB7eCwgeX0sIGl0ZW06IGxhdGVzdFN0YXJ0RWxlbSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzoge1xyXG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob2xkZWRGbGFnQ2FjaGUgPSBob2xkZWRGbGFnO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IGxhdGVzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gYCR7aG9sZGVkRmxhZ0NhY2hlfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWdDYWNoZSAmJiBsYXRlc3RTdGFydEVsZW0gJiYgbGF0ZXN0U3RhcnRFbGVtICE9PSBpICYmIGVuY2hhbnRlZC5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkZHJvcCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgaXRlbTogbGF0ZXN0U3RhcnRFbGVtLCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob2xkZWRGbGFnQ2FjaGUgPSBob2xkZWRGbGFnO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbGNEZXB0aFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGNhbGNEZXB0aFRhcmdldHMucmVkdWNlKChhLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIHtyZXN1bHQ6IGNhbGNkZXB0aChlKSwgcmVmOiBlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGggPSBjYWxjZGVwdGgoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnJlc3VsdCA8IGRlcHRoKSByZXR1cm4ge3Jlc3VsdDogZGVwdGgsIHJlZjogZX07XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkKS5yZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY0RlcHRoVGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob2xkZWRGbGFnQ2FjaGUgJiYgbGF0ZXN0U3RhcnRFbGVtICYmIHRhcmdldCAhPT0gbGF0ZXN0U3RhcnRFbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCBpdGVtOiBsYXRlc3RTdGFydEVsZW0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRIYW5kbGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRIYW5kbGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2luZG93RXZlbnRIYW5kZXIgKGV2dCkge1xyXG4gICAgaWYgKCFsYXRlc3RTdGFydEVsZW0pIHJldHVybjtcclxuXHJcbiAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAndG91Y2htb3ZlJzoge1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGV2dC50b3VjaGVzWzBdLnNjcmVlblkgPT09IDApIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvaW50ZXJ0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDEsIHk6IHkxfSA9IHBvaW50ZXJ0YXJ0Ll9wb2k7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGFnZVg6IHgyLCBwYWdlWTogeTJ9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGguYWJzKHgxIC0geDIpIF4gMiArIE1hdGguYWJzKHkxIC0geTIpIF4gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNrSnVkZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsaWNrSnVkZ2UgPSBbZmxpY2tKdWRnZS5wb3AoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPSBldnQudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHt4LCB5fTtcclxuICAgICAgICAgICAgICAgIGZsaWNrSnVkZ2UucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0UG9pbnQgPSBvYmo7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmxpY2tKdWRnZVtmbGlja0p1ZGdlLmxlbmd0aCAtIDFdID09PSBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsaWNrSnVkZ2UgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IG9wdHMuYWNjZXB0YWJsZURpc3RUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RTdGFydEVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2hvbGRtb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtwb2ludDoge3gsIHl9LCByYXdFdjogZXZ0fSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdtb3VzZW1vdmUnOiB7XHJcbiAgICAgICAgICAgIGlmIChldnQuc2NyZWVuWSA9PT0gMCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9pbnRlcnRhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4OiB4MSwgeTogeTF9ID0gcG9pbnRlcnRhcnQuX3BvaTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeDIsIHBhZ2VZOiB5Mn0gPSBldnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGguYWJzKHgxIC0geDIpIF4gMiArIE1hdGguYWJzKHkxIC0geTIpIF4gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiA9PT0gcG9pbnRlcnRhcnQuYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAmJiBldnQuYnV0dG9ucyA9PT0gcG9pbnRlcnRhcnQuYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbGlja0p1ZGdlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtmbGlja0p1ZGdlLnBvcCgpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHt4LCB5fTtcclxuICAgICAgICAgICAgICAgICAgICBmbGlja0p1ZGdlLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3RQb2ludCA9IG9iajtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAxXSA9PT0gb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxpY2tKdWRnZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IG9wdHMuYWNjZXB0YWJsZURpc3RUaHJlc2hvbGRcclxuICAgICAgICAgICAgICAgIHx8IGV2dC5idXR0b24gIT09IHBvaW50ZXJ0YXJ0LmJ1dHRvblxyXG4gICAgICAgICAgICAgICAgfHwgZXZ0LmJ1dHRvbnMgIT09IHBvaW50ZXJ0YXJ0LmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcnRhcnQuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvbGRlZEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwYWdlWDogeCwgcGFnZVk6IHl9ID0gZXZ0O1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkbW92ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cG9pbnQ6IHt4LCB5fSwgcmF3RXY6IGV2dH0sXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAndG91Y2hlbmQnOiB7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvaW50ZXJ0YXJ0Py5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBmbGlja0p1ZGdlW2ZsaWNrSnVkZ2UubGVuZ3RoIC0gMV0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tKdWRnZS5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBmbGlja0p1ZGdlW2ZsaWNrSnVkZ2UubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDIsIHk6IHkyfSA9IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5mbGlja1RocmVzaG9sZCAmJiAhaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZmxpY2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3N0YXJ0OiBwb2ludGVydGFydC5fcG9pLCBwb2ludDoge3g6IHgxLCB5OiB5MX0sIHJhd0V2OiBldnQsIGFuZ2xlOiBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpLCBzcGVlZDogZGlzdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBob2xkZWRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsaWNrSnVkZ2UgPSBbXTtcclxuICAgICAgICAgICAgcG9pbnRlcnRhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAnbW91c2V1cCc6IHtcclxuICAgICAgICAgICAgaWYgKHBvaW50ZXJ0YXJ0Py5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocG9pbnRlcnRhcnQuaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVydGFydC5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0U3RhcnRFbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3BvaW50OiBmbGlja0p1ZGdlW2ZsaWNrSnVkZ2UubGVuZ3RoIC0gMV0sIHJhd0V2OiBldnR9LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tKdWRnZS5sZW5ndGggPj0gMiAmJiAhaG9sZGVkRmxhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3g6IHgxLCB5OiB5MX0gPSBmbGlja0p1ZGdlW2ZsaWNrSnVkZ2UubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eDogeDIsIHk6IHkyfSA9IGZsaWNrSnVkZ2VbZmxpY2tKdWRnZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5hYnMoeDEgLSB4MikgXiAyICsgTWF0aC5hYnMoeTEgLSB5MikgXiAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gb3B0cy5mbGlja1RocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdFN0YXJ0RWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZmxpY2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge3N0YXJ0OiBwb2ludGVydGFydC5fcG9pLCBwb2ludDoge3g6IHgxLCB5OiB5MX0sIHJhd0V2OiBldnQsIGFuZ2xlOiBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpLCBzcGVlZDogZGlzdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmbGlja0p1ZGdlID0gW107XHJcbiAgICAgICAgICAgIHBvaW50ZXJ0YXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBob2xkZWRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2FsY2RlcHRoID0gKGUpID0+IHtcclxuICAgIGxldCBjdXJyZW50ID0gZTtcclxuICAgIGxldCBkZXB0aCA9IDA7XHJcbiAgICB3aGlsZSAoY3VycmVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBkZXB0aCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlcHRoO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgd2luZG93RXZlbnRIYW5kZXIpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB3aW5kb3dFdmVudEhhbmRlcik7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgd2luZG93RXZlbnRIYW5kZXIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge2VuY2hhbnRtZW50fTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBlbmNoYW50bWVudCB9IGZyb20gXCJtYWdpYy10b3VjaFwiO1xyXG5cclxuY29uc3QgZ2VuVHJlZUl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgY2xhc3MgTWFnaWNhVHJlZSBleHRlbmRzIEV2ZW50VGFyZ2V0XHJcbntcclxuICAgIHN0YXRpYyB3aW5kb3c7XHJcbiAgICBzdGF0aWMgZG9jdW1lbnQ7XHJcbiAgICBzdGF0aWMgQ3VzdG9tRXZlbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGVsZW1lbnQsIGNvbnZlcnRlciwgZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hZ2ljYS10cmVlLXdyYXBwZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbm5lciA9IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICB0aGlzLmlubmVyLmNsYXNzTGlzdC5hZGQoJ21hZ2ljYS10cmVlLWxpc3QnLCAncm9vdCcpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5pbm5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udmVydGVyID0gY29udmVydGVyO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFRyZWUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRUcmVlIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIoZGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgZiA9IChpKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZihjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBbJ2hvbGRkcm9wJywgJ2hvbGRvdmVyJywgJ2hvbGQnLCAnaG9sZGxlYXZlJywgJ2hvbGRtb3ZlJywgJ2ZsaWNrJywgJ2NsaWNrJywgJ2NvbnRleHRtZW51J10pIHtcclxuICAgICAgICAgICAgICAgIGkuYWRkRXZlbnRMaXN0ZW5lcihpdGVyYXRvciwgZXZ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoZXZ0LnR5cGUsIHtkZXRhaWw6IGV2dC5kZXRhaWx9KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGYoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmQgKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5pbm5lci5hcHBlbmQoaXRlbS5lbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVJdGVtIGV4dGVuZHMgRXZlbnRUYXJnZXRcclxue1xyXG4gICAgc3RhdGljIFRSRUVfSVRFTV9ERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICAgICAgZGlyZWN0b3J5OiB0cnVlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoaW5uZXIsIG9wdHMgPSB7fSwgcGFyZW50LCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgVHJlZUl0ZW0uVFJFRV9JVEVNX0RFRkFVTFRfT1BUSU9OUywgb3B0cyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gTWFnaWNhVHJlZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGVuY2hhbnRtZW50KHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkZHJvcCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jb250YWlucyh0aGlzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGRkcm9wJywge2RldGFpbDogey4uLmV2dC5kZXRhaWwsIGl0ZW0sIGZvcjogdGhpc319KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdob2xkb3ZlcicsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGFpbnModGhpcykpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnaG9sZG92ZXInLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgZm9yOiB0aGlzfX0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG9sZCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlblRyZWVJdGVtcy5maW5kKGUgPT4gZS5lbGVtZW50ID09PSBldnQuZGV0YWlsLml0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2hvbGQnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRtb3ZlJywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuVHJlZUl0ZW1zLmZpbmQoZSA9PiBlLmVsZW1lbnQgPT09IGV2dC5kZXRhaWwuaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnaG9sZG1vdmUnLCB7ZGV0YWlsOiB7Li4uZXZ0LmRldGFpbCwgaXRlbSwgdGFyZ2V0OiBldnQudGFyZ2V0fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvbGRsZWF2ZScsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdob2xkbGVhdmUnLCB7ZGV0YWlsOiB7aXRlbTogdGhpcywgLi4uZXZ0LmRldGFpbH19KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdmbGljaycsIHtkZXRhaWw6IHtpdGVtOiB0aGlzLCAuLi5ldnQuZGV0YWlsfX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZXZ0ID0+IHtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQoJ2NvbnRleHRtZW51Jywge2RldGFpbDoge2l0ZW06IHRoaXMsIHRhcmdldDogZXZ0LnRhcmdldCwgcG9zaXRpb246IHt4OiBldnQucGFnZVgsIHk6IGV2dC5wYWdlWX19fSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTWFnaWNhVHJlZS5DdXN0b21FdmVudCgnY2xpY2snLCB7ZGV0YWlsOiB7aXRlbTogdGhpcywgdGFyZ2V0OiBldnQudGFyZ2V0LCBwb3NpdGlvbjoge3g6IGV2dC5wYWdlWCwgeTogZXZ0LnBhZ2VZfX19KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50KCdkYmxjbGljaycsIHtkZXRhaWw6IHtpdGVtOiB0aGlzLCB0YXJnZXQ6IGV2dC50YXJnZXQsIHBvc2l0aW9uOiB7eDogZXZ0LnBhZ2VYLCB5OiBldnQucGFnZVl9fX0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbm5lciA9IHR5cGVvZiBpbm5lciA9PT0gJ29iamVjdCcgJiYgaW5uZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudD8gaW5uZXI6IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaW5uZXIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5pbm5lcik7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRzLmRpcmVjdG9yeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuTGlzdCA9IE1hZ2ljYVRyZWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbkxpc3QuY2xhc3NMaXN0LmFkZCgnbWFnaWNhLXRyZWUtbGlzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuY2hpbGRyZW5MaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcmVudC5hcHBlbmQodGhpcyk7XHJcbiAgICAgICAgZ2VuVHJlZUl0ZW1zLnB1c2godGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlICgpIHtcclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDaGlsZCAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmZpbHRlcihlID0+IGUgIT09IGl0ZW0pO1xyXG4gICAgICAgIGl0ZW0uZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmQgKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbkxpc3QuYXBwZW5kKGl0ZW0uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGFpbnMgKGl0ZW0pIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IGl0ZW07XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJvb3QoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZXB0aCgpIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRlcHRoID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICBkZXB0aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVwdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbnRyeSB7XHJcbiAgICBNYWdpY2FUcmVlLndpbmRvdyA9IHdpbmRvdztcclxuICAgIE1hZ2ljYVRyZWUuZG9jdW1lbnQgPSBkb2N1bWVudDtcclxuICAgIE1hZ2ljYVRyZWUuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuICAgIE1hZ2ljYVRyZWUuSFRNTEVsZW1lbnQgPSBIVE1MRWxlbWVudDtcclxufVxyXG5jYXRjaCB7XHJcbiAgICBNYWdpY2FUcmVlLndpbmRvdyA9IHVuZGVmaW5lZDtcclxuICAgIE1hZ2ljYVRyZWUuZG9jdW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBNYWdpY2FUcmVlLkN1c3RvbUV2ZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgTWFnaWNhVHJlZS5IVE1MRWxlbWVudCA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge01hZ2ljYVRyZWUsIFRyZWVJdGVtfTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9