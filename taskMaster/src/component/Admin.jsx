import { useState } from "react";
import TaskForm from "./AdminForm/TaskForm";
import "../css/admin.css"

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("tasks");

    // İçerik bileşenlerini dinamik olarak çağırma
    const renderContent = () => {
        switch (activeTab) {
            case "tasks":
                return <TaskForm />;
            case "users":
                return <div><h3>Kullanıcı Yönetimi</h3><p>Burada kullanıcıları yönetebilirsiniz.</p></div>;
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
                    <li className={activeTab === "tasks" ? "active" : ""} onClick={() => setActiveTab("tasks")}>📌 Task Yönetimi</li>
                    <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👤 Kullanıcı Yönetimi</li>
                    <li className={activeTab === "editTask" ? "active" : ""} onClick={() => setActiveTab("editTask")}>✏️ Task Düzenle</li>
                    <li className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>📁 Projeler</li>
                </ul>
            </div>

            {/* Ana İçerik */}
            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;