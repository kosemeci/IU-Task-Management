import { useState } from "react";
import '../../css/admin.css';

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        priority: "",
        description: "",
        deadline: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Task:", task);
        setTask({ title: "", priority: "", description: "", deadline: "" });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">📌 Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">

                {/* Task Title */}
                <div className="form-group">
                    <label className="form-label">Task Title:</label>
                    <input
                        type="text"
                        placeholder="e.g., Develop Web API"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                {/* Priority */}
                <div className="form-group">
                    <label className="form-label">Priority:</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        className="form-input"
                        required
                    >
                        <option value="Low">LOW</option>
                        <option value="Medium">MEDIUM</option>
                        <option value="High">HIGH</option>
                    </select>
                </div>

                {/* Description */}
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

                {/* Deadline */}
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

                {/* Save Button */}
                <button type="submit" className="submit-button">
                    Save
                </button>

            </form>
        </div>
    );
}

export default TaskForm;