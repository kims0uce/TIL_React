# 3-1. React Hooks란 무엇인가 ? 
class 없이 state를 사용할 수 있는 새로운 기능이다. 

### 𖤐 React Hooks가 필요한 이유
주로 class Component로 사용되어온 리액트에서 느껴왔던 불편함이나 문제점들을 해결하기 위해서 개발되었다.   

원래 React는 class Component를 사용하여 React Hooks는 functional Component를 사용한다.    
|Class Component|Functional Component|
|---|---|
|더 많은 기능 제공|더 적은 기능 제공|
|더 긴 코드 양|짧은 코드 양|
|더 복잡한 코드|더 심플한 코드|
|더딘 성능|더 빠른 성능|   
<br>

```js
// Class Component
import React, {component} from 'react'

export default class Hello extends Component{
    render() {
        return (
            <div>
                Hello React !!
            </div>
        )
    }
}
```

```js
// Functional Component
import React from 'react'

export default function Hello() {
    return (
        <div>
            Hello React !! 
        </div>
    )
}
```

&rarr; React Hooks로 인해 함수형 컴포넌트에서도 생명주기를 사용할 수 있게 되었다. 즉, 데이터를 가져오거나 컴포넌트를 시작하자마자 API도 호출하는 등 많은 부분을 할 수 있게 된 것이다. 

```js
// Class Component
import React, { Component } from 'react'
import Axios from 'axios'

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = (name: "");
    }

    componentDidMount() {
        Axios.get('/api/user/name')
        .then(response => {
            // state값 업데이트 
            this.setState({name.respose.data.name})
        })
    }
    render() {
        return (
            <div> 
            My name is {this.state.name}
            </div>
        )
    }

}
```

```js
// Functional Component
import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function Hello() {
    // Name에 대한 초기 state값을 useState("여기") 에 넣어준다. 
    // setName이 setter 역할을 한다. 
    const [Name, setName] = useState("")

    useEffect(() => {
        Axios.get('api/user/name')
        .then(response => {
            // Name의 state를 업데이트 한다. 
            setName(response.data.name)
        })
    }, []) 

    return (
        <div>
            My name is (Name)
        </div>
    )
}
```

&rarr; Class Component 에서는 생명주기를 이용할 때 componentDidMount / componentDidUpdate / componentWillUnmount 이렇게 다르게 처리를 해주지만,     
React Hooks를 사용할 때는 **`useEffect`** 안에서 생명주기를 다 처리를 해줄 수 있기 때문에 코드가 간결해진다. 


```js 
componentDidMount() {
    this.updateLists(this.props.id)
}
componentDidUpdate() {
    if (prevProps.id !== this.props.id) {
        this.updateLists(this.props.id)
    }
}

updateLists = (id) => {
    fetchLists(id)
        .then((lists) => this.setState({
            lists
        }))
}
```

```js
useEffect(() => {
    // fetchLists 메서드를 통해 리스트를 가져온다.
    fetchLists(id)
        // id가 바뀌었을 때 아래 부분을 한번 더 실행해준다. 
        .then((repos) => {
            setRepos(repos)
        })
}, [id])
```

&rarr; HOC 컴포넌트를 Custom React Hooks로 대체하여 너무나 많은 wrapper 컴포넌트를 줄일 수 있다.      
- `HOC(Higher Order Component) 란 ? `
화면에서 재사용 가능한 로직만을 분리하여 component로 만들고, 재사용 불가능한 UI와 같은 다른 부분들은 parameter로 받아서 처리하는 방법이다.    
즉, 컴포넌트를 인자로 받아서 새로운 리액트 컴포넌트를 리턴하는 함수이다. 


```js 
function usersHOC(component) {
    return class usersHOC extends React.Component {
        state = {
            users: []
        }

        componentDidMount() {
            fetchUsers()
                .then(users => {
                    this.setstate({users})
                })
        }
    
    function Apage ({users}) {
        // code here
    }
    export default usersHOC(Apage)

    function Bpage ({users}) {
        // code here
    }
    export default usersHOC(Bpage)
    }
}
```

