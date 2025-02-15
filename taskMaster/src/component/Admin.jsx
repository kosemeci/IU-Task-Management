import { useState } from "react";
import TaskForm from "./AdminForm/TaskForm";
import UserForm from "./AdminForm/UserForm";

import "../css/admin.css"

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("tasks");

    // İçerik bileşenlerini dinamik olarak çağırma
    const renderContent = () => {
        switch (activeTab) {
            case "tasks":
                return <TaskForm />;
            case "recordUser":
                return <UserForm />
            case "editTask":
                return <div><h3>Task Düzenleme</h3><p>Burada görevleri düzenleyebilirsiniz.</p></div>;
            case "projects":
                return <div><h3>Projeler</h3><p>Burada projeleri görüntüleyebilirsiniz.</p></div>;
            default:
                return <TaskForm />;
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar - Sol Menü */}
            <div className="admin-sidebar">
                <h2 className="admin-title">⚙️ Admin Panel</h2>
                <ul>
                    <li className={activeTab === "task" ? "active" : ""} onClick={() => setActiveTab("tasks")}>📌 Task Oluştur</li>
                    <li className={activeTab === "recordUser" ? "active" : ""} onClick={() => setActiveTab("users")}>👤 Yeni Kayıt</li>
                    <li className={activeTab === "editTask" ? "active" : ""} onClick={() => setActiveTab("editTask")}>✏️ Task Düzenle</li>
                    <li className={activeTab === "editUser" ? "active" : ""} onClick={() => setActiveTab("tasks")}>👤 Kullanıcı Düzenle</li>
                    <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>📁 Projeler</li>
                    <li className={activeTab === "newProject" ? "active" : ""} onClick={() => setActiveTab("projects")}>📁 Proje Oluştur</li>
                </ul>
            </div>

            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;