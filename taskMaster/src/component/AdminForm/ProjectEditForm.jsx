import { getAllProject } from "../Api/projects";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import "../../css/admin.css";

const ProjectEditForm = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            const projectList = response.map((res) => ({
                id: res.id,
                name: res.projectName,
                description: res.description,
                progress: res.completionPercentage,
                createdDate: res.createdDate,
                taskCount: res.task.length,
            }));
            setProjects(projectList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Project ID:", selectedProject);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Update Project</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <FormControl fullWidth>
                    <InputLabel>Select Project</InputLabel>
                    <Select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        required
                    >
                        <MenuItem disabled value="">Please Select a Project</MenuItem>
                        {projects.map((proj, index) => (
                            <MenuItem key={proj.id} value={proj.id}>
                                {index + 1} - {proj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Project Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={projects.find(p => p.id === selectedProject)?.description || ""}
                    disabled
                />

                <TextField
                    label="Progress"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={projects.find(p => p.id === selectedProject)?.progress || ""}
                    disabled
                />

                <TextField
                    label="Task Count"
                    variant="outlined"
                    fullWidth
                    value={projects.find(p => p.id === selectedProject)?.taskCount || ""}
                    disabled
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Edit Project
                </Button>
            </form>
        </div>
    );
};

export default ProjectEditForm;
