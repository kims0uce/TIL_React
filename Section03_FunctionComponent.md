# React Hooks란 무엇인가 ? 
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