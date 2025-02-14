# Orelop Astro


## 概要

Orelop Astro は、俺流のAstro開発環境です。

」を利用しているため、高速にAstroを開発することが可能です。

- AstroによるHTML + CSS（Scss/Sass） + JavaScript（TypeScript）による開発が可能
- CSSファイルにおいてもファイル分割やスタイルのネスト（入れ子）が可能
- CSSファイル内でカスタムメディアクエリや、`fluid()`が利用可能


## 準備

Orelop Astro を利用するには、あらかじめ以下のツールをマシンにインストールしておいて下さい。

- [Node.js](https://nodejs.org/ja) >=20
- [git](https://git-scm.com/)


## インストール

1. ターミナルを開き、「Orelop Astro」を初期化したいディレクトリに移動します。

```bash
cd /path/to/project-directory
```

2. 以下のコマンドを実行して、「Orelop Astro」をインストールします。


■ npm
```bash
npm create orelop@latest --template=astro
```

■ yarn
```bash
yarn create orelop@latest --template=astro
```

■ pnpm
```bash
pnpm create orelop@latest --template=astro
```
プロジェクト名を聞かれるのでプロジェクト名を入力してエンターしてください。
その後、「使用するフレームワーク」の選択から「Astro」を選択することで「Orelop Astro」がインストールされます。

その他、CSSやJavaScriptのライブラリなどは任意で選択してください。

## 開発用サーバーの起動

以下のコマンドで開発用サーバーを起動できます。

■ npm
```
npm run dev
```

■ yarn

```
yarn dev
```

■ pnpm

```
pnpm dev
```

## HTML の開発

HTML ファイルは「src」ディレクトリに配置して下さい。

### Public ディレクトリ内のアセット

「Public」ディレクトリ内に保存したファイルは、ビルド後に納品用テーマディレクトリとして「dist」ディレクトリにコピーされます。

## CSS/SCSS の開発

「Orelop Static」は、CSS、SCSS のどちらの開発にも対応しています。

CSS で開発するには「src/styles/」ディレクトリ内にある「global.css」を利用し、
SASS で開発する場合は、「global.css」を「global.scss」に変更してください。

（ `layouts/Layout.astro`ファイルの `import "@styles/global.css";`も `scss` に変更してください。）


### ベースCSS
「global.css」にはデフォルトで以下の記述により俺流のベーススタイルのCSSを読みこんでいます。

```css
@import "vaultcss";
```

これにより、俺流のリセットや便利なカスタムプロパティなどが利用できます。

不必要な場合は削除してください。
また、resetのみ利用したい場合には、以下のように resetスタイルのみ読み込むことも可能です。

```css
@import "vaultcss/reset";
```


### ネスティングルール
「Orelop Static」は、「[CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)」に対応しているため、スタイルルールのネスト（入れ子）が利用できます。

例

```css
.hero__figure {
  height: 100vh;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

### カスタムメディアクエリ
カスタムメディアクエリを使うことも可能です。

デフォルトでは、以下のカスタムメディアクエリが自動で登録されます。


```css
@custom-media --xxs (width >= 23.4375rem);
@custom-media --xs (width >= 25rem);
@custom-media --sm (width >= 36rem);
@custom-media --md (width >= 48rem);
@custom-media --lg (width >= 64rem);
@custom-media --xl (width >= 80rem);
@custom-media --xxl (width >= 96rem);
```


従って、以下のように少ない記述量でレスポンシブ対応が可能です。


```css
.section {
  display: block grid;
  grid-template-columns: repeat(var(--cols, 1), minmax(0, 1fr));

  @media (--md) {
    --cols: 2;
  }

  @media (--lg) {
    --cols: 3;
  }
}
```


### @import

`@import` による、CSS ファイルの分割にも対応しています。

例：「base」ディレクトリ内の「oreset.css」と「components」ディレクトリ内の「hero.css」の読み込み

```css
@import "base/oreset.css";
@import "components/hero.css";
```



SASSの場合は、glob パターンによる読み込みにも対応しています。

例：「fondation」ディレクトリと「layout」ディレクトリ内にあるすべての.scss ファイルの読み込み

```scss
@use "foundation/**/*.scss";
@use "layout/**/*.scss";
```

### オリジナル関数
CSSファイル内では、下記のオリジナル関数が利用可能です。

- `fluid()` : 最小値、最大値から `clamp()` を生成

```css
p {
  /*
    fluid(最小値, 最大値, [最小ビューポート(px)], [最大ビューポート(px)])
    最小ビューポートの初期値： 320
    最大ビューポートの初期値： 1920
  */
  font-size: fluid(16px 24px); /* clamp(1rem, 0.8786407766990291rem + 0.517799352750809vw, 1.5rem) */
}
```

最小値と最大値には `px` または `rem` が使えます。


最小ビューポートや、 最大ビューポートの初期値を変更する場合は、`astro.config.ts` で、`vaultcss(),` のオプションを指定します。

```ts
export default defineConfig({
  ...
  vite: {
    plugins: [
      vaultcss({
        fluid: {
          minViewPort: 375, // 最小ビューポートの初期値を 375 に変更
          maxViewPort: 1440, // 最大ビューポートの初期値を 1440 に変更
          baseFontSize: 16, // ベースのフォントサイズ（規定値: 16）
        }
      }),
    ],
  },
  ...
})
```



## 納品データの準備

以下のコマンドを実行すると、「dist」ディレクトリが作成され、納品用のテーマファイルが生成されます。

■ npm

```
npm run build
```

■ yarn
```
yarn build
```


## 納品データのプレビュー

以下のコマンドを実行すると、「dist」ディレクトリをテーマフォルダとして、サーバーが立ち上がります。

■ npm

```
npm run preview
```

■ yarn

```
yarn preview
```


■ pnpm

```
pnpm preview
```
