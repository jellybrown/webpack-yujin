# Webpack

- 이 readme는 강의 내용을 정리하기 위해 적었습니다.
- <a href="https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html" target="_blank">참고하는 블로그 보기</a>

---

<br>

## 🎈 1. 웹팩을 쓰는 이유

- js가 아닌 파일들도 모듈화를 할 수 있다. (ex: css, png)
- 웹팩을 이용하면 브라우저의 (로드)성능이 좋아진다.
- IE외 몇몇 브라우저들은 type="module"을 지원하지 않는다.

<br>

## 🎈 2. 웹팩이 로드되는 과정

- `npm i -D webpack@4 webpack-cli`

<br>

- index.html에는 결과물의 script 경로를 적어준다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="dist/main.js"></script>
    <!-- 웹팩을 빌드한 결과물의 경로는 이렇다. -->
  </head>

  <body></body>
</html>
```

<br>

- webpack.config.js 를 설정해준다.

```js
// 기본 웹팩 설정
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    // 진입 시점
    main: "./src/app.js",
  },
  output: {
    // 빌드될 결과물 위치
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
};
```

<br>

- package.json 에 명령어를 추가한다.

```json
  "scripts": {
    "build": "webpack --progress"
  },
```

<br>

- `npm run build` 후 index.html을 열어본다.

<br>

## 🎈 3. Loader

### 3-1. css-loader, style-loader

- css-loader: css파일 -> module로 변환
- style-loader: 코드를 CSSOM으로 변환

<br>

### 3-2. file-loader

- 이미지 -> module로 변환

<br>

### 3-3. url-loader

- 이미지를 Base64로 인코딩 (data:image~)
- 문자열로 이용
- option에 limit을 설정하여, 초과되는 경우 file-loader가 이용됨

<br>

## 🎈 4. Plugin

### 4-1. banner-plugin

- 결과물에 빌드 정보/커밋 정보를 추가

<br>

### 4-2. html-webpack-plugin

- html을 동적으로 활용
- ex) 개발용인지 배포용인지 확인/배포할때 html압축

<br>

### 4-2. clean-webpack-plugin

- build할때 기존에 있던 빌드폴더 날리기

<br>

### 4-3. mini-css-extract-plugin

- css파일을 분리
- 배포할 때만 이용
- 적용시, 배포할때 style-loader대신 얘가 제공하는 loader써야함

<br>

## 🎈 5. Babel

- 크로스 브라우징(브라우저의 호환성)을 위한 것
- 웹팩에 babel-loader를 적용

<br>

### 5-1. @babel/core @babel/cli

- core: 파싱
- cli: 터미널

<br>

### 5-2. babel/@preset-env

- 바벨은 호환성을 위해 플러그인을 다운받고 적용시켜야 한다.
- 그런 플러그인들이 묶여있는 것이 preset이다.

<br>

### 5-2. polyfill

- Promise는 IE에서 인식하지 못한다. (caniuse 참고)
- 또한 그냥 babel을 사용한다고해서 Promise가 다른 코드로 변경되지 않는다.
- 이를 위해 corejs나 babel-polyfill을 이용한다.
