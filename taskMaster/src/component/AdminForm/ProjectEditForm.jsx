import { getAllProject } from "../Api/projects"
import { useEffect } from "react"
import { useState } from "react"

const columns = [
    { id: 'id', label: '#', minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 120 },
    { id: 'description', label: 'Desc', minWidth: 150 },
    { id: 'progress', label: 'Progress', minWidth: 80 },
    { id: 'createdDatae', label: 'Created Date', minWidth: 100 },
    { id: 'taskCount', label: 'Task Count', minWidth: 60 }
]

const ProjectEditForm = () => {

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            const projectList = response.map((res) => (
                {
                    id: res.id,
                    name: res.projectName,
                    description: res.description,
                    progress: res.completionPercentage,
                    createdDate: res.createdDate,
                    taskCount: res.task.length,
                }
            ));
            setProjects(projectList);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, [])

    const handleClick = () => {
        console.log(projects)
    }

    return (
        <div>
            {projects && projects.map((pro, index) => (

                <div key={pro.id}>
                    <p >
                        {index}-{pro.name} - {pro.description}
                    </p>
                </div>

            ))}
        </div>
    )
}

export default ProjectEditForm;