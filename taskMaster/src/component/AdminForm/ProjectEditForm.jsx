import { getAllProject } from "../Api/projects";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import "../../css/admin.css";
import axios from "axios";

const ProjectEditForm = () => {
    const [projects, setProjects] = useState([]);
    const [selectId, setSelectId] = useState("");
    const [selectedProject, setSelectedProject] = useState({
        id: "",
        name: "",
        description: "",
        progress: "",
        taskCount: "",
        createdDate: ""
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Selected Project ID:", selectedProject);
        try {
            const response = await axios.put('http://localhost:8080/project-management/project/update',
                {
                    "id": selectedProject.id,
                    "projectName": selectedProject.name,
                    "description": selectedProject.description,
                },
                {
                    withCredentials: true,
                    timeout: 30000
                })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        setSelectedProject({});
    };

    const handleChangeSelect = (e) => {
        e.preventDefault();
        const selectedId = e.target.value;
        setSelectId(selectedId);
        const currentProject = projects.find((p) => (p.id === selectedId));
        setSelectedProject(currentProject);
    }


    return (
        <div className="form-container">
            <h2 className="form-title">Update Project</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <FormControl fullWidth>
                    <InputLabel>Select Project</InputLabel>
                    <Select
                        value={selectId}
                        onChange={(e) => handleChangeSelect(e)}
                        required
                    >
                        {projects.map((proj, index) => (
                            <MenuItem key={proj.id} value={proj.id}>
                                {index + 1} - {proj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedProject.id && (
                    <>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={selectedProject.name}
                            onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                        />

                        < TextField
                            label="Project Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={selectedProject.description}
                            onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}

                        />

                        <TextField
                            label="Created Date"
                            variant="outlined"
                            fullWidth
                            value={selectedProject.createdDate}
                            disabled
                        />
                        <TextField
                            label="Progress %"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={selectedProject.progress}
                            disabled
                        />
                        <TextField
                            label="Task Count"
                            variant="outlined"
                            fullWidth
                            value={selectedProject.taskCount}
                            disabled
                        />

                    </>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Edit Project
                </Button>
            </form>
        </div>
    );
};

export default ProjectEditForm;
