import { useState, useEffect } from 'react';
import './App.css';
import Login from  './components/Login';
import Register from './components/Register';
import Projects from './components/Projects';
import AddProject from './components/AddProject'
import AddProjectMember from './components/AddProjectMember';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';

function App() {
  const [token, setToken] = useState(false)

  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [projectMembers, setProjectMembers] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/users')
    .then(r => r.json())
    .then(users => setUsers(users))
  }, []);

  useEffect(() => {
    fetch('http://localhost:9292/projects')
      .then(r => r.json())
      .then(projects => setProjects(projects))
  }, []);

  useEffect(() => {
    fetch('http://localhost:9292/project_members')
      .then(r => r.json())
      .then(projectMembers => setProjectMembers(projectMembers))
  }, []);

  function deleteProject(projectToDelete) {
    fetch(`http://localhost:9292/projects/${projectToDelete.id}`, {
      method: "DELETE",
    });
    setProjects(projects.filter((project) => project.id !== projectToDelete.id))
  }

  function updateProject(id, status) {
    const updatedProjects = projects.map(project => {
        if (project.id === id) {
            return { ...project, status }
        } else {
           return project 
        }
    })
    setProjects(updatedProjects)
  }

  return (
    <div>
      <Router>
        <NavBar setUser={setToken} user={token}/>
        <Routes>
          <Route path="/" element={<Login users={users} setUser={setToken} />} />
          <Route path="/login" element={<Login users={users} setUser={setToken} />} />
          <Route exact path="/register" element={<Register users={users} />} />
          <Route exact path="/projects" element={<Projects projects={projects} deleteProject={deleteProject} updateProject={updateProject}/>} />
          <Route exact path="/add_project" element={<AddProject projects={projects} />} />
          <Route exact path="/add_project_member" element={<AddProjectMember projectMembers={projectMembers} users={users} projects={projects} />} />
          <Route path="*" element={<h1>404 not found.</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
