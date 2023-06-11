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

### 𖤐 Memoization 이란 ?

메모이제이션은 비용이 많이 드는 함수 호출의 결과를 저장하고, 동일한 입력이 다시 발생할 때 캐시된 결과를 반환하여 컴퓨터 프로그램의 속도를 높이는데 주로 사용되는 최적화 기술이다.

```javascript
function Component({ a, b }) {
  const result = compute(a, b);
  return <div>{result}</div>;
}
```

만약 Component 내의 compute 함수가 복잡한 연산을 수행하면, 결과 값을 리턴하는데 오랜 시간이 걸리게 된다. 이때 컴포넌트가 계속 리랜더링 된다면 연산을 계속 수행하는데 오랜 시간이 소요되고, 성능에 안좋은 영향을 미칠 뿐 아니라 UI지연 현상도 발생게 된다.

이러한 현상을 해결해주기 위해 사용하는 것이 useMemo이다.  
compute 함수에 넘겨주는 a, b의 값이 이전과 동일하다면 컴포넌트가 리랜더링 되더라도 연산을 다시 하지 않고, 이전 랜더링 때 저장해두었던 값을 재활용한다.

<b> 사용방법 </b>

```javascript
function Component({a, b} {
  const result = useMemo(() => compute(a, b), [a ,b]);
  return <div>{result}</div>
})
```
