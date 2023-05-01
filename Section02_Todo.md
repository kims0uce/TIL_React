# 2-1. Create React App으로 실행된 리액트의 기본 구조 살펴보기 
### Create React App 폴더와 파일 기본 구조
`npx create-react-app` 으로 설치 시 다음과 같은 폴더와 파일이 생성된다.    
```
├── node_modules/
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html   𖤐 페이지 템플릿
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js   𖤐 자바스크립트 시작점
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
```   
이때, `public/index.html`과 `src/index.js` 파일의 이름을 변경해서는 안된다. 

### (1) public 폴더
여기에 쓰인 파일들은 오직 `public/index.html`만 쓰일 수 있다. 

### (2) src 폴더 
대부분의 리액트 소스 코드들은 이곳에 작성하면 된다.    
이곳에 JS 파일과 CSS 파일들을 넣으면 된다.    

webpack은 이곳에 있는 파일만 보기 때문에, 해당 폴더 이외에 넣는 것은 webpack에 의해서 처리되지 않는다. 

### (3) Package.json 파일 
해당 프로젝트(프로젝트 이름, 버전, 필요한 라이브러리와 라이브러리의 버전 등)에 대한 정보들이 들어있다. 
 
앱을 시작할 때 사용할 스크립트, 앱을 빌드할 때, 테스트할 때 사용할 스크립트 등이 명시되어 있다.

`dependencies` : 필요한 라이브러리와 라이브러리의 버전들이 명시되어 있다.   
`scripts` : 리액트 앱 실행, 빌드, 테스트 등의 스크립트가 명시되어 있다. 프로젝트에서 자주 실행해야 하는 명령어를 scripts로 작성해두면 npm 명렁어로 실행가능하다.   
`eslintConfig` : 소스 코드를 입력할 때 문법이나 코드 포맷을 체크해주는 것에 대한 설정을 명시해준다. 
<br><br>

# 2-2. React App 실행해보기 
`npm run start` 명령어로 리액트 앱을 시작할 수 있다.    
&rarr; 위 명령어로 리액트를 실행 가능한 이유는 package.json의 scripts 영역에 명시를 해주었기 때문이다. 

`npm run build` 명령어는 build라는 폴더를 생성하고 webpack을 통해 압축된 파일들을 저장하여, 운영환경에서 사용될 수 있도록 한다. 

`npm run test` 명령어는 작성한 테스트케이스를 바탕으로 리액트 앱을 테스트할 수 있도록 한다. 
<br><br>

# 2-3. SPA(Single Page Application)란?
현재 App.js 파일의 소스코드를 변경하면 변경한 부분이 화면에 적용된다.    
이는 다음과 같은 순서로 실행된다. 

<b> 1. public/index.html </b>
```html
<div id="root"></div>
```

<b> 2. src/index.js </b>
자바스크립트의 시작점이다. 여기서 위에 root id를 가진 div 앨리먼트를 잡아준다. 이를 통해 해당 앨리먼트 안에서 화면을 꾸밀 수 있게 해준다.    
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

𖤐 그렇다면, index.html 템플릿으로 한 개의 페이지를 만들 때는 괜찮지만 두 개 이상의 페이지를 만들 때는 어떤 식으로 해야할까?   
- 이전에는 필요한 페이지 만큼 html을 각각 생성해서 만들었다.   
a 페이지 만들기 위해 a.html, b 페이지 만들기 위해 b.html ...
&rarr; 이와 같은 방식은 전통적인 웹 사이트를 만들 때 사용하는 `Multi Page Application` 이다. 

- 요즈음은 웹 사이트의 전체 페이지를 하나의 페이지에 담아 동적으로 화면을 바꿔가며 표현한다. 이를 <b>`SPA`</b> 라고 한다. 

### SPA 에서의 화면 변경 
index.html 뿐인 SPA 에서는 HTML5의 <b>`History API`</b> 를 통해 페이지 전환(브라우징)을 한다.   
즉, 자바스크립트 영역에서 History API를 이용하여 현재 페이지 내에서 화면 이동이 일어난 것처럼 작동하게 해주는 것이다.     
&rarr; React-Router-Dom 라이브러리를 통해 사용한다. 

### History API
`History.back()` : 세션 기록의 바로 뒤 페이지로 이동하는 비동기 메서드. 브라우저의 뒤로가기를 누르는 것과 같은 효과를 낸다. 

`History.forward()` : 세션 기록의 바로 앞 페이지로 이동하는 비동기 메서드. 브라우저의 앞으로 가기를 누르는 것과 같은 효과를 낸다. 

`History.go()` : 특정한 세션 기록으로 이동하게 해주는 비동기 메서드. 1을 넣어 호출하면 바로 앞 페이지로, -1을 넣어 호출하면 바로 뒤 페이지로 이동한다. 

`History.pushState()` : 주어진 데이터를 세션 기록 스택에 넣는다. 직렬화 가능한 모든 Javascript 객체를 저장하는 것이 가능하다. 

`History.replaceState()` : 최근 세션 기록 스택의 내용을 주어진 데이터로 교체한다. 
<br><br>

# 2-4. 할 일 목록 애플리케이션 살펴보기 
### JSX(Javascript syntax extension)
JSX는 자바스크립트의 확장 문법이다. 리액트에서는 이 JSX를 이용하여 화면에서 UI가 보이는 모습을 나타내준다. 

𖤐 JSX를 이용하면 UI를 나타낼 때 자바스크립트(logic)과 HTML구조(markup)를 같이 사용할 수 있기 때문에 기본 UI에 데이터가 변하는 것들이나 이벤트들이 처리되는 부분을 더욱 쉽게 구현할 수 있다. 

<b> 원래 리액트에서 화면을 그리는 방식 </b>
React.createElement API 를 사용해서 앨리먼트를 생성한 후 (객체가 됨) 이 앨리먼트를 In-Memory에 저장한다.   
그리고 ReactDOM.render 함수를 사용해서 실제 웹 브라우저에 그려준다. 

```js
// React.createElement
const myelement = React.createElement('h1', {}, 'I do not use JSX');

// ReactDOM.render
ReactDOM.render(myelement, document.getElementById('root'));
``` 

<b> JSX는 createElement를 쉽게 사용하기 위해 사용한다. </b>   
&rarr; 모든 UI를 만들때 마다 createElement를 사용해서 컴포넌트를 만들 수는 없다. 때문에 JSX를 사용한 후 그것을 babel이 다시 createElement로 바꿔서 사용한다. 

