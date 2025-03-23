import { getAllProject } from "../Api/projects";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Stack } from "@mui/material";
import "../../css/admin.css";
import axios from "axios";
import AlertMessage from "../common/AlertMessage";

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
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    const fetchProjects = async () => {

        try {
            const response = await getAllProject();
            const projectList = response.map((res) => ({
                id: res.id,
                name: res.projectName,
                description: res.description,
                progress: res.completionPercentage,
                createdDate: res.createdDate,
                taskCount: res.task?.length || 0,
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
        try {
            await axios.put('http://localhost:8080/project-management/project/update',
                {
                    "id": selectedProject.id,
                    "projectName": selectedProject.name,
                    "description": selectedProject.description,
                },
                {
                    withCredentials: true,
                    timeout: 30000
                });

            window.scrollTo({ top: 0, behavior: "smooth" });

            setAlertMessage("Project updated successfully.")
            setAlertType("success");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        } catch (error) {
            setAlertType("error");
            setAlertMessage("An error occurred while updating the project.")
            console.log(error);
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        }
        setSelectedProject({});
        setSelectId("");
        fetchProjects();
    };

    const handleChangeSelect = (e) => {
        const selectedId = e.target.value;
        setSelectId(selectedId);
        const currentProject = projects.find((p) => (p.id === selectedId));
        setSelectedProject(currentProject);
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Update Project</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <FormControl >
                    <InputLabel sx={{ "&.Mui-focused": { color: "#36D6BB" } }}>         Select Project
                    </InputLabel>
                    <Select
                        value={selectId}
                        onChange={(e) => handleChangeSelect(e)}
                        required
                        sx={{
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#36D6BB",
                                borderWidth: "1px"
                            }
                        }}                  >
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
                            multiline
                            value={selectedProject.name}
                            onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #36D6BB",
                                },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#36D6BB" }
                            }}
                        />

                        < TextField
                            label="Project Description"
                            variant="outlined"
                            multiline
                            rows={3}
                            value={selectedProject.description}
                            onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #36D6BB"
                                },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#36D6BB" }
                            }}
                        />

                        <TextField
                            label="Created Date"
                            variant="outlined"
                            value={selectedProject.createdDate}
                            disabled
                        />
                        <TextField
                            label="Progress %"
                            variant="outlined"
                            type="number"
                            value={selectedProject.progress}
                            disabled
                        />
                        <TextField
                            label="Task Count"
                            variant="outlined"
                            value={selectedProject.taskCount}
                            disabled
                        />
                    </>
                )}

                <button type="submit" variant="contained" className="submit-button" fullWidth>
                    Edit Project
                </button>
            </form>
            <AlertMessage message={alertMessage} onClose={() => setAlertMessage("")} severity={alertType} />
        </div>
    );
};

export default ProjectEditForm;