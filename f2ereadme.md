# Front-End Develop Guidline

<!-- How to use Modern Web Tech in traditional PHP Codeigniter project. -->

## Frontend development setup

* 需安裝 Node JS 和 NPM 
* Node 至少 v10.15.0 或以上, NPM 至少 v6.4.1 或以上
* **node_modules** 資料夾需要 git ignore。
* **Git** 只追蹤 **package.json** 和 **package-lock.json**

## Install
```
npm ci //按照 package-lock.json 的套件清單安裝套件
```
```
npm install //重新安裝套件(會導致套件升級)
```

### 開發中 Compiles and hot-reloads for development

```
npm run dev   //注意：dev環境底下只會產生該頁 js 檔案較龐大，不可讓 dev 產生的 js 檔案更新至正式環境
```

### 上線前 Compiles and minifies for production
```
npm run build //注意：上線前務必跑這段，才會產生有分割過的 js　檔案
```

## Folder Structure

```
├── application
|   ├── controllers
|   ├── models
|   └── views 
|        ├── market       //行銷官網
|        └── ...others    //其他頁面，用 Vue 開發的頁面會對應到 client/src/pages 底下資料夾
|
├── client 
|   ├── src
|   |    ├── api
|   |    ├── components
|   |    ├── pages
|   |    |    ├── page1
|   |    |    |   ├── index.js
|   |    |    |   └── pageName1.vue
|   |    |    └── page2
|   |    |    |   ├── index.js
|   |    |    |   └── pageName2.vue
|   |    |    └── ...otherPage
|   |    |    
|   |    └── ...others
|   ├── node_modules
|   ├── package-lock.json
|   └── package.json
|
├── htdocs
|   ├── client    //上層client編譯過後的檔案會存放至此
|   ├── css
|   ├── js 
|   ├── market    //行銷官網相關的 dist 檔案
|   └── ...others
|
└── ...others

```
|資料夾 / 檔案|內容|位置
|:---|:---|:---|
|**client**|所有前端vue開發的相關檔案|與application同層的|
|node_modules|<code>npm i MODULE_NAME</code> 下載安裝後的檔案存放處|
|package.json  package-lock.json |記錄此專案有安裝過的 Node Modules，記錄工具執行語法。|在client底下|
|src|欲編譯原始檔資料夾|
|pages|前端使用 Vue 開發的每一頁的頁面，每一個資料夾代表一頁，每個資料夾底下必須包含 **index.js**，是該頁編譯的進入點|
|**htdocs**|公開讀取的檔案 (css、js、images)|與application同層的|
|client|vue所開發的前端檔案編譯後的位置，存放**經過編譯**的 css、js 原始檔|在htdocs底下|


## Coding Style

####Eslint

Install eslint, using **airbnb** style guide.

[VScode - eslint](https://wcc723.github.io/tool/2017/11/09/coding-style/)

[Sublime - eslint](https://keelii.com/2017/04/29/sublime-text-3-configure-eslint/)

#### Install Node module

```
npm i MODULE_NAME --save-d
```

## Version

1.0.0 (Ellen Chiu)

## Acknowledgments

* Webpack
* Javascript ES6
* Node JS
* Sass
* Vuetify


