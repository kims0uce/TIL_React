// react 라이브러리에서 -> 어떠한 기능을 작성하는데 도움
// React 와 Component 클래스를 가져온다.
import React, {Component} from "react";
// App.css 적용
import "./App.css";

export default class App extends Component {
  // X버튼에 css 적용해준다. 
  btnStyle = {
    color : "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius:"50%",
    cursor: "pointer",
    float: "right"
  }

  // 요소가 추가될 때 마다 구분선을 추가해주기 위해 
  // 함수로 만든다. 
  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };
  
  // 할일 데이타를 배열에 담는다. 
  // value는 값을 보관해준다. 
  state = {
    todoData : [],
    // value의 처음 state는 빈값을 준다. 
    value: "",
  }
 

  // this.filter() 메소드를 사용하여 할일 목록을 지운다. 
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    console.log('newTodoData', newTodoData);
    // todoData를 newTodoData로 대치한다. 
    this.setState({todoData : newTodoData})
  };
  
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({value : e.target.value})
  }

  handleSubmit = (e) => {
    // 새로운 value가 들어왔을 때 페이지가 reload 되는 것을 막아준다. 
    e.preventDefault();

    // 새로운 할일 데이터 
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기 
    // setState : state를 바꿀 때 사용한다. 
    // ... : 전개연산자
    this.setState({todoData: [...this.state.todoData, newTodo], value: ""})
  }

  // 완료한 할 일 가로선 긋기 
  handelCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    this.setState({todoData: newTodoData});
  }


  // render 메소드 안에서 ui를 작성한다. 
  // 함수형 컴포넌트를 사용시에는 render 메소드가 필요없다. 
  // this.{배열명}.map() : map 메서드를 통해 데이터 나열
  /* JSX key속성
    -> 리액트에서 요소의 리스트를 나열할 때는 key를 넣어주어야 한다. 
    -> 키는 리액트가 변경, 추가 또는 제거된 항목을 식별하는데 도움이 된다. 
    -> 요소에 안정적인 ID를 부여하려면 배열 내부의 요소에 키를 제공해야 한다.  
    -> diffing 시, key를 이용해서 어떠한 부분이 바뀌었는지 인식할 수 있다. 
    key에는 유니크한 값을 넣어주고, key가 없다면 index를 키로 사용한다. 
    index를 사용하는 방법은 권장되지 않는데, 그 이유는 원소의 순서가 바뀔 때 마다 키값이 변하기 때문이다. 
  */  
  render() {
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
  
          {this.state.todoData.map( (data) => (
              <div style={this.getStyle(data.completed)} key={data.id}>
              <input type="checkbox" defaultChecked={false} onChange={() => this.handelCompleteChange(data.id)}/>
               {data.title}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>X</button>
            </div>
          ))}

          <form style={{display: 'flex'}} onSubmit={this.handleSubmit}> 
            <input 
              type="text" 
              name="value" 
              style={{flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />

            <input 
              type="submit"
              value="입력"
              className="btn"
              style={{flex: '1'}}/>
          </form>
        </div>
      </div>
    )
  }
}