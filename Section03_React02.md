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