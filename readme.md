![MagicaTree](attachment/logo.png)
===

MagicaTree は リスト (`ul`、`li`) を元にドラッグアンドドロップで操作できるツリーUIを構築します。

![サンプル](attachment/sample.gif)

使用方法
---

MagicaTree をインストールするコマンドを以下に記...
そうと思いましたが、`npm`に`publish`したら書きます。

### ライブラリ利用方法 ###

以下サンプル

```javascript
    const data = {
        value: 'root',
        children: [
            {value: 'aaa', children: [
                {value: 'bbb', children: []},
                {value: 'ccc', children: []},
            ]},
            {value: 'ddd', children: []},
            {value: 'eee', children: []}
        ]
    };

    const tree = new MagicaTree.MagicaTree(
        document.getElementById('main'),
        function cnv (e, p) {
            const ti = new MagicaTree.TreeItem(e.value, undefined, p, e);
            for (const child of e.children) {
                cnv(child, ti);
            }
        },
        data
    );

    tree.addEventListener('drop', (evt) => {
        evt.detail.item.parent.data.children = evt.detail.item.parent.data.children.filter(e => e !== evt.detail.item.data);
        evt.detail.for.data.children.push(evt.detail.item.data);
        leave();
        tree.buildTree(data);
    });
```

ドキュメント
---

### `MagicaTree` ###

#### コンストラクタ引数 ####

| パラメータ   | 型                          | 説明 |
|-------------|-----------------------------|------|
| `element`   | `HTMLElement`               | ツリー表示を格納するHTML要素 |
| `converter` | `(data, parent) => void 0;` | データからツリー表示へ変換する関数 ※後述 |
| `data`      | `Object`                    | 初期データ |

- `converter` 関数

データからツリー表示へ変換する関数を指定する必要があります。
この関数内では必ず`TreeItem`インスタンスを生成する必要があります。
(再帰的に呼び出されることを原則期待します。)

| パラメータ | 型                       | 説明 |
|-----------|--------------------------|------|
| `data`    | `Object`                 | 処理しているデータ |
| `parent`  | `MagicaTree \| TreeItem` | 自身の親`TreeItem`インスタンス(一番親のデータである場合は`MagicaTree`インスタンス) |

#### イベント ####

- イベントオブジェクト

基本的には[magic-touch](https://www.npmjs.com/package/magic-touch)のイベントオブジェクトに以下を追加。

- `item: TreeItem`: イベントが発せられたツリー要素
- `target: HTMLElement`: イベントが発せられたツリー要素の`HTMLElement`
- `for: TreeItem`: (`holdover`、`holddrop`のみ) イベントを受けた(上に乗せられた、ドロップされた先)のツリー要素

#### メソッド ####

- `buildTree (data: Object)`: ツリーを再構築します。

### `TreeItem` コンストラクタ引数 ###

| パラメータ | 型                          | 説明 |
|-----------|-----------------------------|------|
| `inner`   | `HTMLElement \| string`     | ツリーに表示する内容 |
| `opts`    | `{ directory: boolean }`    | オプション。(現時点では子要素を内包できるかのみ) |
| `parent`  | `MagicaTree \| TreeItem`    | 親ツリー要素 |
| `data`    | `Object`                    | 紐づくデータ |

他
---

- `logo.png` 背景素材はぱくたそ様より
