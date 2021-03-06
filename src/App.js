import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import Footer from './Components/Footer'
import About from './Components/About'

function App() {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const fetchTasksFromServer = await fetchTasks()
            setTasks(fetchTasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json();
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json();
        return data
    }

    const addTask = async (task) => {

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])

        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
    }

    const toggleReminder = async (id) => {

        const task = await fetchTask(id)
        const taskUpdated = { ...task, reminder: !task.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(taskUpdated)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ?
            { ...task, reminder: data.reminder } : task))
    }

    return (
        <Router>
            <div className="container">
                <Header version='v1'
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAddTask={showAddTask} />

                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                />
                            ) : (
                                'No Tasks To Show'
                            )}
                        </>
                    )}
                />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
