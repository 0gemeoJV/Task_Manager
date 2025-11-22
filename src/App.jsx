// App.jsx
import React, { useState } from 'react'; 
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css'; 
import './components/styles/responsive.css';

function App() {
  const exampleMembers = [
    { name: 'Member 1', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Member 2', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Member 3', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  const [tasks, setTasks] = useState([
    {
      id: 101, 
      title: "Design homepage",
      description: "Create a design for the homepage",
      members: exampleMembers,
      status: "In Progress"
    }
  ]);

  const handleAddTask = (title, description) => {

    const newTask = {
      id: Date.now(), 
      title: title,
      description: description,
      members: [], 
      status: "To Do" 
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const handleAddMemberToTask = (taskId, memberName) => {

    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newMember = { 
            name: memberName, 
            avatar: '' 
          }; 
          
          return {
            ...task,
            members: [...task.members, newMember] 
          };
        }
        return task;
      })
    );
  };
  
  const handleStatusChange = (taskId, newStatus) => {
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus 
          };
        }
        return task;
      })
    );
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    console.log(`Tarefa com ID ${taskId} excluída.`);
  };

  const handleTaskEdit = (taskId, newTitle, newDescription) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            title: newTitle, 
            description: newDescription 
          };
        }
        return task;
      })
    );
  };

  
  return (
    <div className="task-manager-app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-main">
        
        {tasks.map(task => (
          <Tasks
            key={task.id}
            taskId={task.id} 
            onAddMember={handleAddMemberToTask} 
            onStatusChange={handleStatusChange} 
            onDeleteTask={handleDeleteTask} 
          
            onTaskEdit={handleTaskEdit}
            
            title={task.title}
            description={task.description}
            members={task.members}
            status={task.status}
          />
        ))}

        <AddTask onAddTask={handleAddTask} />
      </main>
    </div>
  );
}

export default App;