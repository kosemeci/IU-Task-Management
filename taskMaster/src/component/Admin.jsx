import { useState } from "react";
import TaskCreateForm from "./AdminForm/TaskCreateForm";
import RegisterForm from "./AdminForm/RegisterForm";
import ProjectForm from "./AdminForm/ProjectCreateForm";
import Dashboard from "./AdminForm/Dashboard";
import EditTaskForm from "./TaskUtils/TableTask"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import InfoIcon from '@mui/icons-material/Info';
import UserEditForm from "./AdminForm/UserEditForm";
import DashboardIcon from '@mui/icons-material/Dashboard';
import User from "./User";
import ProjectEditForm from "./AdminForm/ProjectEditForm";
import "../css/admin.css";

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("dashboard");

    // İçerik bileşenlerini dinamik olarak çağırma
    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <Dashboard />;
            case "myinfo":
                return <User />;
            case "recordUser":
                return <RegisterForm />;
            case "editUser":
                return <UserEditForm />;
            case "createTask":
                return <TaskCreateForm />;
            case "editTask":
                return <EditTaskForm />;
            case "createProject":
                return <ProjectForm />
            case "editProject":
                return <ProjectEditForm />
            default:
                return <Dashboard />;
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
                    <li className={activeTab === "createProject" ? "active" : ""} onClick={() => setActiveTab("createProject")}><CreateNewFolderOutlinedIcon /> Create Project</li>
                    <li className={activeTab === "editProject" ? "active" : ""} onClick={() => setActiveTab("editProject")}><FolderOutlinedIcon /> Edit Project</li>
                </ul>
            </div>

            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;
