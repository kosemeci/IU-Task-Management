import { useState } from "react";
import '../../css/admin.css';
import axios from "axios";
import AlertMessage from "../AlertMessage";

function ProjectForm() {
    const [project, setProject] = useState({
        name: "",
        description: ""
    });
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("secondary")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/project-management/project/create', {
                "projectName": project.name,
                "description": project.description
            }, {
                withCredentials: true,
                timeout: 25000
            })
            setAlertMessage("New Project created successfully.");
            setAlertType("success");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);

        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
            setAlertType("error");
            setAlertMessage("An error occured while creating the project.")
        }
        setProject({ name: "", description: "" });
    };

    return (
        <div className="form-container">
            <h2 className="form-title"> Create New Project</h2>
            <AlertMessage message={alertMessage} onClose={() => setAlertMessage("")} severity={alertType} />
            <form onSubmit={handleSubmit} className="project-form">

                <div className="form-group">
                    <label className="form-label">Project Name:</label>
                    <input
                        type="text"
                        placeholder="e.g., Web Application Development"
                        value={project.name}
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        placeholder="Enter project details..."
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value })}
                        className="form-input textarea"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">
                    Save
                </button>

            </form>
        </div>
    );
}

export default ProjectForm;