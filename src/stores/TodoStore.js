import {action, autorun, computed, makeObservable, observable} from 'mobx'
class Todo {
    id = 0
    name = ""
    completed = false
    isImportant = false

    constructor(id, name, completed = false, isImportant = false) {
        makeObservable(this, {
            id : observable,
            name : observable,
            completed : observable,
            isImportant : observable,
            markImportant : action,
            markCompleted : action
        })
        this.name = name
        this.id = id
        this.completed = completed
        this.isImportant = isImportant
    }
    markCompleted(){
        this.completed = !this.completed
    }
    markImportant(){
        this.isImportant = !this.isImportant
    }
}

class TodoStore {
    todos = []
    constructor(){
        makeObservable(this, {
            todos : observable,
            todoCounts : computed,
            addTodo : action,
            getTodos : action,
            deleteTodo : action
        })
        
    }
    get todoCounts(){
        let countObj = {}
        countObj.total= this.todos && this.todos.length || 0
        countObj.remTodos = countObj.total && this.todos.filter((t)=>{return !t.completed}).length || 0
        countObj.impTodos = countObj.total && this.todos.filter((t)=>{return t.isImportant}).length || 0
        return countObj
    }

    getTodos(){
        let totosData = localStorage.getItem('todos')
        if(totosData){
            for(let todo of JSON.parse(totosData)){
                this.todos.push(new Todo(todo.id, todo.name, todo.completed, todo.isImportant))
            }
        }
    }

    addTodo(todoText){
        let newId = 1
        if(this.todos && this.todos.length){
            newId = this.todos[this.todos.length - 1].id + 1
        }
        let todo = new Todo(newId, todoText)

        this.todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    deleteTodo(todo){
        this.todos = this.todos.filter((t)=> t != todo)
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }
}

let store = window.store = new TodoStore();

autorun(()=>{
    console.log("Active total Todos are :"+ store.todoCounts.total)
})

export default store;