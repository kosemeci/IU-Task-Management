import { useState } from "react";
import '../../css/admin.css';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import { getAllProject } from "../Api/projects";
import { useEffect } from "react";


function TaskForm() {
    const [task, setTask] = useState({
        taskTitle: "",
        priority: "LOW",
        description: "",
        deadline: "",
        project: "",
    });
    const [project, setProject] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(task);
        try {
            const response = await axios.post('http://localhost:8080/task-management/task/create', {
                "taskTitle": task.taskTitle,
                "priority": task.priority,
                "description": task.description,
                "deadline": task.deadline,
                "projectId": task.project
            }, {
                withCredentials: true,
                timeout: 3000,
            })
            // console.log(response.data)
            setTask({ taskTitle: "", priority: "LOW", description: "", deadline: "", project: "" });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getProjectList = async () => {
            try {
                const response = await getAllProject();
                const filteredProject = response.map((data) => ({
                    "id": data.id,
                    "title": data.projectName
                })).sort((a, b) => a.id - b.id);
                setProject(filteredProject);
            } catch (error) {
                console.log(error);
            }
        }
        getProjectList();

    }, [])

    return (
        <div className="form-container">
            <h2 className="form-title"> Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">

                <div className="form-group">
                    <label className="form-label">Task Title:</label>
                    <input
                        type="text"
                        placeholder="e.g., Develop Web API"
                        value={task.taskTitle}
                        onChange={(e) => setTask({ ...task, taskTitle: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Priority:</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        className="form-input"
                        required
                    >
                        <option value="LOW" >LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        placeholder="Enter task details..."
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="form-input textarea"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">Deadline:</label>
                    <input
                        type="date"
                        value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Project:</label>
                    <select
                        value={task.project}
                        onChange={(e) => setTask({ ...task, project: e.target.value })}
                        className="form-input"
                        required
                    >
                        <option disabled value={""}> Please Select a Project</option>
                        {project && project.map((pr) => (
                            <option key={pr.title} value={pr.id} >{pr.id} - {pr.title}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Save
                </button>
            </form>
        </div>
    );
}

export default TaskForm;