```js 
// useAuth : custom Hooks
// 원하는대로 리액트 훅을 만들 수 있다.
function useAuth() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetchUsers로 유저 정보를 가지고 온 다음 
        fetchUsers().then(users => {
            setUsers(users);
        });
    }, []);

    // return 으로 유저 정보를 내보내준다. 
    return [users];
}

function Apage() {
    // useAuth 라는 메서드로 유저 정보를 가져와서 
    // users 라는 객체에 담아 바로 사용할 수 있다. 
    const [users] = useAuth();

    return (
        <div>
            A 페이지 
            {users.map(({ name, url }) => (
                <div key={name}>
                    <p>{name}, {url}</p >
                </div>
            ))}

        </div>
    )
}
```

# 3-2. State와 Props 
|State|Props|
|---|---|
|부모 컴포넌트에서 자녀 컴포넌트로 데이터를 보내는게 아닌, 해당 컴포넌트 내부에서 데이터를 전달할 때|(Properties의 줄임말)상속하는 부모 컴포넌트로부터 자녀 컴포넌트에 데이터들을 전달하는 방법|
|검색창에 글을 입력할 때 글이 변하는 것 구현 시 ||
|mutable|immutable(읽기전용, 자녀 컴포넌트에서는 바뀌지 않음)|
|state가 변하면 re-render됨||

```js
// State 
A컴포넌트 
state = {a : "a"}

this.state.a // useage
```

```js
// Props 
A부모컴포넌트 
state = {a : "a"}

<B컴포넌트 aProps={this.state.a} />    // 넘겨주기 
this.props.aProps   // usage 

```

# 3-3. 구조 분해 할당(Destructuring)
배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 js 표현식이다.   
&rarr; clean code를 위함이다.      

```js
function buildAnimal(animalData) {
    let accessory = animalData.accessory,
        animal = animalData.animal,
        color = animalData.color,
        hairType = animalData.hairType;
}
```

```js
function buildAnimal(animalData) {
    let {accessory, animal, color, hairType} = animalData;
}
```

### 깊게 들어간 객체 구조 분해 할당 
```js
let person = {
    name: 'Soy',
    age: 28,
    phone: 02,
    address: {
        zipcode: 1234,
        street: 'sunny',
        number: 42
    }
}

let {address : {zipcode, street, number}} = person;
console.log(zipcode, street, number);   // 1234, sunny, 42
```

### 배열 구조 분해 할당 
```js 
let a, b, rest;
[a, b] = [10, 20];

console.log(a); // 10  
console.log(b); // 20

// 구조분해할당 
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);
```

```js
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const day1 = week[0];
const day2 = week[1];
const day3 = week[2];
const day4 = week[3];
const day5 = week[4];

// 구조분해할당 
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const [day1, day2, day3, day4, day5] = week;
```

```js
const numbers = [1, 2, 3, 4, 5, 6];
const [,,three,,five] = numbers;    // 1, 2, 4 생략하여 할당
                                    // three = 3, five = 5 로 할당됨
```

### 객체 구조분해 할당 
```js
const studentDetails = {
    firstname: 'John',
    lastName: 'Mary'
}

// firstName에 값이 없다면 not given이 출력된다.
const {firstName: fName = 'not given', lastName} = studentDetails;

// firstName이라고 안하고 fname이라고 해도 값이 정상적으로 불러와짐
console.log(fname);
console.log(lastName);
```

```js
var people = [
    {
        name: "Mike Smith",
        family: {
            mother: "Jane Smith",
            father: "Harry Smith",
            sister: "Anne Smith"
        },
        age: 35
    },
    {
        name: "Tom Riddle",
        family: {
            mother: "Norah Riddle",
            father: "Richard Riddle",
            brother: "Howard Riddle"
        },
        age: 24
    }
];

for (var {name: n, family: {father: f}} of people) {
    console.log(`Name: ${n}, Father: ${f}`);
}
// Name: Mike Smith, Father: Harry Smith
// Name: Tom Riddle, Father: Richard Riddle
```