import { useState } from "react";
import TaskForm from "./AdminForm/TaskForm";
import "../css/admin.css"
// import UserForm from "./UserForm";
// import TaskList from "./TaskList";
// import ProjectList from "./ProjectList";

function AdminPage() {
    const [activeTab, setActiveTab] = useState("tasks"); // Varsayılan sekme

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="">
                <h2 className="">Admin Panel</h2>
                <ul>
                    <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveTab("tasks")}>📌 Task Yönetimi</li>
                    <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveTab("users")}>👤 Kullanıcı Yönetimi</li>
                    <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveTab("editTask")}>✏️ Task Düzenle</li>
                    <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveTab("projects")}>📁 Projeler</li>
                </ul>
            </div>

            {/* Ana İçerik */}
            <div className="w-3/4 p-5">
                {activeTab === "tasks" && <TaskForm />}
                {/* {activeTab === "users" && <UserForm />}
        {activeTab === "editTask" && <TaskList />}
        {activeTab === "projects" && <ProjectList />} */}
            </div>
        </div>
    );
}

export default AdminPage;
