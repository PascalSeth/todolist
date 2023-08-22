import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

	const [todolist, setTodolist] = useState(JSON.parse(localStorage.getItem('todolist')) || [])
	const [list, setList] = useState('')

	useEffect(() => {
		localStorage.setItem('todolist', JSON.stringify(todolist))
	}, [todolist])

	const addtodo = (event) => {
		event.preventDefault()
		setTodolist(val => [...val, {task: list, completed: false}])
		setList('');
	}

	const deletetodo = (name) => {
		setTodolist(val => val.filter(el => el.task !== name))
	}

	const completetodo = (name) => {
		setTodolist(todolist.map(el => {
			if(el.task === name){
				return {
					...el,
					completed: !el.completed
				}
			}
			return el
		}))
	}

	return (
		<div className="App">
			<h1>todolist</h1>
			<form onSubmit={addtodo}>
				<input 
					type='text'
					value={list}
					onChange={(event) => setList(event.target.value)}
					/>
				<button type='submit'>add todo</button>
			</form>
			<ul>
				{todolist?.map((el, ind) => {
					return <div key={ind}>
						<span>{el.task}</span>
						<button 
							onClick={(event) =>{
								event.preventDefault(); 
								deletetodo(el.task)}
							}>
							delete
						</button>
						<button 
							onClick={(event) =>{
								event.preventDefault(); 
								completetodo(el.task)}
							}>
							complete
						</button>
					</div> 
				})}
			</ul>
		</div>
	);
}

export default App;
