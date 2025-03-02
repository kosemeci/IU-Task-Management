import { useState } from "react";
import TaskForm from "./AdminForm/TaskForm";
import RegisterForm from "./AdminForm/RegisterForm";
import ProjectForm from "./AdminForm/ProjectForm";
import Dashboard from "./AdminForm/Dashboard";
import EditTaskForm from "./TableTask"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import InfoIcon from '@mui/icons-material/Info';
import "../css/admin.css";
import UserEditForm from "./AdminForm/UserEditForm";
import DashboardIcon from '@mui/icons-material/Dashboard';
import User from "./User";

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("dashboard");

    // İçerik bileşenlerini dinamik olarak çağırma
    const renderContent = () => {
        switch (activeTab) {
            case "createTask":
                return <TaskForm />;
            case "dashboard":
                return <Dashboard />;
            case "myinfo":
                return <User />;
            case "recordUser":
                return <RegisterForm />;
            case "editTask":
                return <EditTaskForm />;
            case "projects":
                return <div><h3>Projects</h3><p>You can view the projects here.</p></div>;
            case "myInfo":
                return <div><h3>Info</h3><p>You can view the projects here.</p></div>;
            case "editUser":
                return <UserEditForm />;
            default:
                return <ProjectForm />;
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h2 className="admin-title"> Admin Panel</h2>
                <ul>
                    <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}><DashboardIcon /> Dashboard</li>
                    <li className={activeTab === "myInfo" ? "active" : ""} onClick={() => setActiveTab("myinfo")}><InfoIcon /> My Info</li>
                    <li className={activeTab === "recordUser" ? "active" : ""} onClick={() => setActiveTab("recordUser")}><PersonAddAltIcon /> Register New User</li>
                    <li className={activeTab === "editUser" ? "active" : ""} onClick={() => setActiveTab("editUser")}><ManageAccountsIcon /> Edit User</li>
                    <li className={activeTab === "createTask" ? "active" : ""} onClick={() => setActiveTab("createTask")}><AddTaskOutlinedIcon /> Create Task</li>
                    <li className={activeTab === "editTask" ? "active" : ""} onClick={() => setActiveTab("editTask")}><CreateOutlinedIcon /> Edit Task</li>
                    <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}><FolderOutlinedIcon /> Projects</li>
                    <li className={activeTab === "newProject" ? "active" : ""} onClick={() => setActiveTab("newProject")}><CreateNewFolderOutlinedIcon /> Create Project</li>
                </ul>
            </div>

            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;
