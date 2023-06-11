# useCallback을 이용한 함수 최적화

원래 컴포넌트가 랜더링 될 때 그 안에 있는 함수를 다시 만든다.  
하지만 똑같은 함수를 컴포넌트가 리랜더링 된다고 하여 계속 다 만드는 것은 좋은 현상이 아니다. 그리고 이렇게 컴포넌트가 리랜더링 될 때마다 함수를 계속 다 만든다고 라면, 만약 이 함수가 자식 컴포넌트에 props로 내려준다면, 함수를 포함하고 있는 컴포넌트가 리랜더링 될 때마다 자식 컴포넌트도 함수가 새롭게 만들어지므로 계속 리랜더링 하게된다.  
(즉, 부모컴포넌트 리랜더링 &rarr; 함수 재생성 &rarr; 자식 컴포넌트 리랜더링)

### React.useCallback 적용으로 문제 해결

주로 함수를 만들 때에는 최상위 컴포넌트에 만든다. 한편, 이 경우 최상위 컴포넌트가 리랜더링 될 때마다 위의 문제가 반복된다.  
이를 useCallback의 적용으로 해결할 수 있다.

<b> 사용방법 </b>
𖤐 useCallback 적용은 useCallback 안에 콜백함수와 의존성 배열을 순서대로 넣어주면 된다.

```javascript
const handleClick = useCallback(
  (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  },
  [todoData]
);
```

- 함수 내에서 참조하는 state, props가 있다면 의존성 배열에 추가해준다.
- useCallback으로 인해 todoData가 변하지 않는다면, 함수를 새로 생성하지 않는다. 새로 생성되지 않기 때문에 메모리에 새로 할당되지 않고, 동일 참조 값을 사용하게 된다.
- 의존성 배열에 아무것도 없다면 컴포넌트가 최초 랜더링 시에만 함수가 생성되고 그 이후에는 동일한 참조 값을 사용하는 함수가 된다.
