import { useState } from "react";
import TaskForm from "./AdminForm/TaskForm";
import UserForm from "./AdminForm/UserForm";
import ProjectForm from "./AdminForm/ProjectForm";

import "../css/admin.css";

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("tasks");

    // İçerik bileşenlerini dinamik olarak çağırma
    const renderContent = () => {
        switch (activeTab) {
            case "tasks":
                return <TaskForm />;
            case "recordUser":
                return <UserForm />;
            case "editTask":
                return <div><h3>Edit Task</h3><p>You can edit tasks here.</p></div>;
            case "projects":
                return <div><h3>Projects</h3><p>You can view the projects here.</p></div>;
            case "editUser":
                return <div><h3>Edit User</h3><p>You can edit user details here.</p></div>;
            default:
                return <ProjectForm />;
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar - Left Menu */}
            <div className="admin-sidebar">
                <h2 className="admin-title">⚙️ Admin Panel</h2>
                <ul>
                    <li className={activeTab === "tasks" ? "active" : ""} onClick={() => setActiveTab("tasks")}>📌 Create Task</li>
                    <li className={activeTab === "recordUser" ? "active" : ""} onClick={() => setActiveTab("recordUser")}>👤 Register New User</li>
                    <li className={activeTab === "editTask" ? "active" : ""} onClick={() => setActiveTab("editTask")}>✏️ Edit Task</li>
                    <li className={activeTab === "editUser" ? "active" : ""} onClick={() => setActiveTab("editUser")}>👤 Edit User</li>
                    <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>📁 Projects</li>
                    <li className={activeTab === "newProject" ? "active" : ""} onClick={() => setActiveTab("newProject")}>📁 Create Project</li>
                </ul>
            </div>

            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;
