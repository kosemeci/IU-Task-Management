import { useState } from "react";
import '../../css/admin.css';

function ProjectForm() {
    const [project, setProject] = useState({
        name: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Project:", project);
        setProject({ name: "", description: "" });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">📌 Create New Project</h2>
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