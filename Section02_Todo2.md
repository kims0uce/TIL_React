# React State 란 ?
리액트에서 데이터가 변할 때 화면을 다시 랜더링 해주기 위해서는 'React State'를 사용해야 한다. 

<b> React state 란, </b> 컴포넌트의 랜더링 결과물에 영향을 주는 데이터를 갖고있는 객체이다.    
-> state가 변경되면 컴포넌트는 re-randering 된다.    
-> state는 컴포넌트 안에서 관리된다.  
<br><br>

# 전개연산자(Spread Operator) 란?
전개 연산자는 ECMAScript6(2015)에서 새롭게 추가되었으며, 특정 객체 또는 배열의 값을 다른 객체, 배열로 복제하거나 옮길 때 사용한다.    
연산은 `...` 이렇게 표현한다.   
### (1) 배열 조합   
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
const arrWrap = [...arr1, ...arr2, ...arr3];

console.log(arrWrap) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```   
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
arr1.push(...arr2);

console.log(arr1); // [1, 2, 3, 4, 5]
```   
### (2) 객체 조합    
```js
// cf) 객체 자체가 들어간다. 
const obj1 = {
    a: 'A',
    b: 'B'
};
const obj2 = {
    c: 'C',
    d: 'D'
};
const objWrap = {obj1, obj2};
console.log(objWrap);

/* output
{
obj1: {
    a: 'A',
    b: 'B'
 },
 obj2: {
    c: 'C',
    d: 'D'
 }
}
 * /
```   
```js
// 객체 자체가 아닌 각각의 값이 들어간다. 
const obj1 = {
    a: 'A',
    b: 'B'
};
const obj2 = {
    c: 'C',
    d: 'D'
};
const objWrap = {...obj1, ...obj2};
console.log(objWrap);
/* output
{a: 'A', b: 'B', c: 'C', d: 'D'}
*/
```   
### (3) 기존 배열을 보존    
```js
// cf) 원본 배열까지 역순으로 변경된다. 
const arr1 = [1, 2, 3];
const arr2 = arr1.reverse();

console.log(arr1);  // [3, 2, 1]
console.log(arr2); // [3, 2, 1]
```   
```js
// 원본 배열은 유지한다. 
const arr1 = [1, 2, 3];
const arr2 = [...arr1].reverse();

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [3, 2, 1]
```
