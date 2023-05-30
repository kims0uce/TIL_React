# React.memo를 이용한 컴포넌트 랜더링 최적화

### exercise: 현재 Todo 앱 최적화하기

현재 Todo 앱을 App, Lists, List, Form 으로 나눈 이유는 재사용성 뿐 만 아니라 각 컴포넌트의 랜더링 최적화를 위함이기도 하다.

Form에서 글을 타이핑할 때 원래는 Form 컴포넌트와 그 State 값을 가지고 있는 App 컴포넌트만 랜더링이 되어야 하는데, 현재는 그렇지 않다.

```js
// 모든 컴포넌트에 clg 찍어봄...
console.log("${page} is rendering...");
```

즉, 한 글자 입력 시마다 랜더링 되지 않아도 되는 Lists, List 컴포넌트가 다시 랜더링 되고 있다.  
(이 둘은 props가 바뀔 때 만 랜더링 해주면 됨)

React.memo로 List와 Lists 컴포넌트를 래핑하여 불필요한 랜더링을 방지할 수 있다.

```js
const List = React.memo(({ todoData, setTodoDate }) => {
  console.log("Lists is Rendering...");
});
```

---

### 𖤐 React.memo( ) 란 ?

React가 제공하는 고차 컴포넌트(Higher Order Component)로, 랜더링 결과를 메모이징(Memoizing)하여 불필요한 리랜더링(props가 변경되지 않았을 경우)을 하지 않는다.

React는 먼저 컴포넌트를 랜더링한 뒤, 이전 랜더된 결과와 비교하여 DOM 업데이트를 결정한다. 만약 렌더 결과가 이전과 다르면 React는 DOM을 업데이트 한다.

이 메서드는 오직 성능 최적화를 위하여 사용된다, 랜더링을 "방지"하기 위해 사용 시, side-effect를 발생시킬 수 있다.
