import { enchantment } from "magic-touch";

const genTreeItems = [];

export class MagicaTree extends EventTarget
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

export class TreeItem extends EventTarget
{
    static TREE_ITEM_DEFAULT_OPTIONS = {
        directory: true,
    };

    constructor (inner, opts = {}, parent, data) {
        super();

        this.opts = Object.assign({}, TreeItem.TREE_ITEM_DEFAULT_OPTIONS, opts);
        this.data = data;

        this.element = MagicaTree.document.createElement('li');
        enchantment(this.element);

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
}
catch {
    MagicaTree.window = undefined;
    MagicaTree.document = undefined;
    MagicaTree.CustomEvent = undefined;
    MagicaTree.HTMLElement = undefined;
}

export default {MagicaTree, TreeItem};
