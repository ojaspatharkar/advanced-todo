import React, { useContext } from 'react'
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import StoreContext from './StoreContext';

function App(props) {
  let [newTodo, setNewTodo] = useState("")
  let [TodoStore, PostsStore] = useContext(StoreContext);

  useEffect(() => {
    TodoStore.getTodos();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (newTodo && newTodo.length) {
              TodoStore.addTodo(newTodo);
              setNewTodo('')
            }
          }}>
            <div>You have {TodoStore.todoCounts.remTodos + '/' + TodoStore.todoCounts.total} things to dos and {TodoStore.todoCounts.impTodos} are importants</div>
            <input value={newTodo} onChange={(e) => { setNewTodo(e.target.value) }} />
            <button>Add Todo</button>
          </form>
          <ul style={{ listStyle: 'none', alignItems: 'flex-start', justifyContent: 'left' }}>
            {
              TodoStore.todos.map((todo) => {
                return (
                  <React.Fragment key={todo.id}>
                    <li key={todo.id} className={'list-items'}
                      style={todo.completed ? { textDecoration: 'line-through' } : null}
                      onClick={() => { todo.markCompleted() }}
                    >
                      <input type='checkbox' style={{ height: '20px', width: "20px", margin: '10px' }} onClick={(e) => { e.stopPropagation(); todo.markImportant() }} />
                      {todo.name}
                      <button style={{ float: 'right' }} onClick={() => { TodoStore.deleteTodo(todo) }}>Delete</button>
                    </li>

                  </React.Fragment>
                )
              })
            }
          </ul>
          <ul>
            {
              PostsStore.posts.map((post)=>{
                return(
                <li key={post.id} onClick={()=>{PostsStore.deletePost(post.id)}}>{post.title}</li>
                )
              })
            }
          </ul>
        </div>
      </header>
    </div>
  );
}

export default observer(App);
