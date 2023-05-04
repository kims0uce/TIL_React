// extension : ES7+ : rfc 치면 와꾸 만들어준다. 
// 컴포넌트를 나눌 때는 정답이 없다. 재사용성이 높도록 나눠준다. 
import React from 'react'

export default function List({ todoData, setTodoData}) {
  // X버튼에 css 적용해준다. 
  const btnStyle = {
    color : "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius:"50%",
    cursor: "pointer",
    float: "right"
  };

    // 요소가 추가될 때 마다 구분선을 추가해주기 위해 
  // 함수로 만든다. 
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };


  // this.filter() 메소드를 사용하여 할일 목록을 지운다. 
  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id)
    console.log('newTodoData', newTodoData);
    // todoData를 newTodoData로 대치한다. 
    // this.setState({todoData : newTodoData})
    setTodoData(newTodoData);
  };
  
    // 완료한 할 일 가로선 긋기 
    const handelCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
          if (data.id === id) {
            data.completed = !data.completed;
          }
          return data;
    })

    // this.setState({todoData: newTodoData});
    setTodoData(newTodoData)
  }


  return (
    <div>
        {todoData.map( (data) => (
        <div style={getStyle(data.completed)} key={data.id}>
        <input type="checkbox" defaultChecked={false} onChange={() => handelCompleteChange(data.id)}/>
        {data.title}
        <button style={btnStyle} onClick={() => handleClick(data.id)}>X</button>
    </div>
    ))}
    </div>
  ); 
}
