import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'

function App() {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        const getTasks = async () => {
            const fetchTasksFromServer = await fetchTasks()
            setTasks(fetchTasksFromServer)
        }
        getTasks()
    },[])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json();
        return data
    }

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        console.log('Toggle', id)
        setTasks(tasks.map((task) => task.id === id ? {
            ...task, reminder: !task.reminder
        } : task))
    }

    return (
        <div className="container">
            <Header version='v1'
                onAdd={() => setShowAddTask(!showAddTask)}
                showAddTask={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} /> : 'No Tasks'
            }
        </div>
    );
}

export default App;
